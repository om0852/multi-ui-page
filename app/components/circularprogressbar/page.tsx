'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

// Generate array of variants that actually exist
const generateVariants = () => {
  // Add only the circularprogressbar variants that actually exist
  const existingVariants = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86
  ];
  
  return existingVariants;
};

// Usage example generator function
const getUsageExample = (selectedVariant: number) => {
  return `import CircularProgressBar from '@/app/multiui/circularprogressbar/_components/CircularProgressBar_${selectedVariant}';
                    
// Then use it in your component
<CircularProgressBar value={75} max={100} />`;
};

// Prop description component
const propDescription = (
  <p>
    The <code className="bg-gray-900 px-2 py-1 rounded text-sm">value</code> prop represents the current progress value and <code className="bg-gray-900 px-2 py-1 rounded text-sm">max</code> prop is the maximum value. Many variants also accept <code className="bg-gray-900 px-2 py-1 rounded text-sm">color</code>, <code className="bg-gray-900 px-2 py-1 rounded text-sm">size</code>, and <code className="bg-gray-900 px-2 py-1 rounded text-sm">showLabel</code> props.
  </p>
);

export default function CircularProgressBarExamplesPage() {
  return (
    <ComponentTemplate
      title="Circular Progress Bar Components"
      description="Circular progress indicators with various styles, animations, and customization options."
      componentType="circularprogressbar"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 