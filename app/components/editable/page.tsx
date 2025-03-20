'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Editable from '@/app/multiui/editable/_components/Editable_${selectedVariant}';
                    
// Then use it in your component
<Editable 
  initialValue="Click to edit"
  onSave={(value) => console.log(value)}
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">initialValue</code>: Initial text value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onSave</code>: Callback function when value is saved
    </p>
  </div>
);

export default function EditablePage() {
  return (
    <ComponentTemplate
      title="Editable Components"
      description="Interactive editable text components with various styles. Select a variant from the list to preview it."
      componentType="editable"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 