/**
 * Application-level component loader utilities
 * This file handles application startup optimization and preloading
 */

import { registerAllComponentConfigurations } from './component-configs';
import { setupVisibilityBasedLoading, loadPrioritizedComponents } from './component-optimization';

// Track if the loader has been initialized
let loaderInitialized = false;

/**
 * Initialize the application with performance optimizations
 * Call this function once at application startup
 */
export function initializeAppOptimizations() {
  if (loaderInitialized || typeof window === 'undefined') return;
  
  console.log('[Performance] Initializing app optimizations');
  
  // Register all component configurations
  try {
    registerAllComponentConfigurations();
  } catch (e) {
    console.warn('[Performance] Error registering component configurations:', e);
  }
  
  // Setup performance monitoring
  setupPerformanceMonitoring();
  
  // Setup visibility-based component loading with some delay to avoid blocking initial render
  setTimeout(() => {
    try {
      setupVisibilityBasedLoading();
      
      // Start loading prioritized components during idle time after a longer delay
      setTimeout(() => {
        scheduleIdleLoading();
      }, 2000);
    } catch (e) {
      console.warn('[Performance] Error setting up visibility based loading:', e);
    }
  }, 1000);
  
  // Mark as initialized
  loaderInitialized = true;
  
  return true;
}

/**
 * Load components in the current page's viewport first
 */
function prioritizeViewportComponents() {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
  
  try {
    // Create a root observer to detect visible components on initial load
    const observer = new IntersectionObserver(
      (entries) => {
        // Filter for visible components, limit to 3 max
        const visibleEntries = entries.filter(entry => entry.isIntersecting).slice(0, 3);
        
        // Process visible components first
        if (visibleEntries.length > 0) {
          // Extract component metadata from visible elements
          const visibleComponents = visibleEntries.map(entry => {
            const element = entry.target as HTMLElement;
            return {
              type: element.dataset.componentType,
              id: element.dataset.componentId
            };
          }).filter(comp => comp.type && comp.id);
          
          if (visibleComponents.length > 0) {
            // Log visible components for debugging
            console.debug('[Optimization] Prioritizing visible components:', visibleComponents);
          }
        }
      },
      { rootMargin: '0px', threshold: 0.1 }
    );
    
    // Observe all component containers but limit to first 10
    const containers = Array.from(document.querySelectorAll('[data-component-type]')).slice(0, 10);
    containers.forEach(el => {
      observer.observe(el);
    });
    
    // Disconnect after initial pass
    setTimeout(() => observer.disconnect(), 2000);
  } catch (e) {
    console.warn('[Performance] Error prioritizing viewport components:', e);
  }
}

/**
 * Schedule component loading during browser idle times
 */
function scheduleIdleLoading() {
  if (typeof window === 'undefined') return;
  
  try {
    // Use requestIdleCallback if available
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(
        () => {
          loadPrioritizedComponents(2, 6);
        },
        { timeout: 4000 }
      );
    } else {
      // Fallback to setTimeout
      setTimeout(() => {
        loadPrioritizedComponents(2, 6);
      }, 2000);
    }
  } catch (e) {
    console.warn('[Performance] Error scheduling idle loading:', e);
  }
}

/**
 * Setup performance monitoring
 */
function setupPerformanceMonitoring() {
  if (typeof window === 'undefined') return;
  
  try {
    if (typeof PerformanceObserver !== 'undefined') {
      // Create observer for core web vitals
      const perfObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Focus on key metrics
          if (entry.entryType === 'largest-contentful-paint' ||
              entry.entryType === 'first-input' ||
              entry.entryType === 'layout-shift') {
            console.debug('[Performance]', entry.entryType, entry);
          }
        });
      });
      
      // Observe key metrics
      perfObserver.observe({ 
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
      });
      
      // Also monitor long tasks if supported
      if ('longtask' in PerformanceObserver.supportedEntryTypes) {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.debug('[Performance] Long task detected:', entry);
          });
        });
        
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      }
    }
  } catch (error) {
    console.warn('[Performance] Error setting up performance monitoring:', error);
  }
} 