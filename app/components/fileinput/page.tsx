'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import FileInput from '@/app/multiui/fileinput/_components/FileInput_${selectedVariant}';
                    
// Then use it in your component
<FileInput 
  accept=".jpg,.png,.pdf"
  multiple={false}
  onChange={(files) => console.log(files)}
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">accept</code>: Accepted file types
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">multiple</code>: Allow multiple file selection
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onChange</code>: Callback function when files are selected
    </p>
  </div>
);

export default function FileInputPage() {
  return (
    <ComponentTemplate
      title="File Input Components"
      description="Stylish file input components with various designs. Select a variant from the list to preview it."
      componentType="fileinput"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 