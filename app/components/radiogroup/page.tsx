'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import RadioGroup from '@/app/multiui/radiogroup/_components/RadioGroup_${selectedVariant}';
                    
// Then use it in your component
<RadioGroup 
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ]}
  value={selectedValue}
  onChange={(value) => setSelectedValue(value)}
  name="options"
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">options</code>: Array of radio options
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">value</code>: Selected value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onChange</code>: Selection change handler
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">name</code>: Input name attribute
    </p>
  </div>
);

export default function RadioGroupPage() {
  return (
    <ComponentTemplate
      title="Radio Group Components"
      description="Customizable radio button group components with various styles. Select a variant from the list to preview it."
      componentType="radiogroup"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 