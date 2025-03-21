'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import ExamplePreview from '../ExamplePreview';

// Generate array of variants (showing only first 20 for better performance)
const variants = Array.from({ length: 20 }, (_, i) => i + 1);

export default function AllAccordianVariantsPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Function to copy the installation command to clipboard
  const copyCommand = (id: number) => {
    const command = `npx multi-ui add Accordian_${id}`;
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/components/accordian" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Accordion Components
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-4">All Accordion Variants</h1>
        <p className="text-xl text-gray-300 mb-8">
          Browse accordion variants in one place
        </p>

        <div className="space-y-8">
          {variants.map((id) => (
            <div key={id} className="border border-gray-700 rounded-lg overflow-hidden">
              <div className="p-5 bg-gray-800 flex justify-between items-center">
                <h3 className="text-xl font-semibold">Variant {id}</h3>
                <button
                  onClick={() => copyCommand(id)}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                  title={`Copy: npx multi-ui add Accordian_${id}`}
                >
                  {copiedId === id ? (
                    <>
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">Copy Install Command</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-6 bg-gray-850">
                <ExamplePreview exampleId={id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 