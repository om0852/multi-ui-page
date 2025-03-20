'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import InputField from '@/app/multiui/inputfield/_components/InputField_${selectedVariant}';
                    
// Then use it in your component
<InputField 
  label="Username"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error={error}
  helperText="Enter your username"
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">label</code>: Input field label
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">value</code>: Input value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onChange</code>: Change event handler
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">error</code>: Error state
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">helperText</code>: Helper text below input
    </p>
  </div>
);

export default function InputFieldPage() {
  return (
    <ComponentTemplate
      title="Input Field Components"
      description="Customizable input field components with various styles. Select a variant from the list to preview it."
      componentType="inputfield"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 