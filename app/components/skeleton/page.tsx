'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Skeleton from '@/app/multiui/skeleton/_components/Skeleton_${selectedVariant}';
                    
// Then use it in your component
<Skeleton 
  variant="text"
  width="200px"
  height="20px"
  animation="wave"
  repeat={3}
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">variant</code>: text, circle, rect
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">width</code>: Element width
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">height</code>: Element height
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">animation</code>: pulse, wave
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">repeat</code>: Number of elements
    </p>
  </div>
);

export default function SkeletonPage() {
  return (
    <ComponentTemplate
      title="Skeleton Components"
      description="Loading skeleton components with various animations and styles. Select a variant from the list to preview it."
      componentType="skeleton"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 