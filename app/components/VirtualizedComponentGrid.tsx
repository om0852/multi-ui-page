'use client';

import React, { ReactNode, Suspense } from 'react';
import VirtualizedList from './VirtualizedList';
import { getComponentContainerProps } from '../utils/component-optimization';
import { componentHeights } from '../utils/component-configs';

interface ComponentItemProps {
  title?: string;
  componentType: string;
  componentId: string;
  children: ReactNode;
}

// Single component item with proper container
const ComponentItem: React.FC<ComponentItemProps> = ({ 
  title,
  componentType,
  componentId,
  children
}) => {
  return (
    <div 
      className="component-item"
      {...getComponentContainerProps(componentType, componentId)}
    >
      {title && (
        <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
          {title}
        </h3>
      )}
      <div className="component-item-content rounded-md overflow-hidden">
        <Suspense fallback={
          <div className="flex items-center justify-center p-4 border rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse min-h-[150px]">
            <div className="text-gray-500 dark:text-gray-400">Loading component...</div>
          </div>
        }>
          {children}
        </Suspense>
      </div>
    </div>
  );
};

interface VirtualizedComponentGridProps {
  items: {
    title?: string;
    componentType: string;
    componentId: string;
    component: ReactNode;
  }[];
  columns?: number;
  className?: string;
}

// Main virtualized component grid
const VirtualizedComponentGrid: React.FC<VirtualizedComponentGridProps> = ({
  items,
  columns = 2,
  className = ''
}) => {
  // Wrap each component with proper container
  const wrappedItems = items.map((item, index) => (
    <ComponentItem
      key={index}
      title={item.title}
      componentType={item.componentType}
      componentId={item.componentId}
    >
      {item.component}
    </ComponentItem>
  ));

  // Get average component height based on component types
  const itemHeights = items.map(item => componentHeights[item.componentType] || 150);
  const averageHeight = itemHeights.reduce((a, b) => a + b, 0) / itemHeights.length;

  return (
    <VirtualizedList
      items={wrappedItems}
      itemHeight={averageHeight}
      gridLayout={true}
      gridColumns={columns}
      className={className}
      overscan={3}
    />
  );
};

export default VirtualizedComponentGrid; 