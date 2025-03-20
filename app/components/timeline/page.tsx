'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Timeline from '@/app/multiui/timeline/_components/Timeline_${selectedVariant}';
                    
// Then use it in your component
<Timeline 
  items={[
    { title: 'Event 1', description: 'Description 1', date: '2024-01-01' },
    { title: 'Event 2', description: 'Description 2', date: '2024-02-01' }
  ]}
  orientation="vertical"
  alternating={true}
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">items</code>: Array of timeline events
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">orientation</code>: vertical, horizontal
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">alternating</code>: Alternate item sides
    </p>
  </div>
);

export default function TimelinePage() {
  return (
    <ComponentTemplate
      title="Timeline Components"
      description="Interactive timeline components with various styles and layouts. Select a variant from the list to preview it."
      componentType="timeline"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 