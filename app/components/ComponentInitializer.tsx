'use client';

import { useEffect } from 'react';
import { initializeDynamicComponentSystem } from '../utils/initialize-components';
import { registerAllMockComponents, registerSpecificExamples } from '../utils/create-mock-component';

/**
 * A component that initializes the dynamic component system
 * This component should be rendered once at the app root
 */
const ComponentInitializer = () => {
  useEffect(() => {
    // Initialize the dynamic component system on client-side
    initializeDynamicComponentSystem();
    
    // Register mock components for testing
    registerAllMockComponents();
    
    // Register specific examples for better UX
    registerSpecificExamples();
    
    console.log('Component system initialized');
  }, []);
  
  // This component doesn't render anything
  return null;
};

export default ComponentInitializer; 