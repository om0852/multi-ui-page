'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Typewriter from '@/app/multiui/typewriter/_components/Typewriter_${selectedVariant}';
                    
// Then use it in your component
<Typewriter 
  text={["Hello World!", "Welcome!", "Type with style!"]}
  speed={100}
  loop={true}
  cursor="|"
  deleteSpeed={50}
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">text</code>: Text or array of texts
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">speed</code>: Typing speed in ms
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">loop</code>: Loop animation
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">cursor</code>: Cursor character
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">deleteSpeed</code>: Deletion speed in ms
    </p>
  </div>
);

export default function TypewriterPage() {
  return (
    <ComponentTemplate
      title="Typewriter Components"
      description="Animated typewriter text components with various effects. Select a variant from the list to preview it."
      componentType="typewriter"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 