'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

// Generate array of variants that actually exist
const generateVariants = () => {
  // Add only the clipboard variants that actually exist
  const existingVariants = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100
  ];
  
  return existingVariants;
};

// Usage example generator function
const getUsageExample = (selectedVariant: number) => {
  return `import Clipboard from '@/app/multiui/clipboard/_components/Clipboard_${selectedVariant}';
                    
// Then use it in your component
<Clipboard text="Text to copy" onCopy={() => alert('Copied!')} />`;
};

// Prop description component
const propDescription = (
  <p>
    Key props include <code className="bg-gray-900 px-2 py-1 rounded text-sm">text</code> (content to copy) and <code className="bg-gray-900 px-2 py-1 rounded text-sm">onCopy</code> (callback function). Many variants also accept <code className="bg-gray-900 px-2 py-1 rounded text-sm">buttonText</code>, <code className="bg-gray-900 px-2 py-1 rounded text-sm">successText</code>, and <code className="bg-gray-900 px-2 py-1 rounded text-sm">variant</code> props.
  </p>
);

export default function ClipboardExamplesPage() {
  return (
    <ComponentTemplate
      title="Clipboard Components"
      description="Copy to clipboard components with various styles, animations, and feedback indicators."
      componentType="clipboard"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 