import React from 'react';

export const metadata = {
  title: 'Documentation - Multi UI',
  description: 'Learn how to use Multi UI components and CLI tools',
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
} 