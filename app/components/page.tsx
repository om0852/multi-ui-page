"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Copy, Check, ExternalLink } from 'lucide-react';

// Component categories with their variants - UPDATED with all available components
const componentCategories = [
  {
    name: "Layout",
    components: [
      { name: "Accordion", variants: 50, description: "Collapsible content panels" },
      { name: "Card", variants: 50, description: "Content containers with multiple styles" },
      { name: "Container", variants: 20, description: "Responsive wrappers for content" },
      { name: "Dialog", variants: 25, description: "Modal dialog windows for interactions" },
      { name: "Drawer", variants: 20, description: "Sliding panels for navigation or details" },
    ]
  },
  {
    name: "Inputs",
    components: [
      { name: "Button", variants: 50, description: "Interactive buttons with various styles" },
      { name: "Checkbox", variants: 30, description: "Selection controls for multiple options" },
      { name: "Clock", variants: 25, description: "Time display components with various styles" },
      { name: "Counter", variants: 20, description: "Numeric input with increment/decrement" },
      { name: "FileInput", variants: 15, description: "File upload input components" },
      { name: "InputField", variants: 40, description: "Text input fields with various styles" },
      { name: "InputMask", variants: 20, description: "Masked input for formatted text" },
      { name: "Editable", variants: 15, description: "Inline editable text fields" },
    ]
  },
  {
    name: "Display",
    components: [
      { name: "Alert", variants: 35, description: "Contextual feedback messages" },
      { name: "Avatar", variants: 20, description: "User profile images with various styles" },
      { name: "Badge", variants: 25, description: "Small status indicators" },
      { name: "Clipboard", variants: 15, description: "Copy to clipboard functionality" },
      { name: "Confetti", variants: 10, description: "Celebration effects and animations" },
      { name: "Modal", variants: 30, description: "Overlay windows for focused tasks" },
    ]
  },
  {
    name: "Navigation",
    components: [
      { name: "Breadcrumb", variants: 15, description: "Page navigation indicators" },
      { name: "Navbar", variants: 40, description: "Top navigation bars" },
    ]
  }
];

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto font-mono text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
        aria-label="Copy code"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
};

const ComponentCard = ({ component }: { component: { name: string, variants: number, description: string } }) => {
  return (
    <motion.div 
      className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white">{component.name}</h3>
          <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded-full">
            {component.variants} variants
          </span>
        </div>
        <p className="text-gray-300 text-sm mb-4">{component.description}</p>
        <div className="space-y-3">
          <CodeBlock code={`npx multi-ui add ${component.name}_1`} />
          {component.variants > 1 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {[...Array(Math.min(4, component.variants))].map((_, i) => (
                <span key={i} className="bg-gray-700 text-xs px-2 py-1 rounded text-gray-300">
                  Variant {i + 1}
                </span>
              ))}
              {component.variants > 4 && (
                <span className="bg-gray-700 text-xs px-2 py-1 rounded text-gray-300">
                  +{component.variants - 4} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-gray-700 p-3 bg-gray-850 flex justify-between items-center">
                  <Link
                    href={`/components/${component.name.toLowerCase()}`}
          className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center"
        >
          View Details <ChevronRight size={16} className="ml-1" />
        </Link>
        <button className="text-gray-400 hover:text-gray-300">
          <ExternalLink size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const ComponentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter components based on search and category
  const filteredCategories = componentCategories
    .map(category => ({
      ...category,
      components: category.components.filter(component => 
        component.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => 
      activeCategory === 'all' || category.name.toLowerCase() === activeCategory.toLowerCase()
    );

  const totalComponents = componentCategories.reduce(
    (sum, category) => sum + category.components.length, 
    0
  );

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
            Multi UI Components
          </motion.h1>
          <motion.p 
            className="max-w-2xl mx-auto text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Browse our collection of 40+ components with multiple design variants
          </motion.p>
        </div>
        
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
                        </div>
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                  activeCategory === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => setActiveCategory('all')}
              >
                All Categories
              </button>
              {componentCategories.map((category) => (
                <button
                  key={category.name}
                  className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                    activeCategory === category.name.toLowerCase() 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveCategory(category.name.toLowerCase())}
                >
                  {category.name}
                </button>
                            ))}
                          </div>
                      </div>
          
          {filteredCategories.map((category) => (
            category.components.length > 0 && (
              <div key={category.name} className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="bg-blue-900 w-2 h-8 mr-3 rounded-sm"></span>
                  {category.name}
                  <span className="ml-3 text-sm bg-gray-800 px-2 py-1 rounded text-gray-300">
                    {category.components.length} components
                  </span>
                </h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {category.components.map((component) => (
                    <ComponentCard key={component.name} component={component} />
                  ))}
                    </div>
              </div>
            )
          ))}
          
          {filteredCategories.every(category => category.components.length === 0) && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No components found matching "{searchTerm}"</p>
              <button 
                className="mt-4 px-4 py-2 bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700"
                onClick={() => setSearchTerm('')}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
        
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need a Custom Component?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Don't see what you're looking for? You can request a custom component or contribute to our library.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/docs"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Read Documentation
            </Link>
            <Link 
              href="https://github.com/om0852/multi-ui"
              className="px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsPage; 