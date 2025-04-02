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
  Sparkles,
  Settings,
  Search,
  List,
  HelpCircle
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

const PackageManagerTabs = ({ commands }: { commands: { [key: string]: string } }) => {
  const [activeTab, setActiveTab] = useState('npm');
  
  return (
    <div className="space-y-4">
      <div className="flex space-x-2 mb-4">
        {Object.keys(commands).map((manager) => (
          <button
            key={manager}
            onClick={() => setActiveTab(manager)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === manager
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
            }`}
          >
            {manager.toUpperCase()}
          </button>
        ))}
      </div>
      <CodeBlock code={commands[activeTab]} />
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

  const installCommands = {
    npm: "npm install -g @omsalunke0852/multi-ui-cli",
    yarn: "yarn global add @omsalunke0852/multi-ui-cli",
    pnpm: "pnpm add -g @omsalunke0852/multi-ui-cli",
    bun: "bun add -g @omsalunke0852/multi-ui-cli"
  };

  const setupCommands = {
    npm: "npx multi-ui setup",
    yarn: "yarn multi-ui setup",
    pnpm: "pnpm multi-ui setup",
    bun: "bunx multi-ui setup"
  };

  const devCommands = {
    npm: "npm run dev",
    yarn: "yarn dev",
    pnpm: "pnpm dev",
    bun: "bun dev"
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
              A powerful command-line interface tool for managing and integrating UI components from both GitHub and MongoDB sources, built for Next.js projects.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Getting Started Section */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Getting Started</h2>
          <div className="space-y-8">
            {/* Step 1: Installation */}
            <motion.div 
              className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70 relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-blue-400 rounded-xl w-10 h-10 flex items-center justify-center mt-1 shadow-inner backdrop-blur-sm">
                  <span className="font-bold">1</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Package className="text-blue-400" size={24} />
                    <h3 className="text-xl font-bold text-white">Installation</h3>
                  </div>
                  <p className="text-gray-300 mb-4">Install the Multi UI CLI tool globally to use it across your projects.</p>
                  <PackageManagerTabs commands={installCommands} />
                </div>
              </div>
            </motion.div>

            {/* Step 2: Setup */}
            <motion.div 
              className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70 relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-blue-400 rounded-xl w-10 h-10 flex items-center justify-center mt-1 shadow-inner backdrop-blur-sm">
                  <span className="font-bold">2</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Terminal className="text-blue-400" size={24} />
                    <h3 className="text-xl font-bold text-white">Project Setup</h3>
                  </div>
                  <p className="text-gray-300 mb-4">Initialize your project with necessary dependencies and configurations.</p>
                  <PackageManagerTabs commands={setupCommands} />
                  <div className="mt-6">
                    <p className="text-sm text-gray-400 mb-2">Then start the development server:</p>
                    <PackageManagerTabs commands={devCommands} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3: Add Components */}
            <motion.div 
              className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70 relative overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl"></div>
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-blue-400 rounded-xl w-10 h-10 flex items-center justify-center mt-1 shadow-inner backdrop-blur-sm">
                  <span className="font-bold">3</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Layers className="text-blue-400" size={24} />
                    <h3 className="text-xl font-bold text-white">Add Components</h3>
                  </div>
                  <p className="text-gray-300 mb-4">Add components to your project using one of these methods:</p>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">From GitHub:</p>
                      <CodeBlock code="npx multi-ui add <ComponentName> [customFilename]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">From MongoDB:</p>
                      <CodeBlock code="npx multi-ui add <ComponentID> [customFilename]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">With example files:</p>
                      <CodeBlock code="npx multi-ui add <ComponentName> --example [customFilename]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Additional Commands Section */}
        <motion.div 
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Additional Commands</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {/* List Components */}
            <motion.div 
              className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <List className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold text-white">List Components</h3>
              </div>
              <p className="text-gray-300 mb-4">View all available components with their variants and metadata.</p>
              <CodeBlock code="npx multi-ui list" />
            </motion.div>

            {/* Search Components */}
            <motion.div 
              className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <Search className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold text-white">Search Components</h3>
              </div>
              <p className="text-gray-300 mb-4">Search for components using fuzzy matching and filters.</p>
              <CodeBlock code="npx multi-ui search <term>" />
            </motion.div>

            {/* Interactive Mode */}
            <motion.div 
              className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <Settings className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold text-white">Interactive Mode</h3>
              </div>
              <p className="text-gray-300 mb-4">Use the interactive UI for component browsing and management.</p>
              <CodeBlock code="npx multi-ui interactive" />
            </motion.div>

            {/* Remove Components */}
            <motion.div 
              className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <Trash className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold text-white">Remove Components</h3>
              </div>
              <p className="text-gray-300 mb-4">Remove components that are no longer needed in your project.</p>
              <CodeBlock code="npx multi-ui remove <ComponentName>" />
            </motion.div>

            {/* Help & Version */}
            <motion.div 
              className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70 md:col-span-2"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold text-white">Help & Version</h3>
              </div>
              <p className="text-gray-300 mb-4">Get help information or check the CLI version.</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Show help information:</p>
                  <CodeBlock code="npx multi-ui --help" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Show version:</p>
                  <CodeBlock code="npx multi-ui --version" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Project Structure Section */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Project Structure</h2>
          <div className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70">
            <CodeBlock code={`your-project/
├── app/
│   ├── components/
│   │   ├── multi-ui/
│   │   │   ├── [ComponentName]/
│   │   │   │   ├── index.tsx
│   │   │   │   └── examples/
│   │   │   │       └── Example_1.tsx
│   │   │   └── ...
│   │   └── ...
│   └── ...
├── public/
│   └── multi-ui/
│       └── assets/
├── multi-ui.config.json
└── package.json`} />
          </div>
        </motion.div>

        {/* Configuration Section */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Configuration</h2>
          <div className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70">
            <p className="text-gray-300 mb-4">The `multi-ui.config.json` configuration file:</p>
            <CodeBlock code={`{
  "language": "typescript",
  "componentPath": "app/components/multi-ui",
  "examplesPath": "examples",
  "framework": "next",
  "styling": "tailwind",
  "typescript": {
    "strict": true
  }
}`} />
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70">
            <h3 className="text-xl font-bold mb-4">TypeScript Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Full type safety</li>
              <li>• IntelliSense support</li>
              <li>• Automatic JS conversion</li>
              <li>• Type definitions included</li>
            </ul>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70">
            <h3 className="text-xl font-bold mb-4">Next.js Integration</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Next.js 14+ compatible</li>
              <li>• App Router support</li>
              <li>• Server Components</li>
              <li>• Automatic optimization</li>
            </ul>
          </div>
          <div className="bg-gray-800/70 rounded-xl p-6 backdrop-blur-sm border border-gray-700/70">
            <h3 className="text-xl font-bold mb-4">Styling</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Tailwind CSS support</li>
              <li>• Custom theming</li>
              <li>• Responsive design</li>
              <li>• Dark mode ready</li>
            </ul>
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold mb-8">Need Help?</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="https://github.com/yourusername/multi-ui-cli/issues" 
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
              <HelpCircle className="mr-2" size={20} />
              Report Issues
            </Link>
            <Link href="https://discord.gg/multi-ui" 
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
              <ChevronRight className="mr-2" size={20} />
              Join Discord
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DocsPage; 