'use client';

import React, { useState, useEffect, useRef, ReactNode, useCallback } from 'react';

interface VirtualizedItemProps {
  children: ReactNode;
  height: number;
  index: number;
  isVisible: boolean;
  onIntersect: (index: number) => void;
}

// Individual virtualized item with intersection observer
const VirtualizedItem: React.FC<VirtualizedItemProps> = ({ 
  children, 
  height, 
  index, 
  isVisible, 
  onIntersect 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect(index);
        }
      },
      { 
        rootMargin: '200px 0px', 
        threshold: 0.01 
      }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index, onIntersect]);

  return (
    <div 
      ref={ref} 
      style={{ minHeight: height, height: 'auto' }}
      className="virtualized-item"
    >
      {isVisible ? children : (
        <div className="flex items-center justify-center p-4 border rounded-md bg-gray-100 dark:bg-gray-800 animate-pulse" style={{ height }}>
          <div className="text-gray-500 dark:text-gray-400">Loading...</div>
        </div>
      )}
    </div>
  );
};

interface VirtualizedListProps {
  items: ReactNode[];
  itemHeight?: number;
  overscan?: number;
  className?: string;
  gridLayout?: boolean;
  gridColumns?: number;
}

// Main virtualized list component
const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  itemHeight = 200,
  overscan = 3,
  className = '',
  gridLayout = false,
  gridColumns = 2
}) => {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle item coming into view
  const handleItemInView = useCallback((index: number) => {
    setVisibleIndices(prev => {
      if (prev.includes(index)) return prev;
      
      // Add newly visible items and nearby items (overscan)
      const newIndices = [...prev, index];
      for (let i = 1; i <= overscan; i++) {
        if (index + i < items.length) newIndices.push(index + i);
        if (index - i >= 0) newIndices.push(index - i);
      }
      
      // Deduplicate and sort
      return Array.from(new Set(newIndices)).sort((a, b) => a - b);
    });
  }, [items.length, overscan]);

  // Initialize with first few items visible
  useEffect(() => {
    const initialVisibleCount = Math.min(5 + overscan, items.length);
    const initialIndices = Array.from({ length: initialVisibleCount }, (_, i) => i);
    setVisibleIndices(initialIndices);
  }, [items.length, overscan]);

  const containerClass = gridLayout 
    ? `grid grid-cols-1 md:grid-cols-${gridColumns} gap-4 ${className}`
    : `space-y-4 ${className}`;

  return (
    <div ref={containerRef} className={containerClass}>
      {items.map((item, index) => (
        <VirtualizedItem 
          key={index}
          index={index}
          height={itemHeight}
          isVisible={visibleIndices.includes(index)}
          onIntersect={handleItemInView}
        >
          {item}
        </VirtualizedItem>
      ))}
    </div>
  );
};

export default VirtualizedList; 