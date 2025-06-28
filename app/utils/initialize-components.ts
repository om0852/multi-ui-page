"use client";

import { discoverComponents, registerComponent } from "./dynamic-loading";

// Flag to track initialization
let initialized = false;

/**
 * Initialize the dynamic component system
 * This should be called once at app startup
 */
export function initializeDynamicComponentSystem() {
  if (initialized || typeof window === "undefined") return;

  console.log("Initializing dynamic component system...");

  // Register common component prefixes
  registerBuiltInComponents();

  // Discover available components
  discoverComponents().then(() => {
    console.log("Component discovery completed");
  });

  initialized = true;
}

/**
 * Register built-in components that we know are available
 * This provides a fallback for components that might not be discovered automatically
 */
function registerBuiltInComponents() {
  // Register component types we know about
  const componentTypes = [
    "accordion",
    "avatar",
    "badges",
    "breadcrumbs",
    "buttons",
    "cards",
    "checkbox",
    "clipboard",
    "circularprogressbar",
  ];

  // Create sample registrations for common components
  for (const type of componentTypes) {
    // Register main components (variants 1-30)
    for (let i = 1; i <= 30; i++) {
      const componentKey = `${type}_${i}`;
      const componentPath = `../multiui/${type}/_components/${
        type.charAt(0).toUpperCase() + type.slice(1)
      }_${i}`;

      try {
        registerComponent(
          componentKey,
          () => import(/* @vite-ignore */ componentPath)
        );
      } catch (e) {
        // Skip silently - this is just pre-registration
      }

      // Register examples as well
      const exampleKey = `${type}_example_${i}`;
      const examplePath = `../multiui/${type}/examples/Example_${i}`;

      try {
        registerComponent(
          exampleKey,
          () => import(/* @vite-ignore */ examplePath)
        );
      } catch (e) {
        // Skip silently
      }
    }
  }
}

/**
 * Get a list of all known component types
 * This can be used to populate component type selection UIs
 */
export function getKnownComponentTypes(): string[] {
  return [
    "accordion",
    "avatar",
    "badges",
    "breadcrumbs",
    "buttons",
    "cards",
    "checkbox",
    "clipboard",
    "circularprogressbar",
    // Add more as needed
  ];
}

/**
 * Check if a component is likely to exist
 * This does a best-effort check without actually loading the component
 * @param componentType The component type (e.g., 'buttons')
 * @param variant The variant number (e.g., 6)
 * @returns true if the component is likely to exist
 */
export function componentExists(
  componentType: string,
  variant: number
): boolean {
  // This is just a basic check - in a real app, you'd check against
  // a database or API of known component variants
  if (!componentType) return false;

  // Check variant is in a reasonable range
  if (variant < 1 || variant > 30) return false;

  // Check component type is known
  const knownTypes = getKnownComponentTypes();
  return knownTypes.includes(componentType.toLowerCase());
}
