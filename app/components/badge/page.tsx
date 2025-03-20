'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

// Generate array of variants that actually exist
const generateVariants = () => {
  // Add only the badge variants that actually exist (1-30)
  const existingVariants = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30
  ];
  
  return existingVariants;
};

// Usage example generator function
const getUsageExample = (selectedVariant: number) => {
  return `import Badge from '@/app/multiui/badge/_components/Badge_${selectedVariant}';
                    
// Then use it in your component
<Badge text="Your text" />`;
};

// Prop description component
const propDescription = (
  <p>
    The <code className="bg-gray-900 px-2 py-1 rounded text-sm">text</code> prop is the content displayed in the badge. Some variants may also accept <code className="bg-gray-900 px-2 py-1 rounded text-sm">variant</code> (primary, secondary, etc.) and <code className="bg-gray-900 px-2 py-1 rounded text-sm">size</code> (sm, md, lg) props.
  </p>
);

export default function BadgeExamplesPage() {
  return (
    <ComponentTemplate
      title="Badge Components"
      description="Various badge designs for status indicators, notifications, and labels with different styles and animations."
      componentType="badge"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 