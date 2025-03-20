'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Rating from '@/app/multiui/rating/_components/Rating_${selectedVariant}';
                    
// Then use it in your component
<Rating 
  value={3.5}
  onChange={(value) => console.log(value)}
  max={5}
  size="md"
  allowHalf
  readonly={false}
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">value</code>: Rating value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onChange</code>: Rating change handler
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">max</code>: Maximum rating value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">size</code>: sm, md, lg
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">allowHalf</code>: Allow half ratings
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">readonly</code>: Make rating readonly
    </p>
  </div>
);

export default function RatingPage() {
  return (
    <ComponentTemplate
      title="Rating Components"
      description="Interactive rating components with various styles and features. Select a variant from the list to preview it."
      componentType="rating"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 