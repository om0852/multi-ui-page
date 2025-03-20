'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Label from '@/app/multiui/labels/_components/Label_${selectedVariant}';
                    
// Then use it in your component
<Label 
  text="New"
  variant="success"
  size="md"
  isRounded
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">text</code>: Label text content
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">variant</code>: success, error, warning, info
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">size</code>: sm, md, lg
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">isRounded</code>: Apply rounded corners
    </p>
  </div>
);

export default function LabelsPage() {
  return (
    <ComponentTemplate
      title="Label Components"
      description="Beautiful label components with various styles and variants. Select a variant from the list to preview it."
      componentType="labels"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 