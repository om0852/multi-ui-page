'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

// Generate array of variants that actually exist
const generateVariants = () => {
  // Add only the confetti variants that actually exist
  const existingVariants = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17
  ];
  
  return existingVariants;
};

// Usage example generator function
const getUsageExample = (selectedVariant: number) => {
  return `import Confetti from '@/app/multiui/confetti/_components/Confetti_${selectedVariant}';
                    
// Then use it in your component
<Confetti 
  active={isActive} 
  duration={3000}
/>`;
};

// Prop description component
const propDescription = (
  <p>
    Key props include <code className="bg-gray-900 px-2 py-1 rounded text-sm">active</code> (boolean to trigger animation) and <code className="bg-gray-900 px-2 py-1 rounded text-sm">duration</code> (in ms). Many variants also accept <code className="bg-gray-900 px-2 py-1 rounded text-sm">colors</code> (array of color strings), <code className="bg-gray-900 px-2 py-1 rounded text-sm">particleCount</code>, and <code className="bg-gray-900 px-2 py-1 rounded text-sm">spread</code> props.
  </p>
);

export default function ConfettiExamplesPage() {
  return (
    <ComponentTemplate
      title="Confetti Components"
      description="Celebratory confetti animation components with various styles, patterns, and customization options."
      componentType="confetti"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 