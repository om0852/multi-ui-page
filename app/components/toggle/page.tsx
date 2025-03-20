'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Toggle from '@/app/multiui/toggle/_components/Toggle_${selectedVariant}';
                    
// Then use it in your component
<Toggle 
  options={[
    { value: 'list', label: 'List View' },
    { value: 'grid', label: 'Grid View' }
  ]}
  value="list"
  onChange={(value) => setValue(value)}
  size="md"
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">options</code>: Toggle options
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">value</code>: Selected value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onChange</code>: Change handler
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">size</code>: sm, md, lg
    </p>
  </div>
);

export default function TogglePage() {
  return (
    <ComponentTemplate
      title="Toggle Components"
      description="Multi-option toggle components with various styles and animations. Select a variant from the list to preview it."
      componentType="toggle"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 