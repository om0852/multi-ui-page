"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Code, 
  Layers, 
  Zap, 
  Palette, 
  Package, 
  Github,
  Terminal
} from 'lucide-react';

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

// Feature component
const Feature = ({ icon: Icon, title, description }: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) => (
  <motion.div 
    className="bg-gray-800 p-6 rounded-lg border border-gray-700"
    variants={itemVariants}
    whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
  >
    <div className="bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
      <Icon className="text-blue-400" size={24} />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

// Code example component
const CodeExample = () => (
  <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
    <div className="flex items-center bg-gray-900 px-4 py-2 border-b border-gray-700">
      <div className="flex space-x-2 mr-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <span className="text-gray-400 text-sm">Terminal</span>
    </div>
    <div className="p-4 font-mono text-sm text-gray-300 overflow-x-auto">
      <div className="flex">
        <span className="text-gray-500 mr-2">$</span>
        <span className="text-green-400">npm i @omsalunke0852/multi-ui-cli</span>
      </div>
      <div className="flex mt-2">
        <span className="text-gray-500 mr-2">$</span>
        <span className="text-green-400">npx multi-ui setup</span>
      </div>
      <div className="flex mt-2">
        <span className="text-gray-500 mr-2">$</span>
        <span className="text-green-400">npx multi-ui add Button_1</span>
      </div>
      <div className="mt-2 text-blue-300">✓ Button component added successfully!</div>
    </div>
  </div>
);

// Component preview
const ComponentPreview = () => (
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col items-center">
      <div className="bg-blue-600 text-white px-4 py-2 rounded-md mb-2 text-sm font-medium">
        Button_1
      </div>
      <span className="text-xs text-gray-400">Primary Button</span>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col items-center">
      <div className="bg-transparent border border-blue-500 text-blue-500 px-4 py-2 rounded-md mb-2 text-sm font-medium">
        Button_2
      </div>
      <span className="text-xs text-gray-400">Outline Button</span>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col items-center">
      <div className="bg-gray-700 text-white px-4 py-2 rounded-md mb-2 text-sm font-medium">
        Button_3
      </div>
      <span className="text-xs text-gray-400">Secondary Button</span>
    </div>
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col items-center">
      <div className="bg-transparent text-blue-400 px-4 py-2 rounded-md mb-2 text-sm font-medium">
        Button_4
      </div>
      <span className="text-xs text-gray-400">Ghost Button</span>
    </div>
  </div>
);

export default function Home() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-800"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Multi UI
                </span>
            </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                A versatile React component library with multiple design variants for each component
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="/docs"
                className="px-8 py-3 bg-blue-600 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Get Started <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link
                href="/components"
                className="px-8 py-3 bg-gray-800 border border-gray-700 rounded-md font-medium hover:bg-gray-700 transition-colors"
              >
                Browse Components
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-16 md:mt-24 grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Install once, <span className="text-blue-400">use everywhere</span>
              </h2>
              <p className="text-gray-300 mb-6">
                Multi UI provides a comprehensive set of React components with multiple design variants. 
                Simply install our CLI tool and add components as needed.
              </p>
              <CodeExample />
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Palette className="mr-2 text-blue-400" size={20} />
                Multiple Variants
              </h3>
              <p className="text-gray-300 mb-6">
                Each component comes with multiple design variants. Choose the one that fits your project's style.
              </p>
              <ComponentPreview />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Multi UI?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Designed for developers who want flexibility without sacrificing quality or performance
            </p>
                </div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Feature 
              icon={Layers}
              title="Multiple Variants"
              description="Each component comes with multiple design variants to match your project's aesthetic."
            />
            <Feature 
              icon={Zap}
              title="Performance Optimized"
              description="Built with performance in mind, ensuring your application stays fast and responsive."
            />
            <Feature 
              icon={Code}
              title="Easy Integration"
              description="Simple CLI commands to add exactly what you need, when you need it."
            />
            <Feature 
              icon={Package}
              title="Lightweight"
              description="Only import what you use. No bloated dependencies or unnecessary code."
            />
            <Feature 
              icon={Terminal}
              title="Developer Friendly"
              description="Well-documented API with TypeScript support and intuitive naming conventions."
            />
            <Feature 
              icon={Github}
              title="Open Source"
              description="Fully open source and community-driven. Contributions are welcome!"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="md:flex items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8">
                <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-gray-300 text-lg max-w-2xl">
                  Start building beautiful interfaces with Multi UI today. Check out our documentation to learn more.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/docs"
                  className="px-8 py-3 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition-colors text-center"
                >
                  Read the Docs
                </Link>
                <Link 
                  href="https://github.com/om0852/multi-ui" 
                  className="px-8 py-3 bg-transparent border border-white rounded-md font-medium hover:bg-white/10 transition-colors flex items-center justify-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2" size={18} />
                  GitHub
            </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 