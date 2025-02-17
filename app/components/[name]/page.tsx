import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileCode } from 'lucide-react';
import { fetchComponentMetadata, fetchComponentVariants } from '../../utils/components';
import { AnimatedSection } from '../home/AnimatedSection';
import { ComponentPreview } from './preview/ComponentPreview';
import { CopyButton } from '../CopyButton';

interface Props {
  params: {
    name: string;
  };
}

export default async function ComponentPage({ params }: Props) {
  try {
    const componentName = decodeURIComponent(params.name.toLowerCase());
    console.log('Loading component:', componentName);
    
    const [metadata, variants] = await Promise.all([
      fetchComponentMetadata(componentName),
      fetchComponentVariants(componentName)
    ]);

    if (!variants || variants.length === 0) {
      console.log('No variants found for:', componentName);
      notFound();
    }

    return (
      <div className="flex h-[calc(100vh-3.5rem)]">
        {/* Sidebar */}
        <div className="w-64 border-r border-terminal-border bg-terminal-bg/50 overflow-y-auto">
          <div className="p-4 border-b border-terminal-border">
            <Link
              href="/components"
              className="group inline-flex items-center text-sm text-terminal-text/90 hover:text-terminal-accent"
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back
            </Link>
            <h2 className="mt-2 text-xl font-bold">{metadata.name}</h2>
            <p className="mt-1 text-sm text-terminal-text/70">{metadata.description}</p>
          </div>
          <nav className="p-2">
            {variants.map((variant, index) => (
              <a
                key={variant.name}
                href={`#${variant.name}`}
                className="flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-terminal-border/50 group transition-colors"
              >
                <FileCode className="h-4 w-4 text-terminal-accent" />
                <span className="text-terminal-text group-hover:text-terminal-accent">
                  {variant.name}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="container max-w-5xl py-8 px-4">
            <div className="space-y-12">
              {/* Installation */}
              <AnimatedSection>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Installation</h3>
                  <div className="rounded-lg border border-terminal-border bg-terminal-bg/50 overflow-hidden">
                    <div className="flex items-center justify-between border-b border-terminal-border px-4 py-2">
                      <span className="text-sm text-terminal-text/60">npm</span>
                      <CopyButton code="npm install @multi-ui/core" />
                    </div>
                    <pre className="p-4">
                      <code className="text-sm">npm install @multi-ui/core</code>
                    </pre>
                  </div>
                </div>
              </AnimatedSection>

              {/* Variants */}
              {variants.map((variant, index) => (
                <AnimatedSection key={variant.name} delay={0.1 * index}>
                  <div id={variant.name} className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        {variant.name}
                      </h3>
                    </div>

                    {/* Preview */}
                    <div className="rounded-lg border border-terminal-border bg-terminal-bg/50 p-8">
                      <ComponentPreview
                        componentName={componentName}
                        code={variant.code}
                        previewPath={variant.name}
                      />
                    </div>

                    {/* Example Code */}
                    <div className="rounded-lg border border-terminal-border bg-terminal-bg/50 overflow-hidden">
                      <div className="flex items-center justify-between border-b border-terminal-border px-4 py-2">
                        <span className="text-sm text-terminal-text/60">{variant.name}.example.tsx</span>
                        <CopyButton code={variant.code} />
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-sm text-terminal-text whitespace-pre-wrap">
                          {variant.code}
                        </code>
                      </pre>
                    </div>

                    {/* Usage Example */}
                    <div className="rounded-lg border border-terminal-border bg-terminal-bg/50 overflow-hidden">
                      <div className="flex items-center justify-between border-b border-terminal-border px-4 py-2">
                        <span className="text-sm text-terminal-text/60">Usage</span>
                        <CopyButton 
                          code={`import { ${componentName} } from '@multi-ui/core'

// Example usage
export default function Example() {
  return (
    ${variant.code}
  );
}`} 
                        />
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-sm text-terminal-text">
{`import { ${componentName} } from '@multi-ui/core'

// Example usage
export default function Example() {
  return (
    ${variant.code}
  );
}`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in ComponentPage:', error);
    notFound();
  }
} 