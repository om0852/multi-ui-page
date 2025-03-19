'use client';

import { useEffect } from 'react';
import { initializeAppOptimizations } from '../utils/app-loader';

/**
 * Component that initializes application optimizations
 * Place this at the top level of your application
 */
const AppInitializer: React.FC = () => {
  useEffect(() => {
    // Initialize optimizations on client-side
    initializeAppOptimizations();
  }, []);

  // This component doesn't render anything
  return null;
};

export default AppInitializer; 