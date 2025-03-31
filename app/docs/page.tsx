"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Copy, Check, ChevronRight, Terminal, Package, Layers } from 'lucide-react';

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto font-mono text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
        aria-label="Copy code"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
};

const CommandCard = ({ icon: Icon, title, command, description }: { 
  icon: React.ElementType, 
  title: string, 
  command: string, 
  description: string 
}) => {
  return (
    <motion.div 
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700"
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="bg-gray-700 p-3 rounded-full mr-4">
            <Icon className="text-blue-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-100">{title}</h3>
        </div>
        <p className="text-gray-300 mb-4">{description}</p>
        <CodeBlock code={command} />
      </div>
    </motion.div>
  );
};

const ComponentVariant = ({ name, variants }: { name: string, variants: string[] }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow p-4 hover:shadow-md transition-shadow border border-gray-700">
      <h4 className="font-bold text-lg text-gray-100 mb-2">{name}</h4>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <span key={variant} className="bg-gray-700 text-blue-300 text-xs px-2 py-1 rounded-full">
            {variant}
          </span>
        ))}
      </div>
    </div>
  );
};

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl font-extrabold text-white sm:text-5xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
          Multi UI Documentation
          </motion.h1>
          <motion.p 
            className="max-w-2xl mx-auto text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Everything you need to know about using the Multi UI component library
          </motion.p>
        </div>
        
        <motion.div 
          className="grid gap-8 md:grid-cols-3 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CommandCard 
            icon={Package} 
            title="Installation" 
            command="npm i @omsalunke0852/multi-ui-cli" 
            description="Install the Multi UI CLI tool to get started with component integration."
          />
          <CommandCard 
            icon={Terminal} 
            title="Setup" 
            command="npx multi-ui setup" 
            description="Initialize Multi UI in your project with a single command."
          />
          <CommandCard 
            icon={Layers} 
            title="Add Components" 
            command="npx multi-ui add ComponentName_VariantNumber" 
            description="Add specific component variants to your project as needed."
          />
        </motion.div>
        
        <div className="prose prose-invert max-w-none">
          <div className="bg-gray-800 border-l-4 border-blue-500 p-6 rounded-r-lg mb-12">
            <h2 className="text-2xl font-bold text-blue-300 mb-4">Getting Started</h2>
            <p className="text-gray-300">
              Multi UI is a versatile React component library that offers multiple design variants for each component.
              Follow the steps below to integrate Multi UI into your project.
            </p>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white">Detailed Installation Guide</h2>
            
            <div className="space-y-12">
              <div className="bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-700">
                <div className="flex items-start mb-6">
                  <div className="bg-gray-700 text-blue-400 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Install the CLI Tool</h3>
                    <p className="text-gray-300 mb-6">
                      Start by installing the Multi UI CLI tool which will help you manage components:
                    </p>
                    <CodeBlock code="npm i @omsalunke0852/multi-ui-cli" />
                    <p className="text-sm text-gray-400 mt-4">
                      This will add the CLI tool to your project dependencies, allowing you to use the Multi UI commands.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-700">
                <div className="flex items-start mb-6">
                  <div className="bg-gray-700 text-blue-400 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Set Up Your Project</h3>
                    <p className="text-gray-300 mb-6">
                      Initialize Multi UI in your project to create the necessary configuration:
                    </p>
                    <CodeBlock code="npx multi-ui setup" />
                    <p className="text-sm text-gray-400 mt-4">
                      This command creates the required directory structure and configuration files for Multi UI components.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-700">
                <div className="flex items-start mb-6">
                  <div className="bg-gray-700 text-blue-400 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Add Components</h3>
                    <p className="text-gray-300 mb-6">
                      Add specific component variants to your project as needed:
                    </p>
                    <CodeBlock code="npx multi-ui add ComponentName_VariantNumber" />
                    <p className="text-sm text-gray-400 mt-4">
                      Replace &quot;ComponentName&quot; with the component you want (like Button, Accordion) and &quot;VariantNumber&quot; with the variant number (like 1, 2, 3).
                    </p>
                    
                    <h4 className="text-lg font-semibold mt-8 mb-4 text-gray-100">Examples:</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <CodeBlock code="npx multi-ui add Button_1" />
                        <p className="text-sm text-gray-300 mt-2">Adds Button variant 1</p>
                      </div>
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <CodeBlock code="npx multi-ui add Button_2" />
                        <p className="text-sm text-gray-300 mt-2">Adds Button variant 2</p>
                      </div>
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <CodeBlock code="npx multi-ui add Accordion_1" />
                        <p className="text-sm text-gray-300 mt-2">Adds Accordion variant 1</p>
                      </div>
                      <div className="bg-gray-700 p-4 rounded-lg">
                        <CodeBlock code="npx multi-ui add Card_3" />
                        <p className="text-sm text-gray-300 mt-2">Adds Card variant 3</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white">Available Components</h2>
            <p className="text-lg text-gray-300 mb-8">
              Multi UI offers a wide range of components, each with multiple design variants to suit your needs:
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ComponentVariant name="Button" variants={["primary", "secondary", "outline", "ghost", "link"]} />
              <ComponentVariant name="Card" variants={["default", "interactive", "pricing", "product"]} />
              <ComponentVariant name="Input" variants={["default", "search", "password", "with-icon"]} />
              <ComponentVariant name="Modal" variants={["default", "alert", "form", "sidebar"]} />
              <ComponentVariant name="Navbar" variants={["simple", "responsive", "with-dropdown"]} />
              <ComponentVariant name="Table" variants={["simple", "interactive", "data", "sortable"]} />
              <ComponentVariant name="Form" variants={["login", "signup", "contact", "checkout"]} />
              <ComponentVariant name="Dropdown" variants={["simple", "multi-select", "nested"]} />
              <ComponentVariant name="Tabs" variants={["default", "underlined", "pills", "vertical"]} />
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/components" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-blue-400 hover:bg-blue-500 transition-colors">
                Browse All Components <ChevronRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-white">CLI Reference</h2>
            <p className="text-lg text-gray-300 mb-8">
              The Multi UI CLI provides several commands to help you manage components in your project:
            </p>
            
            <div className="bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-700 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Help Command</h3>
              <p className="text-gray-300 mb-6">
                View all available commands and options:
              </p>
              <CodeBlock code="npx multi-ui --help" />
            </div>
            
            <div className="bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">List Components</h3>
              <p className="text-gray-300 mb-6">
                View all available components and their variants:
              </p>
              <CodeBlock code="npx multi-ui list" />
            </div>
          </div>
          
          <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-white">Contributing</h2>
            <p className="text-lg text-gray-300 mb-6">
              We welcome contributions to Multi UI! Whether you&apos;re fixing bugs, adding features, or improving documentation.
            </p>
            <Link 
              href="https://github.com/om0852/multi-ui" 
              className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md bg-gray-700 hover:bg-gray-600 text-white transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Visit GitHub Repository <ChevronRight className="ml-2" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage; 