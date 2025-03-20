'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import InputMask from '@/app/multiui/inputmask/_components/InputMask_${selectedVariant}';
                    
// Then use it in your component
<InputMask 
  mask="+1 (999) 999-9999"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Phone Number"
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">mask</code>: Input mask pattern
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">value</code>: Input value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onChange</code>: Change event handler
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">placeholder</code>: Placeholder text
    </p>
  </div>
);

export default function InputMaskPage() {
  return (
    <ComponentTemplate
      title="Input Mask Components"
      description="Masked input components with various formats and styles. Select a variant from the list to preview it."
      componentType="inputmask"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 