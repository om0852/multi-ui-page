'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import RangeSlider from '@/app/multiui/rangeslider/_components/RangeSlider_${selectedVariant}';
                    
// Then use it in your component
<RangeSlider 
  min={0}
  max={100}
  value={[20, 80]}
  onChange={(values) => console.log(values)}
  showLabels
  step={1}
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">min</code>: Minimum value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">max</code>: Maximum value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">value</code>: Current value(s)
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onChange</code>: Value change handler
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">showLabels</code>: Show min/max labels
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">step</code>: Step increment value
    </p>
  </div>
);

export default function RangeSliderPage() {
  return (
    <ComponentTemplate
      title="Range Slider Components"
      description="Interactive range slider components with various styles and features. Select a variant from the list to preview it."
      componentType="rangeslider"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 