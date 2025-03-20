'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

const generateVariants = () => {
  const existingVariants = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return existingVariants;
};

const getUsageExample = (selectedVariant: number) => {
  return `import Sidebar from '@/app/multiui/sidebar/_components/Sidebar_${selectedVariant}';
                    
// Then use it in your component
<Sidebar 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="left"
  width="300px"
  items={[
    { icon: '🏠', label: 'Home', href: '/' },
    { icon: '📊', label: 'Dashboard', href: '/dashboard' }
  ]}
/>`;
};

const propDescription = (
  <div>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">isOpen</code>: Control sidebar visibility
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">onClose</code>: Close handler
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">position</code>: left, right
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">width</code>: Sidebar width
    </p>
    <p>
      <code className="bg-gray-900 px-2 py-1 rounded text-sm">items</code>: Navigation items
    </p>
  </div>
);

export default function SidebarPage() {
  return (
    <ComponentTemplate
      title="Sidebar Components"
      description="Responsive sidebar components with various styles and animations. Select a variant from the list to preview it."
      componentType="sidebar"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 