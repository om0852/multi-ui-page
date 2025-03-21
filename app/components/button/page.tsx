'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

// Generate array of variants that actually exist
const generateVariants = () => {
  // Add only the button variants that actually exist
  const existingVariants = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
   
  ];
  
  return existingVariants;
};

// Usage example generator function
const getUsageExample = (selectedVariant: number) => {
  return `import Button from '@/app/multiui/buttons/_components/Button_${selectedVariant}';
                    
// Then use it in your component
<Button onClick={() => console.log('Button clicked')}>Click me</Button>`;
};

// Prop description component
const propDescription = (
  <p>
    The <code className="bg-gray-900 px-2 py-1 rounded text-sm">onClick</code> prop handles the click event. Most variants also accept <code className="bg-gray-900 px-2 py-1 rounded text-sm">variant</code> (primary, secondary, etc.), <code className="bg-gray-900 px-2 py-1 rounded text-sm">size</code> (sm, md, lg), and <code className="bg-gray-900 px-2 py-1 rounded text-sm">disabled</code> props.
  </p>
);

export default function ButtonsExamplesPage() {
  return (
    <ComponentTemplate
      title="Button Components"
      description="Interactive button components with various designs, animations, and hover effects for different user interactions."
      componentType="buttons"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 