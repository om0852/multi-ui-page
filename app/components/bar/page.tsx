'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

// Generate array of variants that actually exist
const generateVariants = () => {
  // Add only the bar variants that actually exist (1-30)
  const existingVariants = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30
  ];
  
  return existingVariants;
};

// Usage example generator function
const getUsageExample = (selectedVariant: number) => {
  return `import Bar from '@/app/multiui/bar/_components/Bar_${selectedVariant}';
                    
// Then use it in your component
<Bar value={75} max={100} />`;
};

// Prop description component
const propDescription = (
  <p>
    The <code className="bg-gray-900 px-2 py-1 rounded text-sm">value</code> prop represents the current progress value and <code className="bg-gray-900 px-2 py-1 rounded text-sm">max</code> prop is the maximum value. Some variants may also accept <code className="bg-gray-900 px-2 py-1 rounded text-sm">color</code>, <code className="bg-gray-900 px-2 py-1 rounded text-sm">showLabel</code>, and <code className="bg-gray-900 px-2 py-1 rounded text-sm">size</code> props.
  </p>
);

export default function BarExamplesPage() {
  return (
    <ComponentTemplate
      title="Bar Components"
      description="Progress bars, loading indicators, and meter components with various styles, animations, and customization options."
      componentType="bar"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 