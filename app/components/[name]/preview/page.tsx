import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { fetchComponentVariants, fetchComponentMetadata } from '../../../utils/github';
import { AnimatedSection } from '../../home/AnimatedSection';
import { useState } from 'react';
import { ComponentPreview } from './ComponentPreview';

interface Props {
  params: {
    name: string;
  };
}

export default async function ComponentPreviewPage({ params }: Props) {
  const componentName = params.name;
  const metadata = await fetchComponentMetadata(componentName);
  const variants = await fetchComponentVariants(componentName);

  if (!variants.length) {
    notFound();
  }

  return (
    <div className="container py-10 px-4">
      <div className="mx-auto max-w-6xl">
        <AnimatedSection>
          <Link
            href={`/components/${componentName}`}
            className="group mb-8 inline-flex items-center text-sm text-terminal-text/90 hover:text-terminal-accent"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to component details
          </Link>

          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
              {metadata.name} Preview
            </h1>
            <p className="text-lg text-terminal-text/90 leading-relaxed">
              Explore and test different variants of the {metadata.name} component
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-12 space-y-12">
          {variants.map((variant, index) => (
            <AnimatedSection key={variant.name} delay={index * 0.1}>
              <div className="rounded-lg border border-terminal-border bg-terminal-bg/50 overflow-hidden">
                <div className="border-b border-terminal-border bg-terminal-bg/50 px-6 py-4">
                  <h2 className="text-xl font-bold text-terminal-accent">
                    {variant.name}
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                  {/* Preview Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-terminal-text">Preview</h3>
                    <div className="rounded-lg border border-terminal-border bg-terminal-bg/50 p-8 min-h-[200px]">
                      <ComponentPreview
                        componentName={componentName}
                        code={variant.code}
                        previewPath={variant.name}
                      />
                    </div>
                  </div>

                  {/* Code Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-terminal-text">Code</h3>
                    <div className="rounded-lg border border-terminal-border bg-terminal-bg/50 overflow-hidden">
                      <div className="flex items-center justify-between border-b border-terminal-border px-4 py-2">
                        <div className="flex space-x-2">
                          <div className="h-3 w-3 rounded-full bg-terminal-error"></div>
                          <div className="h-3 w-3 rounded-full bg-terminal-command"></div>
                          <div className="h-3 w-3 rounded-full bg-terminal-accent"></div>
                        </div>
                        <CopyButton code={variant.code} />
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-sm text-terminal-text whitespace-pre-wrap">
                          {variant.code}
                        </code>
                      </pre>
                    </div>
                  </div>

                  {/* Installation Section */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold text-terminal-text">Installation</h3>
                    <div className="rounded-lg border border-terminal-border bg-terminal-bg/50 overflow-hidden">
                      <div className="flex items-center justify-between border-b border-terminal-border px-4 py-2">
                        <span className="text-sm text-terminal-text/60">npm</span>
                        <CopyButton code={`npm install @multi-ui/core`} />
                      </div>
                      <pre className="p-4">
                        <code className="text-sm text-terminal-text">
                          npm install @multi-ui/core
                        </code>
                      </pre>
                    </div>
                  </div>

                  {/* Usage Example */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold text-terminal-text">Usage Example</h3>
                    <div className="rounded-lg border border-terminal-border bg-terminal-bg/50 overflow-hidden">
                      <div className="flex items-center justify-between border-b border-terminal-border px-4 py-2">
                        <span className="text-sm text-terminal-text/60">example.tsx</span>
                        <CopyButton code={`import { ${componentName} } from '@multi-ui/core'\n\nexport default function Example() {\n  return ${variant.code}\n}`} />
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-sm text-terminal-text">
{`import { ${componentName} } from '@multi-ui/core'

export default function Example() {
  return ${variant.code}
}`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 hover:text-terminal-accent transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-4 w-4 text-terminal-command" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
} 