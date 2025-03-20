'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Share from '@/app/multiui/share/_components/Share_${selectedVariant}';
                    
// Then use it in your component
<Share 
  url="https://example.com"
  title="Check this out!"
  platforms={['twitter', 'facebook', 'linkedin']}
  onShare={(platform) => console.log(platform)}
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">url</code>: URL to share
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">title</code>: Share title
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">platforms</code>: Array of social platforms
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onShare</code>: Share callback function
    </p>
  </div>
);

export default function SharePage() {
  return (
    <ComponentTemplate
      title="Share Components"
      description="Social media share components with various platforms and styles. Select a variant from the list to preview it."
      componentType="share"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 