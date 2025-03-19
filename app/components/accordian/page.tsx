'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

// Generate array of all variants from 1 to 105
const generateVariants = () => {
  // Add variants 1-105 (only including those that actually exist)
  const existingVariants = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
    101, 102, 103, 104, 105
  ];
  
  return existingVariants;
};

// Usage example generator function
const getUsageExample = (selectedVariant: number) => {
  return `import Accordion from '@/app/multiui/accordian/_components/Accordian_${selectedVariant}';
                    
// Then use it in your component
<Accordion items={yourItems} />`;
};

// Prop description component
const propDescription = (
  <p>
    The <code className="bg-gray-900 px-2 py-1 rounded text-sm">items</code> prop should be an array of objects with <code className="bg-gray-900 px-2 py-1 rounded text-sm">title</code> and <code className="bg-gray-900 px-2 py-1 rounded text-sm">content</code> properties.
  </p>
);

export default function AccordianExamplesPage() {
  return (
    <ComponentTemplate
      title="Accordion Components"
      description="Interactive accordion components with various designs and animations. Select a variant from the list to preview it."
      componentType="accordian"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 