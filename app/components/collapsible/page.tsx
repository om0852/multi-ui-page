'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

// Generate array of variants that actually exist
const generateVariants = () => {
  // Add only the collapsible variants that actually exist
  const existingVariants = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50
  ];
  
  return existingVariants;
};

// Usage example generator function
const getUsageExample = (selectedVariant: number) => {
  return `import Collapsible from '@/app/multiui/collapsible/_components/Collapsible_${selectedVariant}';
                    
// Then use it in your component
<Collapsible 
  title="Click to expand" 
  defaultOpen={false}
>
  <p>This content is collapsible</p>
</Collapsible>`;
};

// Prop description component
const propDescription = (
  <p>
    Key props include <code className="bg-gray-900 px-2 py-1 rounded text-sm">title</code> (header text), <code className="bg-gray-900 px-2 py-1 rounded text-sm">defaultOpen</code> (boolean), and <code className="bg-gray-900 px-2 py-1 rounded text-sm">children</code> (content). Many variants also accept <code className="bg-gray-900 px-2 py-1 rounded text-sm">onToggle</code> (callback function) and <code className="bg-gray-900 px-2 py-1 rounded text-sm">variant</code> props.
  </p>
);

export default function CollapsibleExamplesPage() {
  return (
    <ComponentTemplate
      title="Collapsible Components"
      description="Expandable and collapsible content sections with various animations, styles, and interactive behaviors."
      componentType="collapsible"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 