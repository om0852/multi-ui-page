export default function DocsPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            Documentation
          </h1>
          <p className="text-lg text-terminal-text">
            Learn how to use Multi-UI components in your projects.
          </p>
        </div>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Installation</h2>
            <p className="mb-4 text-terminal-text">
              Install Multi-UI using your preferred package manager:
            </p>
            <div className="overflow-hidden rounded-lg border border-terminal-border bg-terminal-bg/50">
              <pre className="p-4">
                <code className="text-sm text-terminal-text">
                  npm install @multi-ui/core
                </code>
              </pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Usage</h2>
            <p className="mb-4 text-terminal-text">
              Import and use components in your React application:
            </p>
            <div className="overflow-hidden rounded-lg border border-terminal-border bg-terminal-bg/50">
              <pre className="p-4">
                <code className="text-sm text-terminal-text">
                  {`import { Button } from '@multi-ui/core'

export default function App() {
  return (
    <Button variant="primary">
      Click me
    </Button>
  )
}`}
                </code>
              </pre>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Styling</h2>
            <p className="mb-4 text-terminal-text">
              Multi-UI components are built with Tailwind CSS. Make sure to include the following in your tailwind.config.js:
            </p>
            <div className="overflow-hidden rounded-lg border border-terminal-border bg-terminal-bg/50">
              <pre className="p-4">
                <code className="text-sm text-terminal-text">
                  {`module.exports = {
  content: [
    './node_modules/@multi-ui/core/**/*.js',
  ],
  // ...rest of your config
}`}
                </code>
              </pre>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 