'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

// Generate array of variants that actually exist
const generateVariants = () => {
  // Add only the card variants that actually exist
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
    91, 92, 93, 94, 95, 96, 97, 98, 99,
    112, 113, 115
  ];
  
  return existingVariants;
};

// Usage example generator function
const getUsageExample = (selectedVariant: number) => {
  return `import Card from '@/app/multiui/cards/_components/Card_${selectedVariant}';
                    
// Then use it in your component
<Card 
  title="Card Title" 
  description="This is a card description" 
  image="/image.jpg" 
/>`;
};

// Prop description component
const propDescription = (
  <p>
    Common props include <code className="bg-gray-900 px-2 py-1 rounded text-sm">title</code>, <code className="bg-gray-900 px-2 py-1 rounded text-sm">description</code>, <code className="bg-gray-900 px-2 py-1 rounded text-sm">image</code> (URL), and <code className="bg-gray-900 px-2 py-1 rounded text-sm">footer</code>. Some variants may also accept <code className="bg-gray-900 px-2 py-1 rounded text-sm">variant</code> (outlined, elevated, etc.) and <code className="bg-gray-900 px-2 py-1 rounded text-sm">onClick</code> props.
  </p>
);

export default function CardsExamplesPage() {
  return (
    <ComponentTemplate
      title="Card Components"
      description="Various card designs for content display, with different layouts, animations, and interactive elements."
      componentType="cards"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 