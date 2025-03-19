/**
 * Global component optimization utilities
 * These utilities can be used for any component type in the application
 */
import { lazy, ComponentType } from 'react';
import { createVirtualizedComponent, loadPrioritizedComponents as loadPriorityComponents } from './dynamic-loading';

// Export loadPrioritizedComponents for use in other modules
export const loadPrioritizedComponents = loadPriorityComponents;

// Track loaded components to avoid duplicate loading
const componentCache: Record<string, ComponentType<any>> = {};

/**
 * Creates an optimized component for any component type
 * @param componentPath Path to the component module
 * @param componentName Name identifier for the component
 * @param placeholderHeight Height to reserve for virtualized loading
 * @returns Optimized lazy-loaded component
 */
export function createOptimizedComponent(
  componentPath: string, 
  componentName: string,
  placeholderHeight = 150
) {
  // Check if component is already cached
  const cacheKey = `${componentName}:${componentPath}`;
  if (componentCache[cacheKey]) {
    return componentCache[cacheKey];
  }
  
  // Create virtualized component
  const Component = createVirtualizedComponent(
    () => import(componentPath),
    placeholderHeight
  );
  
  // Cache for future use
  componentCache[cacheKey] = Component;
  return Component;
}

// Component type configuration map
type ComponentConfig = {
  path: string;
  priority: number;
  placeholderHeight?: number;
};

// Store configurations for all component types
const componentConfigurations: Record<string, ComponentConfig[]> = {};

/**
 * Register a component configuration for optimized loading
 * @param componentType Type of component (e.g., 'button', 'card', 'clipboard')
 * @param config Configuration for the component
 */
export function registerComponentConfig(componentType: string, config: ComponentConfig[]) {
  // Only register if it's not already registered or if force update
  componentConfigurations[componentType] = config;
}

/**
 * Get the registered configurations for a component type
 * @param componentType Type of component to get configs for
 * @returns Array of component configurations
 */
export function getComponentConfigs(componentType: string): ComponentConfig[] {
  return componentConfigurations[componentType] || [];
}

/**
 * Initialize optimization for a specific page
 * @param activeComponentTypes Array of component types that should be loaded for this page
 */
export function initializePageOptimization(activeComponentTypes: string[]) {
  if (typeof window === 'undefined') return;
  
  // Limit the number of component types to optimize at once to prevent overload
  const limitedComponentTypes = activeComponentTypes.slice(0, 2);
  
  // First, load the components needed for the current page
  const componentsToLoad: { path: string; priority: number }[] = [];
  
  limitedComponentTypes.forEach(type => {
    const configs = getComponentConfigs(type);
    // Only take first few components from each type
    const limitedConfigs = configs.slice(0, 5);
    limitedConfigs.forEach(config => {
      componentsToLoad.push({
        path: config.path,
        priority: config.priority
      });
    });
  });
  
  // Sort by priority (lower number = higher priority)
  componentsToLoad.sort((a, b) => a.priority - b.priority);
  
  // Load first few immediately - but use a staggered approach to avoid blocking
  const immediateLoad = componentsToLoad.slice(0, Math.min(3, componentsToLoad.length));
  immediateLoad.forEach((comp, index) => {
    setTimeout(() => {
      try {
        import(comp.path).catch(e => console.warn(`Failed to preload ${comp.path}`, e));
      } catch (e) {
        console.warn(`Failed to import ${comp.path}`, e);
      }
    }, index * 100);
  });
  
  // Schedule remaining components with a delay
  if (componentsToLoad.length > 3) {
    setTimeout(() => {
      loadPriorityComponents(2, 8); // Load fewer components in batches
    }, 1500);
  }
}

// Track if visibility loading has been set up
let visibilityLoadingInitialized = false;

/**
 * Detects important components visible in viewport and prioritizes loading them
 */
export function setupVisibilityBasedLoading() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window) || visibilityLoadingInitialized) return;
  
  visibilityLoadingInitialized = true;
  
  // Setup observer to detect elements coming into view
  const observer = new IntersectionObserver(
    (entries) => {
      // Process max 2 entries at a time to avoid blocking
      const visibleEntries = entries.filter(entry => entry.isIntersecting).slice(0, 2);
      
      visibleEntries.forEach(entry => {
        const element = entry.target as HTMLElement;
        const componentType = element.dataset.componentType;
        const componentId = element.dataset.componentId;
        
        if (componentType && componentId) {
          // Find the component in our registry and load it
          const configs = getComponentConfigs(componentType);
          const config = configs.find(c => c.path.includes(componentId));
          
          if (config) {
            try {
              import(config.path).catch(e => 
                console.warn(`Failed to load ${config.path}`, e)
              );
            } catch (e) {
              console.warn(`Failed to import ${config.path}`, e);
            }
            
            // Only observe once
            observer.unobserve(element);
          }
        }
      });
    },
    { rootMargin: '200px 0px', threshold: 0.1 }
  );
  
  // Find all component containers but limit how many we observe initially
  const componentContainers = Array.from(document.querySelectorAll('[data-component-type]')).slice(0, 10);
  componentContainers.forEach(container => {
    observer.observe(container);
  });
  
  // Set up a delayed observation for remaining elements
  if (document.querySelectorAll('[data-component-type]').length > 10) {
    setTimeout(() => {
      const remainingContainers = Array.from(document.querySelectorAll('[data-component-type]'))
        .slice(10, 20); // Only handle 10 more to avoid overwhelming the browser
      
      remainingContainers.forEach(container => {
        observer.observe(container);
      });
    }, 3000);
  }
}

/**
 * Helper function to create a markup with data attributes for visibility-based loading
 * @param componentType The type of component
 * @param componentId The ID of the component
 * @returns className string with the data attributes
 */
export function getComponentContainerProps(componentType: string, componentId: string) {
  return {
    'data-component-type': componentType,
    'data-component-id': componentId,
  };
} 