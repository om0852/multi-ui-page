'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft, Copy, Code, Eye, Check, ExternalLink } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ComponentRenderer from '../../ComponentRenderer';

type TabType = 'preview' | 'component' | 'example';

export default function VariantPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const [, , slug, variantId] = pathname.split('/');

  // Redirect if slug or variantId is missing
  useEffect(() => {
    if (!slug || !variantId) {
      router.push('/components');
    }
  }, [slug, variantId, router]);

  const [activeTab, setActiveTab] = useState<TabType>('preview');
  const [loading, setLoading] = useState(true);
  const [componentCode, setComponentCode] = useState<string>('');
  const [exampleCode, setExampleCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Component and example paths based on slug and variantId
  const componentPath = `/multiui/${slug}/_components/${toTitleCase(slug)}_${variantId}.tsx`;
  const examplePath = `/multiui/${slug}/examples/Example_${variantId}.tsx`;
  
  useEffect(() => {
    const fetchComponentCode = async () => {
      try {
        // Fetch component code
        const componentResponse = await fetch(componentPath);
        if (!componentResponse.ok) {
          throw new Error(`Failed to fetch component code: ${componentResponse.statusText}`);
        }
        const componentText = await componentResponse.text();
        setComponentCode(componentText);
        
        // Fetch example code
        const exampleResponse = await fetch(examplePath);
        if (!exampleResponse.ok) {
          throw new Error(`Failed to fetch example code: ${exampleResponse.statusText}`);
        }
        const exampleText = await exampleResponse.text();
        setExampleCode(exampleText);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching code:', error);
        setError('Failed to load component code. The component might not exist.');
        setLoading(false);
      }
    };
    
    fetchComponentCode();
  }, [slug, variantId, componentPath, examplePath]);

  function toTitleCase(str: string): string {
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  // Copy code to clipboard
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <h1 className="text-2xl font-bold text-gray-900">Component Not Found</h1>
        <p className="mt-2 text-gray-600">{error}</p>
        <Link 
          href={`/components/${slug}`} 
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {toTitleCase(slug)} Components
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link 
            href={`/components/${slug}`} 
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to {toTitleCase(slug)} Components
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {toTitleCase(slug)} Variant {variantId}
          </h1>
          <p className="mt-2 text-lg text-gray-500">
            Explore and use this {toTitleCase(slug)} component in your projects.
          </p>
        </div>
        
        {/* Tab navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('preview')}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'preview' 
                  ? 'border-indigo-500 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('component')}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'component' 
                  ? 'border-indigo-500 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <div className="flex items-center">
                <Code className="h-4 w-4 mr-2" />
                Component Code
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('example')}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'example' 
                  ? 'border-indigo-500 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <div className="flex items-center">
                <ExternalLink className="h-4 w-4 mr-2" />
                Usage Example
              </div>
            </button>
          </nav>
        </div>
        
        {/* Tab content */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {activeTab === 'preview' && (
            <div className="p-6">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-200 rounded-lg p-6 min-h-[400px]">
                <ComponentRenderer 
                  componentPath={componentPath}
                  examplePath={examplePath}
                  componentSlug={slug}
                />
              </div>
            </div>
          )}
          
          {activeTab === 'component' && (
            <div>
              <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <span className="text-sm font-mono">{componentPath}</span>
                <button 
                  onClick={() => copyToClipboard(componentCode)}
                  className="flex items-center text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
              <div className="overflow-auto max-h-[600px]">
                <SyntaxHighlighter 
                  language="tsx" 
                  style={tomorrow}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    fontSize: '0.875rem',
                  }}
                >
                  {componentCode}
                </SyntaxHighlighter>
              </div>
            </div>
          )}
          
          {activeTab === 'example' && (
            <div>
              <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
                <span className="text-sm font-mono">{examplePath}</span>
                <button 
                  onClick={() => copyToClipboard(exampleCode)}
                  className="flex items-center text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 mr-1" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
              <div className="overflow-auto max-h-[600px]">
                <SyntaxHighlighter 
                  language="tsx" 
                  style={tomorrow}
                  customStyle={{
                    margin: 0,
                    padding: '1.5rem',
                    fontSize: '0.875rem',
                  }}
                >
                  {exampleCode}
                </SyntaxHighlighter>
              </div>
            </div>
          )}
        </div>
        
        {/* Installation instructions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Installation & Usage</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-md font-medium text-gray-800">1. Install the package</h3>
              <div className="mt-2 bg-gray-50 rounded-md p-3">
                <code className="text-sm text-gray-800">
                  npm install multi-ui
                </code>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-800">2. Import the component</h3>
              <div className="mt-2 bg-gray-50 rounded-md p-3">
                <code className="text-sm text-gray-800">
                  {`import { ${toTitleCase(slug)}${variantId} } from 'multi-ui/${slug}';`}
                </code>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-800">3. Use it in your project</h3>
              <div className="mt-2 bg-gray-50 rounded-md p-3">
                <code className="text-sm text-gray-800">
                  {`<${toTitleCase(slug)}${variantId} />`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}