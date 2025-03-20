'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Loader from '@/app/multiui/loader/_components/Loader_${selectedVariant}';
                    
// Then use it in your component
<Loader 
  size="md"
  color="primary"
  text="Loading..."
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">size</code>: sm, md, lg
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">color</code>: primary, secondary, accent
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">text</code>: Loading text (optional)
    </p>
  </div>
);

export default function LoaderPage() {
  return (
    <ComponentTemplate
      title="Loader Components"
      description="Beautiful loading spinners and animations. Select a variant from the list to preview it."
      componentType="loader"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 