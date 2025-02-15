import { notFound } from 'next/navigation';
import { fetchComponentMetadata, fetchComponentVariants } from '../../utils/github';
import { AnimatedSection } from '../home/AnimatedSection';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: {
    name: string;
  };
}

export default async function ComponentPage({ params }: Props) {
  const componentName = params.name;
  const metadata = await fetchComponentMetadata(componentName);
  const variants = await fetchComponentVariants(componentName);

  if (!variants.length) {
    notFound();
  }

  return (
    <div className="container py-10 px-4">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <Link
            href="/components"
            className="group mb-8 inline-flex items-center text-sm text-terminal-text/90 hover:text-terminal-accent"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to components
          </Link>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
              {metadata.name}
            </h1>
            <p className="text-lg text-terminal-text/90 leading-relaxed">
              {metadata.description}
            </p>
            {metadata.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {metadata.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-terminal-border px-3 py-1 text-sm text-terminal-text/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>

        <div className="mt-12 space-y-12">
          <AnimatedSection delay={0.1}>
            <div>
              <h2 className="text-2xl font-bold mb-4">Installation</h2>
              <div className="overflow-hidden rounded-lg border border-terminal-border bg-terminal-bg/50">
                <pre className="p-4">
                  <code className="text-sm text-terminal-text">
                    {metadata.installation}
                  </code>
                </pre>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div>
              <h2 className="text-2xl font-bold mb-4">Usage</h2>
              <div className="overflow-hidden rounded-lg border border-terminal-border bg-terminal-bg/50">
                <pre className="p-4">
                  <code className="text-sm text-terminal-text">
                    {metadata.usage}
                  </code>
                </pre>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div>
              <h2 className="text-2xl font-bold mb-6">Component Variants</h2>
              <div className="grid gap-8">
                {variants.map((variant, index) => (
                  <div
                    key={variant.name}
                    className="rounded-lg border border-terminal-border bg-terminal-bg/50 overflow-hidden"
                  >
                    <div className="border-b border-terminal-border bg-terminal-bg/50 px-6 py-4">
                      <h3 className="text-lg font-bold text-terminal-accent">
                        Variant {index + 1}: {variant.name}
                      </h3>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="rounded-lg border border-terminal-border bg-terminal-bg/50">
                        <div className="flex items-center border-b border-terminal-border px-4 py-3">
                          <div className="flex space-x-2">
                            <div className="h-3 w-3 rounded-full bg-terminal-error"></div>
                            <div className="h-3 w-3 rounded-full bg-terminal-command"></div>
                            <div className="h-3 w-3 rounded-full bg-terminal-accent"></div>
                          </div>
                        </div>
                        <pre className="p-6 overflow-x-auto">
                          <code className="text-sm text-terminal-text">
                            {variant.code}
                          </code>
                        </pre>
                      </div>
                      {/* TODO: Add live preview when available */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {metadata.examples && (
            <AnimatedSection delay={0.4}>
              <div>
                <h2 className="text-2xl font-bold mb-4">Examples</h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {metadata.examples.map((example: any, index: number) => (
                    <div
                      key={index}
                      className="rounded-lg border border-terminal-border bg-terminal-bg/50 p-6"
                    >
                      <h3 className="mb-4 text-lg font-bold text-terminal-accent">
                        {example.title}
                      </h3>
                      <div className="overflow-hidden rounded-lg border border-terminal-border bg-terminal-bg">
                        <pre className="p-4">
                          <code className="text-sm text-terminal-text">
                            {example.code}
                          </code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </div>
  );
} 