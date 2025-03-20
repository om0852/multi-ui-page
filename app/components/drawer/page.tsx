'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Drawer from '@/app/multiui/drawer/_components/Drawer_${selectedVariant}';
                    
// Then use it in your component
<Drawer 
  position="left"
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
>
  {/* Drawer content */}
</Drawer>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">position</code>: Drawer position (left, right, top, bottom)
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">isOpen</code>: Controls drawer visibility
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onClose</code>: Callback function when drawer closes
    </p>
  </div>
);

export default function DrawerPage() {
  return (
    <ComponentTemplate
      title="Drawer Components"
      description="Customizable drawer components with various designs and animations. Select a variant from the list to preview it."
      componentType="drawer"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 