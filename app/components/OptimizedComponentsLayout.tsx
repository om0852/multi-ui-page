'use client';

import React, { useEffect, ReactNode } from 'react';
import { initializePageOptimization, setupVisibilityBasedLoading } from '../utils/component-optimization';
import { registerAllComponentConfigurations } from '../utils/component-configs';

interface OptimizedComponentsLayoutProps {
  children: ReactNode;
  activeComponentTypes?: string[];
}

/**
 * Layout component that handles optimized loading of components
 * Wrap your pages with this component to get optimized loading
 */
const OptimizedComponentsLayout: React.FC<OptimizedComponentsLayoutProps> = ({ 
  children, 
  activeComponentTypes = [] 
}) => {
  useEffect(() => {
    // Register component configurations on first render
    registerAllComponentConfigurations();
    
    // Initialize optimization with the active component types
    initializePageOptimization(activeComponentTypes);
    
    // Setup visibility-based loading after a short delay
    const timeoutId = setTimeout(() => {
      setupVisibilityBasedLoading();
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [activeComponentTypes]);
  
  return (
    <div className="optimized-components-layout">
      {children}
    </div>
  );
};

export default OptimizedComponentsLayout; 