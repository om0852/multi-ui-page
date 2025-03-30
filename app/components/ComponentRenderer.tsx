'use client';

import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { dynamicImport, registerComponent } from '../utils/dynamic-loading';
// import Example_1 from "../../public/multiui"
// Interface for the window global storage
declare global {
  interface Window {
    __LOADED_COMPONENTS__?: Record<string, any>;
  }
}

// Initialize global cache for loaded components
if (typeof window !== 'undefined' && !window.__LOADED_COMPONENTS__) {
  window.__LOADED_COMPONENTS__ = {};
}

type ComponentRendererProps = {
  componentPath: string;
  examplePath: string;
  componentSlug: string;
};

// Type for dynamic component
type DynamicComponentType = React.ComponentType<any>;

// Fallback Component when the real example doesn't exist
const FallbackComponent: React.FC<{componentSlug: string, variantId: string}> = ({
  componentSlug,
  variantId
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg text-center text-white">
      <div className="text-indigo-500 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-200 mb-2">
        {componentSlug.charAt(0).toUpperCase() + componentSlug.slice(1)} Example
      </h3>
      <p className="text-gray-400">
        Variant {variantId} Preview
      </p>
      <p className="mt-4 text-sm text-gray-500">
        Could not load component. This could be a temporary issue or the component may not exist.
      </p>
    </div>
  );
};

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ 
  componentPath, 
  examplePath,
  componentSlug
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usesFallback, setUsesFallback] = useState(false);
  
  // Extract the variant number from the example path
  const variantMatch = examplePath.match(/Example_(\d+)/);
  const variantId = variantMatch ? variantMatch[1] : '1';
  
  // Create key for the example component
  const exampleKey = `${componentSlug.toLowerCase()}_example_${variantId}`;
  const fallbackKey = `${exampleKey}_fallback`;
  
  // Clean the paths for import - remove leading slash and file extensions
  const cleanComponentPath = componentPath.replace(/^\//, '').replace(/\.tsx$/, '');
  const cleanExamplePath = examplePath.replace(/^\//, '').replace(/\.tsx$/, '');
  
  // Register components for dynamic loading
  useEffect(() => {
    const importPath = `../../public/multiui/${componentSlug}/examples/Example_${variantId}`;
    console.log(`Attempting to load example from: ${importPath}`, exampleKey);
    
    // Register the example component
    registerComponent(exampleKey, () => {
      return import(importPath)
        .catch(err => {
          console.warn(`Could not find example at primary path:`, err.message);
          setUsesFallback(true);
          return {
            default: () => <FallbackComponent componentSlug={componentSlug} variantId={variantId} />
          };
        });
    });
    
    // Register fallback component as a last resort
    registerComponent(fallbackKey, () => {
      return Promise.resolve({
        default: () => <FallbackComponent componentSlug={componentSlug} variantId={variantId} />
      });
    });
    
    // Set loading to false after a short delay for better UX
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [componentSlug, exampleKey, fallbackKey, variantId]);
  
  // Create the dynamic component using Next.js dynamic import
  const ExampleComponent = dynamic(
    () => import(`../../public/multiui/${componentSlug}/examples/Example_${variantId}`)
      .catch(() => Promise.resolve({ default: () => (
        <FallbackComponent componentSlug={componentSlug} variantId={variantId} />
      )})),
    {
      loading: () => (
        <div className="flex justify-center items-center h-full">
          <div className="space-y-2 text-center">
            <div className="animate-spin h-10 w-10 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400">Loading component preview...</p>
          </div>
        </div>
      ),
      ssr: false
    }
  );
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[400px] bg-gray-800">
        <div className="space-y-2 text-center">
          <div className="animate-spin h-10 w-10 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-400">Loading component preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[400px] text-white bg-gray-800">
        <p className="text-red-400 mb-2">Error loading component:</p>
        <p className="text-sm opacity-80">{error}</p>
      </div>
    );
  }

  // Render the dynamically loaded component with error boundary and Suspense
  return (
    <div className="w-full h-[400px] bg-gray-800 rounded-md">
      <Suspense fallback={
        <div className="flex justify-center items-center h-full">
          <div className="space-y-2 text-center">
            <div className="animate-spin h-10 w-10 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400">Loading component preview...</p>
          </div>
        </div>
      }>
        <ErrorBoundary 
          fallback={<FallbackComponent componentSlug={componentSlug} variantId={variantId} />}
          onError={(error) => {
            console.error("Error loading component:", error);
            setError("Failed to load component example");
            setUsesFallback(true);
          }}
        >
          <div className="p-4 h-full overflow-auto">
            <ExampleComponent />
          </div>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

// Error boundary component for catching rendering errors
class ErrorBoundary extends React.Component<
  { 
    children: React.ReactNode; 
    fallback: React.ReactNode;
    onError?: (error: Error) => void;
  },
  { hasError: boolean }
> {
  constructor(props: { 
    children: React.ReactNode; 
    fallback: React.ReactNode;
    onError?: (error: Error) => void;
  }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ComponentRenderer; 