'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

// Generate array of variants that actually exist
const generateVariants = () => {
  // Add only the clock variants that actually exist
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
  return `import Clock from '@/app/multiui/clock/_components/Clock_${selectedVariant}';
                    
// Then use it in your component
<Clock format="24hour" showSeconds={true} />`;
};

// Prop description component
const propDescription = (
  <p>
    Common props include <code className="bg-gray-900 px-2 py-1 rounded text-sm">format</code> (12hour/24hour), <code className="bg-gray-900 px-2 py-1 rounded text-sm">showSeconds</code> (boolean), and <code className="bg-gray-900 px-2 py-1 rounded text-sm">timezone</code>. Some variants also accept <code className="bg-gray-900 px-2 py-1 rounded text-sm">size</code> and <code className="bg-gray-900 px-2 py-1 rounded text-sm">variant</code> (analog/digital) props.
  </p>
);

export default function ClockExamplesPage() {
  return (
    <ComponentTemplate
      title="Clock Components"
      description="Clock components with various styles, animations, and display formats for time representation."
      componentType="clock"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 