'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Switch from '@/app/multiui/switch/_components/Switch_${selectedVariant}';
                    
// Then use it in your component
<Switch 
  checked={isChecked}
  onChange={(checked) => setIsChecked(checked)}
  size="md"
  label="Dark Mode"
  disabled={false}
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">checked</code>: Switch state
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onChange</code>: Change handler
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">size</code>: sm, md, lg
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">label</code>: Switch label
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">disabled</code>: Disable switch
    </p>
  </div>
);

export default function SwitchPage() {
  return (
    <ComponentTemplate
      title="Switch Components"
      description="Toggle switch components with various styles and animations. Select a variant from the list to preview it."
      componentType="switch"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 