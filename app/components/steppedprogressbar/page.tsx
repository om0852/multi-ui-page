'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import SteppedProgressBar from '@/app/multiui/steppedprogressbar/_components/SteppedProgressBar_${selectedVariant}';
                    
// Then use it in your component
<SteppedProgressBar 
  steps={[
    { label: 'Step 1', status: 'completed' },
    { label: 'Step 2', status: 'current' },
    { label: 'Step 3', status: 'upcoming' }
  ]}
  orientation="horizontal"
  showLabels
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">steps</code>: Array of step objects
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">orientation</code>: horizontal, vertical
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">showLabels</code>: Show step labels
    </p>
  </div>
);

export default function SteppedProgressBarPage() {
  return (
    <ComponentTemplate
      title="Stepped Progress Bar Components"
      description="Multi-step progress indicators with various styles and orientations. Select a variant from the list to preview it."
      componentType="steppedprogressbar"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 