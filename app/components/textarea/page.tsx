'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Textarea from '@/app/multiui/textarea/_components/Textarea_${selectedVariant}';
                    
// Then use it in your component
<Textarea 
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder="Enter your message"
  rows={4}
  maxLength={200}
  showCount
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">value</code>: Textarea value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onChange</code>: Change handler
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">placeholder</code>: Placeholder text
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">rows</code>: Number of rows
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">maxLength</code>: Maximum characters
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">showCount</code>: Show character count
    </p>
  </div>
);

export default function TextareaPage() {
  return (
    <ComponentTemplate
      title="Textarea Components"
      description="Customizable textarea components with various features. Select a variant from the list to preview it."
      componentType="textarea"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 