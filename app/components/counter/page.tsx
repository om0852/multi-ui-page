'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Counter from '@/app/multiui/counter/_components/Counter_${selectedVariant}';
                    
// Then use it in your component
<Counter 
  initialValue={0}
  min={0}
  max={100}
  step={1}
  onChange={(value) => console.log(value)}
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">initialValue</code>: Initial counter value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">min</code>: Minimum allowed value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">max</code>: Maximum allowed value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">step</code>: Step value for increment/decrement
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onChange</code>: Callback function when value changes
    </p>
  </div>
);

export default function CounterPage() {
  return (
    <ComponentTemplate
      title="Counter Components"
      description="Interactive counter components with various designs and styles. Select a variant from the list to preview it."
      componentType="counter"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 