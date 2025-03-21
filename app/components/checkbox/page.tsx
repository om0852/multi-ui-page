'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

// Generate array of variants that actually exist
const generateVariants = () => {
  // Add only the checkbox variants that actually exist
  const existingVariants = [
    2, 4, 5, 6, 7, 8, 9,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  ];
  
  return existingVariants;
};

// Usage example generator function
const getUsageExample = (selectedVariant: number) => {
  return `import Checkbox from '@/app/multiui/checkbox/_components/Checkbox_${selectedVariant}';
                    
// Then use it in your component
<Checkbox 
  checked={isChecked} 
  onChange={(e) => setIsChecked(e.target.checked)}
  label="Accept terms and conditions" 
/>`;
};

// Prop description component
const propDescription = (
  <p>
    Key props include <code className="bg-gray-900 px-2 py-1 rounded text-sm">checked</code> (boolean), <code className="bg-gray-900 px-2 py-1 rounded text-sm">onChange</code> (event handler), and <code className="bg-gray-900 px-2 py-1 rounded text-sm">label</code> (string). Many variants also accept <code className="bg-gray-900 px-2 py-1 rounded text-sm">disabled</code>, <code className="bg-gray-900 px-2 py-1 rounded text-sm">indeterminate</code>, and <code className="bg-gray-900 px-2 py-1 rounded text-sm">size</code> props.
  </p>
);

export default function CheckboxExamplesPage() {
  return (
    <ComponentTemplate
      title="Checkbox Components"
      description="Interactive checkbox components with various styles, animations, and customizable states for form inputs."
      componentType="checkbox"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 