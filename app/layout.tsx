import type { Metadata } from 'next';
import './globals.css';
import Navigation from './components/Navigation';

export const metadata: Metadata = {
  title: 'Multi-UI - Modern React Component Library',
  description: 'A modern React component library with a beautiful dark theme',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-terminal-bg text-terminal-text antialiased">
        <Navigation />
        <div className="pt-14">
          {children}
        </div>
      </body>
    </html>
  );
} 