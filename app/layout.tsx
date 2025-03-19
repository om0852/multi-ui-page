import './globals.css';
import ComponentInitializer from './components/ComponentInitializer';

export const metadata = {
  title: 'Multi-UI Component Library',
  description: 'A modern UI component library with multiple variants',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-terminal-bg text-terminal-text min-h-screen">
        <ComponentInitializer />
        {children}
      </body>
    </html>
  )
}
