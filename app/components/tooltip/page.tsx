'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Tooltip from '@/app/multiui/tooltip/_components/Tooltip_${selectedVariant}';
                    
// Then use it in your component
<Tooltip 
  content="Helpful information"
  position="top"
  trigger="hover"
  delay={200}
  arrow
>
  <button>Hover me</button>
</Tooltip>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">content</code>: Tooltip content
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">position</code>: top, right, bottom, left
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">trigger</code>: hover, click, focus
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">delay</code>: Show/hide delay in ms
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">arrow</code>: Show arrow pointer
    </p>
  </div>
);

export default function TooltipPage() {
  return (
    <ComponentTemplate
      title="Tooltip Components"
      description="Informative tooltip components with various positions and animations. Select a variant from the list to preview it."
      componentType="tooltip"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 