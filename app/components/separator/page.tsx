'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Separator from '@/app/multiui/separator/_components/Separator_${selectedVariant}';
                    
// Then use it in your component
<Separator 
  orientation="horizontal"
  variant="dashed"
  label="OR"
  color="primary"
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">orientation</code>: horizontal, vertical
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">variant</code>: solid, dashed, dotted
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">label</code>: Optional text label
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">color</code>: primary, secondary, accent
    </p>
  </div>
);

export default function SeparatorPage() {
  return (
    <ComponentTemplate
      title="Separator Components"
      description="Beautiful separator components with various styles and orientations. Select a variant from the list to preview it."
      componentType="separator"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 