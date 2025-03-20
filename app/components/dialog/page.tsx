'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Dialog from '@/app/multiui/dialog/_components/Dialog_${selectedVariant}';
                    
// Then use it in your component
<Dialog 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Dialog Title"
  size="md"
>
  {/* Dialog content */}
</Dialog>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">isOpen</code>: Controls dialog visibility
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onClose</code>: Callback function when dialog closes
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">title</code>: Dialog title text
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">size</code>: Dialog size (sm, md, lg, xl)
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">children</code>: Dialog content
    </p>
  </div>
);

export default function DialogPage() {
  return (
    <ComponentTemplate
      title="Dialog Components"
      description="Modal dialog components with various designs and animations. Select a variant from the list to preview it."
      componentType="dialog"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 