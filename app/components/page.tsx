import Link from 'next/link';
import { fetchComponentsList, fetchComponentMetadata } from '../utils/github';
import { AnimatedSection } from './home/AnimatedSection';
import { ArrowRight, Layers } from 'lucide-react';

interface ComponentMetadata {
  name: string;
  description: string;
  category: string;
  tags: string[];
}

async function getComponents() {
  const components = await fetchComponentsList();
  const componentsWithMetadata = await Promise.all(
    components.map(async (component) => {
      const metadata = await fetchComponentMetadata(component.name);
      return {
        ...component,
        metadata: metadata || {
          name: component.displayName,
          description: `A collection of ${component.name.toLowerCase()} components with different styles and animations`,
          category: 'UI Components',
          tags: ['interactive', 'animated']
        }
      };
    })
  );

  // Group components by category
  const groupedComponents = componentsWithMetadata.reduce((acc, component) => {
    const category = component.metadata.category || 'UI Components';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(component);
    return acc;
  }, {} as Record<string, typeof componentsWithMetadata>);

  return groupedComponents;
}

export default async function ComponentsPage() {
  const groupedComponents = await getComponents();
  const categories = Object.keys(groupedComponents);

  return (
    <div className="container py-10 px-4">
      <div className="flex flex-col items-start gap-4">
        <AnimatedSection>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl">
            Components
          </h1>
          <p className="mt-4 text-lg text-terminal-text/90">
            A collection of pre-built components with beautiful animations and multiple design variations.
            Each component comes with multiple variants to choose from.
          </p>
        </AnimatedSection>
      </div>

      <div className="mt-16 space-y-16">
        {categories.map((category, categoryIndex) => (
          <AnimatedSection key={category} delay={categoryIndex * 0.1}>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-terminal-accent">
                {category}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {groupedComponents[category].map((component) => (
                  <Link
                    key={component.name}
                    href={`/components/${component.name.toLowerCase()}`}
                    className="group relative rounded-lg border border-terminal-border bg-terminal-bg/50 p-6 transition-all hover:border-terminal-accent/50 hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-terminal-accent group-hover:text-terminal-accent/90">
                            {component.metadata.name}
                          </h3>
                          {component.variants && component.variants.length > 0 && (
                            <span className="inline-flex items-center rounded-full bg-terminal-border px-2 py-0.5 text-xs text-terminal-text/90">
                              <Layers className="mr-1 h-3 w-3" />
                              {component.variants.length} variants
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-terminal-text/90 line-clamp-2">
                          {component.metadata.description}
                        </p>
                        {component.metadata.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {component.metadata.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full bg-terminal-border px-2.5 py-0.5 text-xs text-terminal-text/90"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="h-5 w-5 text-terminal-text/50 transition-transform group-hover:translate-x-1 group-hover:text-terminal-accent" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
} 