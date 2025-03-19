'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

interface ExamplePreviewProps {
  exampleId: number;
}

export default function ExamplePreview({ exampleId }: ExamplePreviewProps) {
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Create a component name based on the exampleId
  const componentName = `Example_${exampleId}`;

  // Use dynamic import with error handling
  const DynamicComponent = dynamic(
    () => import(`../../multiui/accordian/examples/${componentName}`).then(mod => {
      setIsLoading(false);
      return mod;
    }).catch(err => {
      console.error(`Failed to load ${componentName}:`, err);
      setError(true);
      setIsLoading(false);
      return () => <div></div>;
    }),
    {
      loading: () => (
        <div className="flex items-center justify-center h-64 bg-gray-800/50 rounded-lg">
          <div className="text-gray-400">Loading variant {exampleId}...</div>
        </div>
      ),
      ssr: false,
    }
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-800/20 rounded-lg text-gray-400">
        <p>Variant {exampleId} is not available.</p>
      </div>
    );
  }

  // Prevent event propagation when interacting with the accordion
  const handlePreventPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="border border-gray-700 rounded-lg overflow-hidden"
      onClick={handlePreventPropagation}
    >
      <div className="p-4 bg-gray-800/30">
        <DynamicComponent />
      </div>
    </div>
  );
} 