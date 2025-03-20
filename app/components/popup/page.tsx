'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Popup from '@/app/multiui/popup/_components/Popup_${selectedVariant}';
                    
// Then use it in your component
<Popup 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="bottom"
  trigger={<button>Click me</button>}
>
  Popup content here
</Popup>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">isOpen</code>: Control popup visibility
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onClose</code>: Close handler
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">position</code>: top, right, bottom, left
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">trigger</code>: Element that triggers popup
    </p>
  </div>
);

export default function PopupPage() {
  return (
    <ComponentTemplate
      title="Popup Components"
      description="Customizable popup components with various positions and animations. Select a variant from the list to preview it."
      componentType="popup"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 