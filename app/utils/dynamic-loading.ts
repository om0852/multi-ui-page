/**
 * Utilities for dynamically loading components with performance optimizations
 */
import { lazy } from 'react';

// Dynamic component loading registry - will be populated at runtime
let componentRegistry: Record<string, () => Promise<any>> = {};

/**
 * Register a component for dynamic loading
 * @param key Component identifier (e.g., 'buttons_1', 'clipboard_29')
 * @param importFunc Function to import the component
 */
export function registerComponent(key: string, importFunc: () => Promise<any>) {
  const normalizedKey = key.toLowerCase().replace(/[\/\.-]/g, '_');
  componentRegistry[normalizedKey] = importFunc;
  return normalizedKey;
}

/**
 * Register multiple components at once 
 * @param components Record of component keys and their import functions
 */
export function registerComponents(components: Record<string, () => Promise<any>>) {
  Object.entries(components).forEach(([key, importFunc]) => {
    registerComponent(key, importFunc);
  });
}

/**
 * Dynamically imports a component with retry logic and caching
 * @param componentKey Identifier for the component (format: "type_id" or "type_example_id")
 * @param fallbackImportPath Optional fallback path to try importing if not found in registry
 * @param maxRetries Maximum number of retries for loading
 * @returns A lazy loaded component
 */
export function dynamicImport(componentKey: string, fallbackImportPath?: string, maxRetries: number = 3) {
  const normalizedKey = componentKey.toLowerCase().replace(/[\/\.-]/g, '_');
  
  return lazy(() => {
    let retries = 0;
    
    const load = async () => {
      try {
        // First try to get from the registry
        if (componentRegistry[normalizedKey]) {
          const result = await componentRegistry[normalizedKey]();
          loadedComponents.add(normalizedKey);
          return result;
        }
        
        // If not registered and we have a fallback path, try that
        if (fallbackImportPath) {
          try {
            // Try to dynamically resolve the import
            const result = await import(/* @vite-ignore */ fallbackImportPath);
            
            // Add to registry for future calls
            registerComponent(normalizedKey, () => import(/* @vite-ignore */ fallbackImportPath));
            
            loadedComponents.add(normalizedKey);
            return result;
          } catch (directImportError) {
            console.warn(`Failed to load component from path: ${fallbackImportPath}`, directImportError);
            
            // Try dynamic path resolution as last resort
            const [componentType, ...rest] = normalizedKey.split('_');
            const isExample = rest.includes('example');
            const componentId = isExample ? rest[rest.length - 1] : rest[0];
            
            let dynamicPath = '';
            if (isExample) {
              dynamicPath = `../multiui/${componentType}/examples/Example_${componentId}`;
            } else {
              dynamicPath = `../multiui/${componentType}/_components/${componentType.charAt(0).toUpperCase() + componentType.slice(1)}_${componentId}`;
            }
            
            try {
              const result = await import(/* @vite-ignore */ dynamicPath);
              // Register for future use
              registerComponent(normalizedKey, () => import(/* @vite-ignore */ dynamicPath));
              loadedComponents.add(normalizedKey);
              return result;
            } catch (err) {
              console.error(`All import attempts failed for ${componentKey}`, err);
              throw new Error(`Component not found: ${componentKey}`);
            }
          }
        }
        
        // Last attempt: try to guess the path based on the component key
        const [componentType, ...rest] = normalizedKey.split('_');
        const isExample = rest.includes('example');
        const componentId = isExample ? rest[rest.length - 1] : rest[0];
        
        let dynamicPath = '';
        if (isExample) {
          dynamicPath = `../multiui/${componentType}/examples/Example_${componentId}`;
        } else {
          dynamicPath = `../multiui/${componentType}/_components/${componentType.charAt(0).toUpperCase() + componentType.slice(1)}_${componentId}`;
        }
        
        console.info(`Trying to load component from path: ${dynamicPath}`);
        const result = await import(/* @vite-ignore */ dynamicPath);
        // Register for future use
        registerComponent(normalizedKey, () => import(/* @vite-ignore */ dynamicPath));
        loadedComponents.add(normalizedKey);
        return result;
      } catch (error) {
        if (retries < maxRetries) {
          retries++;
          console.warn(`Failed to load ${componentKey}, retrying (${retries}/${maxRetries})...`);
          // Exponential backoff for retries
          await new Promise(resolve => setTimeout(resolve, 300 * Math.pow(2, retries)));
          return load();
        }
        console.error(`Failed to load component: ${componentKey}`, error);
        throw error;
      }
    };

    return load();
  });
}

