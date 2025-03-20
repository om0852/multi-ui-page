'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import PasswordInput from '@/app/multiui/passwordinput/_components/PasswordInput_${selectedVariant}';
                    
// Then use it in your component
<PasswordInput 
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  showStrengthMeter
  placeholder="Enter password"
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">value</code>: Password value
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onChange</code>: Change handler
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">showStrengthMeter</code>: Show password strength indicator
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">placeholder</code>: Input placeholder text
    </p>
  </div>
);

export default function PasswordInputPage() {
  return (
    <ComponentTemplate
      title="Password Input Components"
      description="Secure password input fields with strength indicators. Select a variant from the list to preview it."
      componentType="passwordinput"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 