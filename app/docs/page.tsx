"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  Check, 
  ChevronRight, 
  Terminal, 
  Package, 
  Layers, 
  Trash,
  FileCode,
  Download,
  Sparkles
} from 'lucide-react';

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-sm rounded-xl opacity-70 group-hover:opacity-100 transition duration-200"></div>
      <div className="relative">
        <pre className="bg-gray-900/90 text-gray-100 p-5 rounded-lg overflow-x-auto font-mono text-sm border border-gray-700/50 backdrop-blur-sm">
          <code>{code}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 rounded-md bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 transition-colors backdrop-blur-sm"
          aria-label="Copy code"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={copied ? 'check' : 'copy'}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
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
      className="bg-gray-800/70 rounded-xl shadow-lg overflow-hidden border border-gray-700/70 backdrop-blur-sm relative"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Subtle gradient accent in the background */}
      <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 animate-gradient-xy opacity-80"></div>
      
      <div className="p-6 relative">
        <div className="flex items-center mb-5">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3 rounded-xl mr-4 backdrop-blur-md shadow-inner">
            <Icon className="text-blue-400" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-300 mb-5 leading-relaxed">{description}</p>
        <CodeBlock code={command} />
      </div>
      
      {/* Corner accent */}
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-xl rounded-full"></div>
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
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/40 to-purple-900/40"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-20"></div>
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 50, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Title with animated elements */}
            <motion.h1 
              className="text-5xl md:text-6xl font-extrabold mb-6 relative inline-flex items-center"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute -left-16 top-1/2 transform -translate-y-1/2 hidden md:block"
              >
                <Sparkles className="h-8 w-8 text-blue-400" />
              </motion.div>
              
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 animate-gradient">
                Documentation
              </span>
              
              <motion.div
                animate={{
                  rotate: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute -right-16 top-1/2 transform -translate-y-1/2 hidden md:block"
              >
                <Sparkles className="h-8 w-8 text-purple-400" />
              </motion.div>
            </motion.h1>
            
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto max-w-[300px] mb-8"
            />
            
            <motion.p 
              className="max-w-3xl mx-auto text-xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Everything you need to know about using the Multi UI component library
            </motion.p>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
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
          <CommandCard 
            icon={FileCode} 
            title="Add Customized Component" 
            command="npx multi-ui add Component-ID [filename]" 
            description="Add a customized component from the chat interface to your project."
          />
          <CommandCard 
            icon={Trash} 
            title="Remove Components" 
            command="npx multi-ui remove filename" 
            description="Remove a specific component file from your project when no longer needed."
          />
          <CommandCard 
            icon={Download} 
            title="Get Help" 
            command="npx multi-ui --help" 
            description="View all available commands, options, and examples for using Multi UI."
          />
        </motion.div>
        
        <div className="prose prose-invert max-w-none">
          <motion.div 
            className="bg-gray-800/70 border-l-4 border-blue-500 p-8 rounded-r-xl mb-16 backdrop-blur-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-blue-300 mb-4">Getting Started</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Multi UI is a versatile React component library that offers multiple design variants for each component.
              Follow the steps below to integrate Multi UI into your project.
            </p>
          </motion.div>
          
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Detailed Installation Guide</h2>
            
            <div className="space-y-14">
              <div className="bg-gray-800/70 p-10 rounded-xl shadow-md border border-gray-700/70 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-start mb-6 relative">
                  <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-blue-400 rounded-xl w-10 h-10 flex items-center justify-center mr-6 mt-1 shadow-inner backdrop-blur-sm">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-5">Install the CLI Tool</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Start by installing the Multi UI CLI tool which will help you manage components:
                    </p>
                    <CodeBlock code="npm i @omsalunke0852/multi-ui-cli" />
                    <p className="text-sm text-gray-400 mt-5">
                      This will add the CLI tool to your project dependencies, allowing you to use the Multi UI commands.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/70 p-10 rounded-xl shadow-md border border-gray-700/70 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-start mb-6 relative">
                  <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-blue-400 rounded-xl w-10 h-10 flex items-center justify-center mr-6 mt-1 shadow-inner backdrop-blur-sm">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-5">Set Up Your Project</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Initialize Multi UI in your project to create the necessary configuration:
                    </p>
                    <CodeBlock code="npx multi-ui setup" />
                    <p className="text-sm text-gray-400 mt-5">
                      This command creates the required directory structure and configuration files for Multi UI components.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/70 p-10 rounded-xl shadow-md border border-gray-700/70 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-start mb-6 relative">
                  <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-blue-400 rounded-xl w-10 h-10 flex items-center justify-center mr-6 mt-1 shadow-inner backdrop-blur-sm">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-5">Add Components</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Add specific component variants to your project as needed:
                    </p>
                    <CodeBlock code="npx multi-ui add ComponentName_VariantNumber" />
                    <p className="text-sm text-gray-400 mt-5 mb-8">
                      Replace &quot;ComponentName&quot; with the component you want (like Button, Accordion) and &quot;VariantNumber&quot; with the variant number (like 1, 2, 3).
                    </p>
                    
                    <h4 className="text-lg font-semibold mt-10 mb-5 text-gray-100">Examples:</h4>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="bg-gray-700/70 p-5 rounded-xl backdrop-blur-sm">
                        <CodeBlock code="npx multi-ui add Button_1" />
                        <p className="text-sm text-gray-300 mt-3">Adds Button variant 1</p>
                      </div>
                      <div className="bg-gray-700/70 p-5 rounded-xl backdrop-blur-sm">
                        <CodeBlock code="npx multi-ui add Button_2" />
                        <p className="text-sm text-gray-300 mt-3">Adds Button variant 2</p>
                      </div>
                      <div className="bg-gray-700/70 p-5 rounded-xl backdrop-blur-sm">
                        <CodeBlock code="npx multi-ui add Accordion_1" />
                        <p className="text-sm text-gray-300 mt-3">Adds Accordion variant 1</p>
                      </div>
                      <div className="bg-gray-700/70 p-5 rounded-xl backdrop-blur-sm">
                        <CodeBlock code="npx multi-ui add Card_3" />
                        <p className="text-sm text-gray-300 mt-3">Adds Card variant 3</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/70 p-10 rounded-xl shadow-md border border-gray-700/70 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-start mb-6 relative">
                  <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-blue-400 rounded-xl w-10 h-10 flex items-center justify-center mr-6 mt-1 shadow-inner backdrop-blur-sm">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-5">Add Customized Components</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Add customized components created through the AI chat interface:
                    </p>
                    <CodeBlock code="npx multi-ui add Component-ID [filename]" />
                    <p className="text-sm text-gray-400 mt-5 mb-6">
                      Replace &quot;Component-ID&quot; with the ID provided by the chatbot and optionally specify a filename.
                    </p>
                    
                    <div className="bg-blue-900/30 border border-blue-500/30 p-5 rounded-xl">
                      <h5 className="text-blue-300 font-medium mb-3 flex items-center">
                        <Sparkles className="h-4 w-4 mr-2" /> New Feature
                      </h5>
                      <p className="text-gray-300 text-sm">
                        Components customized through our chat interface can be added directly to your project using the unique Component ID generated when you save a customization.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/70 p-10 rounded-xl shadow-md border border-gray-700/70 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="flex items-start mb-6 relative">
                  <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-blue-400 rounded-xl w-10 h-10 flex items-center justify-center mr-6 mt-1 shadow-inner backdrop-blur-sm">
                    <span className="font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-5">Remove Components</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      Remove components that are no longer needed in your project:
                    </p>
                    <CodeBlock code="npx multi-ui remove filename" />
                    <p className="text-sm text-gray-400 mt-5 mb-6">
                      Replace &quot;filename&quot; with the name of the component file you want to remove.
                    </p>
                    
                    <div className="bg-blue-900/30 border border-blue-500/30 p-5 rounded-xl">
                      <h5 className="text-blue-300 font-medium mb-3 flex items-center">
                        <Sparkles className="h-4 w-4 mr-2" /> New Feature
                      </h5>
                      <p className="text-gray-300 text-sm">
                        The remove command helps you maintain a clean codebase by removing components you no longer need.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
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

// export default DocsPage; 
export default DocsPage; 