// Cache for already loaded components to avoid duplicate loading
const loadedComponents = new Set<string>();

/**
 * Safely loads a component by key
 * @param key Component key in the registry
 * @returns Promise resolving to the component
 */
export async function safeImport(key: string): Promise<any> {
  const normalizedKey = key.toLowerCase().replace(/[\/\.-]/g, '_');
  
  if (!componentRegistry[normalizedKey]) {
    // Try to guess the path based on the component key
    const [componentType, ...rest] = normalizedKey.split('_');
    const isExample = rest.includes('example');
    const componentId = isExample ? rest[rest.length - 1] : rest[0];
    
    let dynamicPath = '';
    if (isExample) {
      dynamicPath = `../multiui/${componentType}/examples/Example_${componentId}`;
    } else {
      dynamicPath = `../multiui/${componentType}/_components/${componentType.charAt(0).toUpperCase() + componentType.slice(1)}_${componentId}`;
    }
    
    try {
      const componentModule = await import(dynamicPath);
      // Register for future use
      registerComponent(normalizedKey, () => import(/* @vite-ignore */ dynamicPath));
      return componentModule;
    } catch (error) {
      throw new Error(`Component not found in registry: ${key}`);
    }
  }
  
  return componentRegistry[normalizedKey]();
}

/**
 * Prefetches a component to improve subsequent load times
 * @param componentKey Identifier for the component
 * @returns Promise that resolves when the component is loaded or rejects if it doesn't exist
 */
export function prefetchComponent(componentKey: string): Promise<void> {
  const normalizedKey = componentKey.toLowerCase().replace(/[\/\.-]/g, '_');
  
  // Don't prefetch already loaded components
  if (loadedComponents.has(normalizedKey)) {
    return Promise.resolve();
  }
  
  // Return a promise that resolves when the component is loaded
  return new Promise((resolve, reject) => {
    // Try to load the component
    safeImport(normalizedKey)
      .then(() => {
        loadedComponents.add(normalizedKey);
        resolve();
      })
      .catch(error => {
        // Log the error but don't add to loadedComponents
        console.warn(`Failed to prefetch ${componentKey}`, error);
        // Reject with the error
        reject(error);
      });
  });
}

/**
 * Loads multiple components in batches to avoid overwhelming the browser
 * @param componentKeys Array of component key identifiers
 * @param batchSize Number of components to load in each batch
 * @param delay Delay between batches in milliseconds
 */
export function batchLoadComponents(componentKeys: string[], batchSize: number = 2, delay: number = 300) {
  if (typeof window === 'undefined') return;
  
  // Normalize keys
  const normalizedKeys = componentKeys.map(key => key.toLowerCase().replace(/[\/\.-]/g, '_'));
  
  // Filter out already loaded components
  const keysToLoad = normalizedKeys.filter(key => !loadedComponents.has(key));
  
  if (keysToLoad.length === 0) return;
  
  let currentBatch = 0;
  const totalBatches = Math.ceil(keysToLoad.length / batchSize);
  
  const loadNextBatch = () => {
    if (currentBatch >= totalBatches) return;
    
    const start = currentBatch * batchSize;
    const end = Math.min(start + batchSize, keysToLoad.length);
    
    for (let i = start; i < end; i++) {
      prefetchComponent(keysToLoad[i]);
    }
    
    currentBatch++;
    setTimeout(loadNextBatch, delay);
  };
  
  // Start loading the first batch
  loadNextBatch();
}

// Component registry for priority loading
const priorityRegistry: { [key: string]: { priority: number; key: string } } = {};

/**
 * Registers a component for priority loading
 * @param componentName Component identifier
 * @param componentKey Key for the component
 * @param priority Loading priority (lower numbers = higher priority)
 */
export function registerComponentForPriority(componentName: string, componentKey: string, priority: number = 10) {
  const normalizedKey = componentKey.toLowerCase().replace(/[\/\.-]/g, '_');
  
  // Skip if already registered with same or higher priority
  if (priorityRegistry[componentName] && priorityRegistry[componentName].priority <= priority) {
    return;
  }
  
  priorityRegistry[componentName] = { priority, key: normalizedKey };
}

/**
 * Prioritizes loading components based on their registered priority
 * @param maxImmediateLoad Maximum number of components to load immediately
 * @param maxBatchLoad Maximum number of components to load in batches
 */
