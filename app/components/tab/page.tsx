'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Tab from '@/app/multiui/tab/_components/Tab_${selectedVariant}';
                    
// Then use it in your component
<Tab 
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
    { id: 'tab2', label: 'Tab 2', content: 'Content 2' }
  ]}
  activeTab="tab1"
  onChange={(tabId) => setActiveTab(tabId)}
  variant="pills"
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">tabs</code>: Array of tab items
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">activeTab</code>: Active tab ID
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onChange</code>: Tab change handler
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">variant</code>: underline, pills, tabs
    </p>
  </div>
);

export default function TabPage() {
  return (
    <ComponentTemplate
      title="Tab Components"
      description="Interactive tab components with various styles and animations. Select a variant from the list to preview it."
      componentType="tab"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 