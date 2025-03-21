'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Code, Layers, Copy, Check, Code2 } from 'lucide-react';
import ExampleRenderer from './ExampleRenderer';

interface ComponentTemplateProps {
  title: string;
  description: string;
  componentType: string; // e.g., 'accordian', 'avatar', etc.
  variants: number[];
  usageExample: (selectedVariant: number) => string;
  propDescription: React.ReactNode;
}

export default function ComponentTemplate({
  title,
  description,
  componentType,
  variants,
  usageExample,
  propDescription,
}: ComponentTemplateProps) {
  const [selectedExample, setSelectedExample] = useState<number>(variants[0] || 1); // Default to first variant
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [copied, setCopied] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState(false);
  
  // Generate array of all variants
  const examples = variants.map(id => ({
    id,
    variant: id,
    description: `${title} variant ${id} with unique styling and animations`
  }));
  
  const handleExampleClick = useCallback((exampleId: number) => {
    // If already selected, don't reload
    if (selectedExample === exampleId) return;
    
    // Show brief loading state 
    setIsLoading(true);
    
    // Update selected example immediately
    setSelectedExample(exampleId);
    
    // Remove loading state after a very brief delay (just for visual feedback)
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, [selectedExample]);

  const copyToClipboard = (text: string, isCommand = false) => {
    navigator.clipboard.writeText(text);
    if (isCommand) {
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyClick = (e: React.MouseEvent, text: string, isCommand = false) => {
    e.preventDefault(); // Prevent any default behavior
    e.stopPropagation(); // Stop event propagation
    copyToClipboard(text, isCommand);
  };

  const fetchExampleContent = async (componentType: string, variantNumber: number) => {
    try {
      const response = await fetch(`/api/examples?component=${componentType}&variant=${variantNumber}`);
      if (!response.ok) throw new Error('Failed to fetch example');
      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error('Error fetching example:', error);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link href="/components" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Components
          </Link>
          
          <Link 
            href={`/components/${componentType}/all`} 
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            <Layers className="mr-2 h-4 w-4" />
            View All Variants
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-300 mb-8">
          {description}
        </p>

        <div className="flex flex-col lg:flex-row gap-8 overflow-hidden">
          {/* Left sidebar with variant list */}
          <div className="lg:w-1/3 h-[calc(170vh-250px)] overflow-y-auto pr-2 border-r border-gray-700">
            <div className="sticky top-0 bg-gray-900 py-2 mb-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold">Variants</h2>
            </div>
            <div className="space-y-2">
              {examples.map((example) => (
                <div 
                  key={example.id}
                  onClick={() => handleExampleClick(example.id)}
                  className={`
                    p-3 rounded-lg cursor-pointer flex justify-between items-center
                    ${selectedExample === example.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 hover:bg-gray-700'}
                    transition-colors
                  `}
                >
                  <span className="font-medium">Variant {example.variant}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={async (e) => {
                        e.preventDefault();
                        const content = await fetchExampleContent(componentType, example.id);
                        if (content) {
                          handleCopyClick(e, content);
                        } else {
                          // Fallback to copying the import statement if content fetch fails
                          handleCopyClick(e, usageExample(example.id));
                        }
                      }}
                      className={`
                        flex items-center space-x-1 px-2 py-1 rounded-md transition-colors
                        ${selectedExample === example.id 
                          ? 'bg-blue-700 hover:bg-blue-800' 
                          : 'bg-gray-700 hover:bg-gray-600'}
                      `}
                      title={`Copy: ${usageExample(example.id)}`}
                    >
                      {copied ? (
                        <Check className="h-3 w-3 text-green-400" />
                      ) : (
                        <Copy className="h-3 w-3 text-blue-400" />
                      )}
                    </button>
                    <button
                      onClick={(e) => handleCopyClick(e, `npx multi-ui add ${componentType}_${example.id}`, true)}
                      className={`
                        flex items-center space-x-1 px-2 py-1 rounded-md transition-colors
                        ${selectedExample === example.id 
                          ? 'bg-blue-700 hover:bg-blue-800' 
                          : 'bg-gray-700 hover:bg-gray-600'}
                      `}
                      title={`Copy: npx multi-ui add ${componentType}_${example.id}`}
                    >
                      {copiedCommand ? (
                        <Check className="h-3 w-3 text-green-400" />
                      ) : (
                        <Code2 className="h-3 w-3 text-blue-400" />
                      )}
                    </button>
                    <div className="flex space-x-1">
                      <Link 
                        href={`/multiui/${componentType}/examples/Example_${example.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`
                          p-1 rounded-full transition-colors
                          ${selectedExample === example.id 
                            ? 'bg-blue-700 hover:bg-blue-800' 
                            : 'bg-gray-700 hover:bg-gray-600'}
                        `}
                      >
                        <Code className="h-3 w-3 text-blue-400" />
                      </Link>
                      <Link 
                        href={`/multiui/${componentType}#example-${example.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`
                          p-1 rounded-full transition-colors
                          ${selectedExample === example.id 
                            ? 'bg-blue-700 hover:bg-blue-800' 
                            : 'bg-gray-700 hover:bg-gray-600'}
                        `}
                      >
                        <ExternalLink className="h-3 w-3 text-green-400" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side preview */}
          <div className="lg:w-2/3">
            <div className="border border-gray-700 rounded-lg overflow-hidden">
              <div className="p-4 bg-gray-800 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Variant {selectedExample}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      const content = await fetchExampleContent(componentType, selectedExample);
                      if (content) {
                        handleCopyClick(e, content);
                      } else {
                        // Fallback to copying the import statement if content fetch fails
                        handleCopyClick(e, usageExample(selectedExample));
                      }
                    }}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    title="Copy example code"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 text-blue-400" />
                        <span className="text-sm">Copy Example</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      const formattedName = componentType
                        .replace(/s$/, '') // Remove trailing 's'
                        .replace(/s([A-Z])/, '$1') // Remove 's' before capital letters
                        .charAt(0).toUpperCase() + // Capitalize first letter
                        componentType
                          .replace(/s$/, '') // Remove trailing 's' again from the rest
                          .slice(1); // Get rest of the string
                      handleCopyClick(e, `npx multi-ui add ${formattedName}_${selectedExample}`, true);
                    }}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    title={`Copy: npx multi-ui add ${componentType
                      .replace(/s$/, '')
                      .charAt(0).toUpperCase() + 
                      componentType.replace(/s$/, '').slice(1)}_${selectedExample}`}
                  >
                    {copiedCommand ? (
                      <>
                        <Check className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Code2 className="h-4 w-4 text-blue-400" />
                        <span className="text-sm">Copy Command</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-700 p-6 bg-gray-850 min-h-[400px]">
                <div className="bg-gray-900 rounded-lg p-4 h-full">
                  <div className="example-container">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center p-12 text-gray-400">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p>Loading component...</p>
                      </div>
                    ) : (
                      <ExampleRenderer 
                        exampleId={selectedExample} 
                        componentType={componentType}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 border border-gray-700 rounded-lg bg-gray-800/50">
              <h2 className="text-2xl font-bold mb-4">How to Use</h2>
              <div className="space-y-4">
                <p>
                  Each {componentType} variant can be imported directly from its source file. For example:
                </p>
                <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm text-gray-300">
                    {usageExample(selectedExample)}
                  </code>
                </pre>
                <div>
                  {propDescription}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .loading-indicator, .loading-fallback {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 300px;
          color: var(--text-muted);
        }
        
        .loading-spinner {
          border: 3px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 3px solid var(--primary-color);
          width: 24px;
          height: 24px;
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
} 