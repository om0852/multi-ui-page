'use client';

import React from 'react';

/**
 * This component provides a visual placeholder for components that don't exist yet
 */
interface DynamicExampleProps {
  componentType: string;
  componentId: string | number;
  height?: number;
  width?: string;
  showCode?: boolean;
}

const DynamicExample: React.FC<DynamicExampleProps> = ({
  componentType,
  componentId,
  height = 300,
  width = '100%',
  showCode = true
}) => {
  // Format the component type for display (e.g., "buttons" -> "Buttons")
  const formattedType = componentType.charAt(0).toUpperCase() + componentType.slice(1);
  
  // Generate the import path that would be used
  const importPath = `../multiui/${componentType}/_components/${formattedType}_${componentId}`;
  
  // Generate the component name
  const componentName = `${formattedType}_${componentId}`;
  
  // Generate some example usage code
  const exampleCode = `
import { ${componentName} } from "${importPath}";

export default function MyComponent() {
  return (
    <${componentName} />
  );
}`;

  return (
    <div 
      className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
      style={{ width, minHeight: height }}
    >
      <div className="bg-gray-100 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          {formattedType} Component: Variant {componentId}
        </h3>
      </div>
      
      <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900 text-center h-full">
        <div className="text-indigo-500 dark:text-indigo-400 mb-4 border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-lg p-6 inline-block">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          This component doesn't exist in the codebase yet.
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">
          It would be imported from: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-indigo-600 dark:text-indigo-400 font-mono text-xs">{importPath}</code>
        </p>
        
        {showCode && (
          <div className="w-full max-w-lg mt-4">
            <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 text-left">
              <pre className="text-gray-300 dark:text-gray-400 font-mono text-xs overflow-x-auto whitespace-pre-wrap">
                {exampleCode}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicExample; 