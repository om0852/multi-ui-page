'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import MenuBar from '@/app/multiui/menubar/_components/MenuBar_${selectedVariant}';
                    
// Then use it in your component
<MenuBar 
  items={[
    { label: 'File', items: ['New', 'Open', 'Save'] },
    { label: 'Edit', items: ['Cut', 'Copy', 'Paste'] }
  ]}
  onSelect={(item) => console.log(item)}
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">items</code>: Menu structure
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onSelect</code>: Selection handler
    </p>
  </div>
);

export default function MenuBarPage() {
  return (
    <ComponentTemplate
      title="Menu Bar Components"
      description="Professional menu bar components with dropdowns. Select a variant from the list to preview it."
      componentType="menubar"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 