'use client';

import { registerComponent } from './dynamic-loading';
import React from 'react';

/**
 * Interface for mock component options
 */
interface MockComponentOptions {
  type: string;
  id: number | string;
  label?: string;
  color?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
}

/**
 * Creates a mock component and registers it in the component registry
 * This is useful for testing the dynamic component system without having real components
 * @param options Options for the mock component
 */
export function createMockComponent(options: MockComponentOptions) {
  const { type, id, label, color, variant = 'default' } = options;
  
  // Normalize the component key
  const normalizedType = type.toLowerCase();
  const componentKey = `${normalizedType}_${id}`;
  const exampleKey = `${normalizedType}_example_${id}`;
  
  // Register a simple component factory that just returns a function component
  registerComponent(componentKey, () => {
    return Promise.resolve({
      // The default export is our component
      default: () => {
        // This is processed on the client side
        return null; // The actual rendering is handled by our fallback component
      }
    });
  });
  
  // Also register an example variant
  registerComponent(exampleKey, () => {
    return Promise.resolve({
      default: () => {
        return null; // The actual rendering is handled by our fallback component
      }
    });
  });
  
  return { componentKey, exampleKey };
}

/**
 * Creates multiple mock components for a specific type
 * @param type The component type (e.g., 'buttons', 'cards')
 * @param count Number of mock components to create
 * @param options Additional options for the mock components
 */
export function createMockComponentSet(
  type: string, 
  count: number = 5, 
  options: Partial<MockComponentOptions> = {}
) {
  const results = [];
  
  for (let i = 1; i <= count; i++) {
    results.push(
      createMockComponent({
        type,
        id: i,
        ...options
      })
    );
  }
  
  return results;
}

/**
 * Register a set of mock components for all common types
 * This is useful for testing and demos when real components aren't available
 */

/**
 * Generate specific examples for common components to enhance the demo experience
 * This is only used as a backup if the real examples don't exist
 */
export function registerSpecificExamples() {
  // We're now loading directly from the example folders, but we want to ensure
  // certain common examples always work even if files don't exist
  
  // Common component types for which to register fallbacks
  const priorityComponents = [
    'accordion', 'buttons', 'cards', 'avatar', 'badges'
  ];
  
  // For each type, register the first few examples to ensure they always work
  priorityComponents.forEach(type => {
    // Register the first 5 examples for each type
    for (let i = 1; i <= 5; i++) {
      const key = `${type.toLowerCase()}_example_${i}_fallback`;
      
      // We don't actually need an implementation here - ExampleRenderer handles fallbacks
      registerComponent(key, () => {
        return Promise.resolve({
          default: () => null // Implementation is in ExampleRenderer FallbackExample
        });
      });
    }
  });
  
  console.log('Registered fallback components for common examples');
} 