export function loadPrioritizedComponents(maxImmediateLoad: number = 2, maxBatchLoad: number = 6) {
  if (typeof window === 'undefined') return;
  
  try {
    // Sort by priority
    const prioritizedComponents = Object.values(priorityRegistry)
      .sort((a, b) => a.priority - b.priority)
      .map(item => item.key)
      // Filter out already loaded components
      .filter(key => !loadedComponents.has(key));
    
    if (prioritizedComponents.length === 0) return;
    
    // Load first few immediately, then batch the rest
    const immediateLoad = prioritizedComponents.slice(0, Math.min(maxImmediateLoad, prioritizedComponents.length));
    const batchLoad = prioritizedComponents.slice(
      Math.min(maxImmediateLoad, prioritizedComponents.length), 
      Math.min(maxImmediateLoad + maxBatchLoad, prioritizedComponents.length)
    );
    
    // Load high priority immediately - one at a time with slight delay to prevent blocking
    immediateLoad.forEach((key, index) => {
      setTimeout(() => {
        safeImport(key)
          .then(() => loadedComponents.add(key))
          .catch(e => console.warn(`Failed to load ${key}`, e));
      }, index * 200); // 200ms delay between each immediate load
    });
    
    // Batch load the rest after a delay
    if (batchLoad.length > 0) {
      setTimeout(() => {
        batchLoadComponents(batchLoad, 2, 500); // Load in very small batches with larger delay
      }, 1000 + (immediateLoad.length * 200)); // Start batch loading after immediate loads are done
    }
  } catch (error) {
    console.error('Error in loadPrioritizedComponents:', error);
  }
}

/**
 * Creates a virtualized component that only loads when visible
 * @param componentKey Component key or import function
 * @param placeholderHeight Height to reserve for the component before loading
 * @returns A component that loads when scrolled into view
 */
export function createVirtualizedComponent(
  componentKey: string | (() => Promise<any>),
  placeholderHeight: number = 150
) {
  // Create a stable import function
  const importFn = typeof componentKey === 'string' 
    ? () => safeImport(componentKey)
    : componentKey;
  
  return lazy(() => {
    if (typeof window === 'undefined') {
      return importFn();
    }
    
    return new Promise((resolve) => {
      // Create an IntersectionObserver
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Component is visible, load it
            observer.disconnect();
            importFn().then(resolve);
          }
        },
        { rootMargin: '150px 0px' } // Load when component is 150px from viewport
      );
      
      // Create a reference element for observation
      const refElement = document.createElement('div');
      refElement.style.height = `${placeholderHeight}px`;
      
      // Add to DOM temporarily for observation
      document.body.appendChild(refElement);
      observer.observe(refElement);
      
      // Cleanup function
      setTimeout(() => {
        if (document.body.contains(refElement)) {
          document.body.removeChild(refElement);
        }
      }, 0);
    });
  });
}

/**
 * Helper function to determine if a component exists in the registry
 * @param componentKey The component key to check
 * @returns boolean indicating if the component is registered
 */
export function isComponentRegistered(componentKey: string): boolean {
  const normalizedKey = componentKey.toLowerCase().replace(/[\/\.-]/g, '_');
  return componentRegistry[normalizedKey] !== undefined;
}

/**
 * Scans the directory structure for available components
 * This function should be called on app initialization to discover components
 */
export async function discoverComponents() {
  if (typeof window === 'undefined') return;
  
  try {
    // This would normally be a server-side operation, but we can mock it for client-side
    // by pre-registering component types we know about
    const knownComponentTypes = [
      'clipboard', 'buttons', 'cards', 'checkbox', 'avatar', 'breadcrumbs', 'badges', 'accordian', 'circularprogressbar'
    ];
    
    // For each component type, attempt to register known variants
    knownComponentTypes.forEach(type => {
      // Register a reasonable range of component IDs for each type
      for (let i = 1; i <= 30; i++) {
        const componentKey = `${type}_${i}`;
        const componentPath = `../multiui/${type}/_components/${type.charAt(0).toUpperCase() + type.slice(1)}_${i}`;
        
        // Try registering the component (it will only be truly loaded when requested)
        try {
          registerComponent(componentKey, () => import(/* @vite-ignore */ componentPath));
        } catch (e) {
          // Skip registration if it fails - this is fine as we're just discovering
        }
        
        // Also register examples
        const exampleKey = `${type}_example_${i}`;
        const examplePath = `../multiui/${type}/examples/Example_${i}`;
        
        try {
          registerComponent(exampleKey, () => import(/* @vite-ignore */ examplePath));
        } catch (e) {
          // Skip registration if it fails
        }
      }
    });
    
    console.info('[Component Discovery] Registered component types:', knownComponentTypes);
  } catch (error) {
    console.error('[Component Discovery] Error discovering components:', error);
  }
} 