import Link from 'next/link';
import { AnimatedSection } from './components/home/AnimatedSection';

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center py-24 text-center px-4">
        <AnimatedSection direction="up">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
              Build <span className="text-terminal-command">stunning</span> React apps with{' '}
              <span className="text-terminal-accent bg-terminal-accent/10 px-2 rounded-md">Multi-UI</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-terminal-text/90 md:text-xl leading-relaxed">
              A comprehensive suite of <span className="text-terminal-command">animated</span> React components 
              with <span className="text-terminal-accent">multiple design variations</span>.
              Create <span className="text-terminal-command">beautiful</span>, 
              <span className="text-terminal-accent"> interactive</span>, and 
              <span className="text-terminal-command"> accessible</span> user interfaces with ease.
            </p>
            <div className="flex flex-col space-y-4 pt-6 sm:flex-row sm:space-x-4 sm:space-y-0 justify-center">
              <Link
                href="/docs"
                className="inline-flex h-12 items-center justify-center rounded-md bg-terminal-accent px-8 text-base font-medium text-white transition-all hover:bg-terminal-accent/90 hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                href="/components"
                className="inline-flex h-12 items-center justify-center rounded-md border border-terminal-border bg-terminal-bg/50 px-8 text-base font-medium transition-all hover:bg-terminal-border hover:scale-105"
              >
                Components
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Features Section */}
      <section className="container py-24 px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <AnimatedSection delay={0.2}>
            <div className="rounded-lg border border-terminal-border bg-terminal-bg/50 p-8 hover:border-terminal-accent/50 transition-colors">
              <h3 className="mb-4 text-xl font-bold text-terminal-accent">✨ Animated Components</h3>
              <p className="text-terminal-text/90 leading-relaxed">
                Pre-built animations and transitions for smooth user interactions. Each component comes with carefully crafted motion effects.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <div className="rounded-lg border border-terminal-border bg-terminal-bg/50 p-8 hover:border-terminal-command/50 transition-colors">
              <h3 className="mb-4 text-xl font-bold text-terminal-command">🎨 Multiple Variants</h3>
              <p className="text-terminal-text/90 leading-relaxed">
                Choose from various design styles and themes. Customize components to match your brand&apos;s aesthetic perfectly.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.4}>
            <div className="rounded-lg border border-terminal-border bg-terminal-bg/50 p-8 hover:border-terminal-accent/50 transition-colors">
              <h3 className="mb-4 text-xl font-bold text-terminal-accent">🚀 Developer Experience</h3>
              <p className="text-terminal-text/90 leading-relaxed">
                Built with TypeScript and modern best practices. Comprehensive documentation and examples included.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="container py-24 px-4">
        <div className="grid gap-16 md:grid-cols-2">
          <AnimatedSection direction="right">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">
                <span className="text-terminal-accent">Beautiful</span> and{' '}
                <span className="text-terminal-command">Interactive</span>
              </h2>
              <p className="text-lg text-terminal-text/90 leading-relaxed">
                Multi-UI provides a rich set of animated components that make your applications stand out.
                From subtle hover effects to complex page transitions, we&apos;ve got you covered.
              </p>
              <ul className="space-y-6 text-terminal-text/90">
                <li className="flex items-center">
                  <span className="mr-3 text-terminal-accent text-xl">→</span>
                  <span className="text-terminal-command">60+</span> Interactive Components
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-terminal-accent text-xl">→</span>
                  <span className="text-terminal-accent">Built-in</span> Animations
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-terminal-accent text-xl">→</span>
                  <span className="text-terminal-command">Multiple</span> Design Variants
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-terminal-accent text-xl">→</span>
                  <span className="text-terminal-accent">Fully</span> Customizable
                </li>
              </ul>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="overflow-hidden rounded-lg border border-terminal-border bg-terminal-bg/50 backdrop-blur">
                <div className="flex items-center border-b border-terminal-border px-4 py-3">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-terminal-error"></div>
                    <div className="h-3 w-3 rounded-full bg-terminal-command"></div>
                    <div className="h-3 w-3 rounded-full bg-terminal-accent"></div>
                  </div>
                </div>
                <pre className="p-6">
                  <code className="text-sm text-terminal-text">
                    {`import { Button, motion } from '@multi-ui/core'

export default function AnimatedButton() {
  return (
    <Button
      variant="glow"
      animation="pulse"
      onClick={() => console.log('Clicked!')}
    >
      Hover me
    </Button>
  )
}`}
                  </code>
                </pre>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container py-24 px-4">
        <AnimatedSection direction="up" delay={0.6}>
          <div className="rounded-lg border border-terminal-border bg-terminal-bg/50 p-12 text-center max-w-4xl mx-auto">
            <h2 className="mb-6 text-3xl font-bold">
              Ready to <span className="text-terminal-command">build</span> something{' '}
              <span className="text-terminal-accent">amazing</span>?
            </h2>
            <p className="mb-8 text-lg text-terminal-text/90 leading-relaxed">
              Join developers worldwide who are building better UIs with Multi-UI
            </p>
            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-center rounded-md bg-terminal-accent px-8 text-base font-medium text-white transition-all hover:bg-terminal-accent/90 hover:scale-105"
            >
              Get Started Now
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
} 