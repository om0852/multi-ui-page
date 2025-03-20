'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import ListGroup from '@/app/multiui/listgroup/_components/ListGroup_${selectedVariant}';
                    
// Then use it in your component
<ListGroup
  items={[
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' }
  ]}
  onItemClick={(item) => console.log(item)}
  activeItem={1}
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">items</code>: Array of list items
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onItemClick</code>: Click handler for items
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">activeItem</code>: Currently active item ID
    </p>
  </div>
);

export default function ListGroupPage() {
  return (
    <ComponentTemplate
      title="List Group Components"
      description="Interactive list group components with various styles. Select a variant from the list to preview it."
      componentType="listgroup"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 