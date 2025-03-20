'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import ProgressBar from '@/app/multiui/progressbar/_components/ProgressBar_${selectedVariant}';
                    
// Then use it in your component
<ProgressBar 
  value={75}
  max={100}
  showLabel
  variant="primary"
  animated
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">value</code>: Current progress value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">max</code>: Maximum value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">showLabel</code>: Show percentage label
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">variant</code>: primary, success, warning, error
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">animated</code>: Enable animation
    </p>
  </div>
);

export default function ProgressBarPage() {
  return (
    <ComponentTemplate
      title="Progress Bar Components"
      description="Interactive progress bar components with various styles and animations. Select a variant from the list to preview it."
      componentType="progressbar"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 