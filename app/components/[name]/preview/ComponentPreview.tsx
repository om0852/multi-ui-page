'use client';

import { memo, useEffect, useState } from 'react';

interface Props {
  componentName: string;
  code: string;
  previewPath: string;
}

export const ComponentPreview = memo(function ComponentPreview({ componentName, code, previewPath }: Props) {
  const [Example, setExample] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadExample() {
      try {
        // Get the variant number from previewPath (e.g., "Checkbox_1" -> "1")
        const variantNumber = previewPath.split('_')[1];
        
        // Import the corresponding component variant
        const componentModule = await import(`../../../multiui/${componentName}/_components/${componentName}_${variantNumber}`);
        const exampleModule = await import(`../../../multiui/${componentName}/examples/${previewPath}.example`);
        
        if (exampleModule.default && componentModule.default) {
          // Replace the Checkbox import in the example with the correct variant
          const ExampleComponent = exampleModule.default;
          ExampleComponent.prototype.Checkbox = componentModule.default;
          
          setExample(() => ExampleComponent);
          setError(null);
        } else {
          throw new Error('Example or component not found');
        }
      } catch (err) {
        console.error('Error loading example:', err);
        setError('Example not found');
        setExample(null);
      }
    }

    loadExample();
  }, [componentName, previewPath]);

  if (error) {
    // Fallback to demo preview if example not found
    return (
      <div className="flex items-center justify-center min-h-[200px] w-full">
        <div className="w-full flex items-center justify-center">
          {getDemoPreview(componentName)}
        </div>
      </div>
    );
  }

  if (!Example) {
    return (
      <div className="flex items-center justify-center min-h-[200px] w-full">
        <div className="animate-pulse text-terminal-text/60">Loading preview...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div className="w-full flex items-center justify-center">
        <Example />
      </div>
    </div>
  );
});

// Fallback demo previews
function getDemoPreview(componentName: string) {
  switch (componentName.toLowerCase()) {
    case 'button':
      return (
        <button className="px-4 py-2 bg-terminal-accent text-white rounded-md hover:bg-terminal-accent/90 transition-colors">
          Demo Button
        </button>
      );
    case 'card':
      return (
        <div className="w-full max-w-sm p-6 bg-terminal-bg border border-terminal-border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Demo Card</h3>
          <p className="text-terminal-text/70">This is a sample card component preview.</p>
        </div>
      );
    case 'input':
      return (
        <input
          type="text"
          placeholder="Demo Input"
          className="w-full max-w-sm px-4 py-2 bg-terminal-bg border border-terminal-border rounded-md focus:border-terminal-accent focus:outline-none"
        />
      );
    case 'badge':
      return (
        <span className="px-2 py-1 text-sm bg-terminal-accent/20 text-terminal-accent rounded-full">
          Demo Badge
        </span>
      );
    case 'alert':
      return (
        <div className="w-full max-w-sm p-4 bg-terminal-accent/20 border border-terminal-accent text-terminal-accent rounded-lg">
          Demo Alert Message
        </div>
      );
    case 'toggle':
      return (
        <div className="w-12 h-6 bg-terminal-accent rounded-full relative cursor-pointer">
          <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" />
        </div>
      );
    case 'dropdown':
      return (
        <div className="relative inline-block">
          <button className="px-4 py-2 bg-terminal-bg border border-terminal-border rounded-md">
            Demo Dropdown ▼
          </button>
        </div>
      );
    case 'checkbox':
      return (
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4 border border-terminal-border rounded" />
          <label className="text-terminal-text">Demo Checkbox</label>
        </div>
      );
    default:
      return (
        <div className="w-full max-w-sm p-6 bg-terminal-bg border border-terminal-border rounded-lg flex items-center justify-center">
          <p className="text-terminal-text/70">Preview for {componentName}</p>
        </div>
      );
  }
} 