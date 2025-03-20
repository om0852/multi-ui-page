'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import OTPField from '@/app/multiui/otpfield/_components/OTPField_${selectedVariant}';
                    
// Then use it in your component
<OTPField 
  length={6}
  onChange={(value) => console.log(value)}
  autoFocus
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">length</code>: Number of OTP digits
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onChange</code>: Value change handler
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">autoFocus</code>: Auto focus first input
    </p>
  </div>
);

export default function OTPFieldPage() {
  return (
    <ComponentTemplate
      title="OTP Field Components"
      description="One-Time Password input fields with various styles. Select a variant from the list to preview it."
      componentType="otpfield"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 