'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { dynamicImport, registerComponent } from '../utils/dynamic-loading';

// Interface for the window global storage
declare global {
  interface Window {
    __LOADED_EXAMPLES__?: Record<string, any>;
  }
}

// Initialize global cache for loaded examples
if (typeof window !== 'undefined' && !window.__LOADED_EXAMPLES__) {
  window.__LOADED_EXAMPLES__ = {};
}

export interface ExampleRendererProps {
  exampleId: string | number;
  componentType: string;
}

// Fallback Component when the real example doesn't exist
const FallbackExample: React.FC<{componentType: string, exampleId: string | number}> = ({
  componentType,
  exampleId
}) => {
  // Generate accordion items for demo
  const [accordionState, setAccordionState] = useState([
    { title: "Accordion Item 1", content: "This is content for accordion item 1.", isOpen: true },
    { title: "Accordion Item 2", content: "This is content for accordion item 2.", isOpen: false },
    { title: "Accordion Item 3", content: "This is content for accordion item 3.", isOpen: false },
  ]);

  // Toggle accordion item
  const toggleAccordion = (index: number) => {
    setAccordionState(
      accordionState.map((item, i) => ({
        ...item,
        isOpen: i === index ? !item.isOpen : item.isOpen
      }))
    );
  };

  // Generate content based on component type
  const getContent = () => {
    switch(componentType.toLowerCase()) {
      case 'accordian':
        // Different accordion styles based on the variant
        let accordionStyle: Record<string, string> = {};
        
        // Customize style based on variant
        if (Number(exampleId) % 5 === 1) {
          accordionStyle = {
            container: "space-y-2 w-full max-w-md mx-auto",
            item: "border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden",
            header: "flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 cursor-pointer",
            content: "p-4 bg-white dark:bg-gray-800",
            icon: "text-blue-500 dark:text-blue-400 transition-transform duration-200"
          };
        } else if (Number(exampleId) % 5 === 2) {
          accordionStyle = {
            container: "space-y-1 w-full max-w-md mx-auto",
            item: "border-b border-gray-200 dark:border-gray-700 overflow-hidden",
            header: "flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800",
            content: "p-3 pl-6 bg-gray-50 dark:bg-gray-800 text-sm",
            icon: "text-gray-500 dark:text-gray-400 transition-transform duration-200"
          };
        } else if (Number(exampleId) % 5 === 3) {
          accordionStyle = {
            container: "space-y-3 w-full max-w-md mx-auto",
            item: "bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden",
            header: "flex justify-between items-center p-4 font-medium cursor-pointer",
            content: "p-4 pt-0 text-gray-600 dark:text-gray-300",
            icon: "text-indigo-600 dark:text-indigo-400 transition-transform duration-200"
          };
        } else if (Number(exampleId) % 5 === 4) {
          accordionStyle = {
            container: "space-y-4 w-full max-w-md mx-auto",
            item: "border-l-4 border-indigo-500 dark:border-indigo-600 bg-white dark:bg-gray-800 rounded-r-lg shadow-sm",
            header: "flex justify-between items-center p-4 font-semibold cursor-pointer",
            content: "p-4 pt-0 pl-8 text-gray-600 dark:text-gray-300",
            icon: "text-indigo-600 dark:text-indigo-400 transition-transform duration-200"
          };
        } else {
          accordionStyle = {
            container: "space-y-2 w-full max-w-md mx-auto",
            item: "rounded-md overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900",
            header: "flex justify-between items-center p-4 font-medium cursor-pointer",
            content: "p-4 pt-0 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800",
            icon: "text-blue-600 dark:text-blue-400 transition-transform duration-200"
          };
        }

        return (
          <div className={accordionStyle.container}>
            {accordionState.map((item, index) => (
              <div key={index} className={accordionStyle.item}>
                <div 
                  className={accordionStyle.header}
                  onClick={() => toggleAccordion(index)}
                >
                  <div>{item.title}</div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 ${accordionStyle.icon} ${item.isOpen ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {item.isOpen && (
                  <div className={accordionStyle.content}>
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      
      case 'buttons':
        return (
          <div className="p-6 flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Primary Button
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
              Secondary Button
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
              Outline Button
            </button>
          </div>
        );
      
      case 'cards':
        return (
          <div className="p-6 max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">Card Title</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  This is a sample card with a gradient header. The real component would have more interactive elements.
                </p>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                  Action Button
                </button>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
            <div className="text-indigo-500 dark:text-indigo-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {componentType.charAt(0).toUpperCase() + componentType.slice(1)} Example
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Variant {exampleId} Preview
            </p>
          </div>
        );
    }
  };

  return (
    <div className="example-fallback p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
      {getContent()}
    </div>
  );
};

/**
 * A component that directly renders the example component from the examples folder
 * based on the selected variant
 */
const ExampleRenderer: React.FC<ExampleRendererProps> = ({ exampleId, componentType }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usesFallback, setUsesFallback] = useState(false);
  
  // Create the direct path to the example component - the most important path
  const directPath = `../multiui/${componentType.toLowerCase()}/examples/Example_${exampleId}`;
  
  // Generate a stable component key for caching
  const componentKey = `${componentType.toLowerCase()}_example_${exampleId}`;
  
  // Create a fallback component key
  const fallbackKey = `${componentKey}_fallback`;
  
  // Register the component path for future use
  useEffect(() => {
    console.log(`Attempting to load example from: ${directPath}`);
    
    // First try to directly register the component using the direct path
    // This should take priority over any fallback logic
    registerComponent(componentKey, () => {
      // Try direct import first, with error handling
      return import(/* @vite-ignore */ directPath)
        .catch(err => {
          console.warn(`Could not find example at ${directPath}:`, err.message);
          setUsesFallback(true);
          
          // Only use fallback after direct import fails
          return import(/* @vite-ignore */ `../multiui/${componentType.toLowerCase()}/examples/Example_${exampleId}`)
            .catch(secondErr => {
              console.warn(`Also tried alternate path, still failed:`, secondErr.message);
              return {
                default: () => <FallbackExample componentType={componentType} exampleId={exampleId} />
              };
            });
        });
    });
    
    // Register fallback component as a last resort
    registerComponent(fallbackKey, () => {
      return Promise.resolve({
        default: () => <FallbackExample componentType={componentType} exampleId={exampleId} />
      });
    });
    
    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [componentKey, directPath, componentType, exampleId, fallbackKey]);
  
  // Create the dynamic component
  const ExampleComponent = dynamicImport(componentKey, directPath);
  
  // Show loading state while component is being fetched
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 border border-gray-200 rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-2 text-center">
          <div className="animate-spin h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading example from {componentType}/examples/Example_{exampleId}...</p>
        </div>
      </div>
    );
  }
  
  // If there's an error, show error message
  if (error) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 rounded-md dark:bg-red-900/20 dark:border-red-800">
        <h3 className="text-red-700 font-medium mb-2 dark:text-red-400">Error Loading Example</h3>
        <p className="text-red-600 dark:text-red-300">{error}</p>
      </div>
    );
  }
  
  // Render the dynamically loaded component with error boundary and Suspense
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center p-8 border border-gray-200 rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="space-y-2 text-center">
          <div className="animate-spin h-8 w-8 border-2 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading example from {componentType}/examples/Example_{exampleId}...</p>
        </div>
      </div>
    }>
      <ErrorBoundary 
        fallback={<FallbackExample componentType={componentType} exampleId={exampleId} />}
        onError={(error) => {
          console.error("Error loading component:", error);
          setError("Failed to load component example");
          setUsesFallback(true);
        }}
      >
        <ExampleComponent />
      </ErrorBoundary>
    </Suspense>
  );
};

// Error boundary component
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

export default ExampleRenderer; 