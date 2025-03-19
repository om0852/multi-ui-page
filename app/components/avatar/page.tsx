'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

// Generate array of all variants
const generateVariants = () => {
  // Add variants (only including those that actually exist)
  const existingVariants = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30
  ];
  
  return existingVariants;
};

// Usage example generator function
const getUsageExample = (selectedVariant: number) => {
  return `import Avatar from '@/app/multiui/avatar/_components/Avatar_${selectedVariant}';
                    
// Then use it in your component
<Avatar src="/path/to/image.jpg" alt="User Name" />`;
};

// Prop description component
const propDescription = (
  <p>
    The <code className="bg-gray-900 px-2 py-1 rounded text-sm">src</code> prop is the path to the avatar image, and <code className="bg-gray-900 px-2 py-1 rounded text-sm">alt</code> is the alternative text for accessibility.
  </p>
);

export default function AvatarExamplesPage() {
  return (
    <ComponentTemplate
      title="Avatar Components"
      description="Interactive avatar components with various designs and styles. Select a variant from the list to preview it."
      componentType="avatar"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 