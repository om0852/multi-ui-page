"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Code, 
  Layers, 
  Zap, 
  Palette, 
  Package, 
  Github,
  Terminal,
  Sparkles,
  Compass,
  Repeat
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

// Enhanced Feature component with animation
const Feature = ({ icon: Icon, title, description }: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) => (
  <motion.div 
    className="relative overflow-hidden rounded-xl border border-gray-700/80 backdrop-blur-sm"
    variants={itemVariants}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    {/* Glowing gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 animate-gradient-xy opacity-80"></div>
    
    <div className="relative p-8">
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6 backdrop-blur-md shadow-inner">
        <Icon className="text-blue-400" size={26} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
      
      {/* Corner accent */}
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-xl rounded-full"></div>
    </div>
  </motion.div>
);

// Enhanced Code example component with animation
const CodeExample = () => (
  <motion.div 
    className="bg-gray-800/80 rounded-xl border border-gray-700/80 overflow-hidden backdrop-blur-sm shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
  >
    <div className="flex items-center bg-gray-900/80 px-4 py-3 border-b border-gray-700/80">
      <div className="flex space-x-2 mr-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <span className="text-gray-400 text-sm font-medium ml-2 flex items-center">
        <Terminal className="w-4 h-4 mr-2" /> Terminal
      </span>
    </div>
    <div className="p-6 font-mono text-sm text-gray-300 overflow-x-auto bg-gradient-to-br from-gray-900/50 to-gray-800/50">
      <div className="flex">
        <span className="text-gray-500 mr-2">$</span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-green-400"
        >
          npm i multi-ui-cli
        </motion.span>
      </div>
      <div className="flex mt-3">
        <span className="text-gray-500 mr-2">$</span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-green-400"
        >
          npx multi-ui setup
        </motion.span>
      </div>
      <div className="flex mt-3">
        <span className="text-gray-500 mr-2">$</span>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-green-400"
        >
          npx multi-ui add Button_1
        </motion.span>
      </div>
      <motion.div 
        className="mt-3 text-blue-300 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <span className="inline-flex items-center justify-center bg-blue-500/20 text-blue-400 h-5 w-5 rounded-full mr-2">✓</span> 
        Button component added successfully!
      </motion.div>
    </div>
  </motion.div>
);

// Enhanced Component preview
const ComponentPreview = () => (
  <motion.div 
    className="grid grid-cols-2 gap-5"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {[
      { name: "Button_1", title: "Primary Button", className: "bg-blue-600 text-white hover:bg-blue-700" },
      { name: "Button_2", title: "Outline Button", className: "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500/10" },
      { name: "Button_3", title: "Secondary Button", className: "bg-gray-700 text-white hover:bg-gray-600" },
      { name: "Button_4", title: "Ghost Button", className: "bg-transparent text-blue-400 hover:text-blue-300" }
    ].map((button, index) => (
      <motion.div 
        key={button.name} 
        className="bg-gray-800/60 p-5 rounded-xl border border-gray-700/80 flex flex-col items-center backdrop-blur-sm"
        variants={itemVariants}
        whileHover={{ y: -3, scale: 1.03 }}
        transition={{ delay: index * 0.1 }}
      >
        <motion.div 
          className={`${button.className} px-5 py-2.5 rounded-lg mb-3 text-sm font-medium transition-all duration-200 shadow-lg`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {button.name}
        </motion.div>
        <span className="text-xs text-gray-400">{button.title}</span>
      </motion.div>
    ))}
  </motion.div>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/40 to-purple-900/40"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-20"></div>
          
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"
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
            className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl"
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              {/* Title with animated elements */}
              <motion.h1 
                className="text-5xl md:text-7xl font-extrabold mb-6 relative inline-flex items-center gap-4"
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
                  <Sparkles className="h-10 w-10 text-blue-400" />
                </motion.div>
                
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 animate-gradient">
                  Multi UI
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
                  <Sparkles className="h-10 w-10 text-purple-400" />
                </motion.div>
              </motion.h1>
              
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto max-w-[300px] mb-8"
              />
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                A versatile React component library with multiple design variants 
                <br className="hidden md:block" /> for each component
              </motion.p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Link
                href="/docs"
                className="group px-8 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-medium hover:from-blue-500 hover:to-blue-600 transition-all duration-300 flex items-center justify-center text-lg shadow-lg shadow-blue-600/20"
              >
                Get Started
                <motion.div
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  whileHover={{ x: 3 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
              </Link>
              <Link
                href="/components"
                className="group px-8 py-3.5 bg-gray-800/80 border border-gray-700/80 rounded-lg font-medium hover:bg-gray-700/80 transition-all duration-300 flex items-center justify-center text-lg backdrop-blur-sm"
              >
                Browse Components
                <motion.div
                  className="ml-2 opacity-70 group-hover:opacity-100 transition-all duration-300"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Compass className="h-5 w-5" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-24 md:mt-32 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
                  Install once, <span className="relative ml-2">
                    <span className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-md rounded-lg"></span>
                    <span className="relative text-blue-400">use everywhere</span>
                  </span>
              </h2>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Multi UI provides a comprehensive set of React components with multiple design variants. 
                Simply install our CLI tool and add components as needed.
              </p>
              </motion.div>
              <CodeExample />
            </div>
            <motion.div 
              className="bg-gray-800/60 p-7 rounded-xl border border-gray-700/80 backdrop-blur-sm relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              {/* Background gradient accent */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>
              
              <div className="relative">
                <h3 className="text-xl font-bold mb-5 flex items-center">
                  <Palette className="mr-3 text-blue-400" size={22} />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Multiple Variants
                  </span>
              </h3>
                <p className="text-gray-300 mb-7 leading-relaxed">
                  Each component comes with multiple design variants. Choose the one that perfectly fits your project&apos;s style.
              </p>
              <ComponentPreview />
            </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section with Enhanced Design */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-900 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="flex items-center justify-center mb-5"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Repeat className="h-10 w-10 text-blue-400 opacity-80" />
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Why Choose Multi UI?
                </span>
              </h2>
            </motion.div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Designed for developers who want flexibility without sacrificing quality or performance
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <Feature 
              icon={Layers}
              title="Multiple Variants"
              description="Each component comes with multiple design variants to match your project's aesthetic and brand identity."
            />
            <Feature 
              icon={Zap}
              title="Performance Optimized"
              description="Built with performance in mind, ensuring your application stays fast and responsive even with complex UIs."
            />
            <Feature 
              icon={Code}
              title="Easy Integration"
              description="Simple CLI commands to add exactly what you need, when you need it. No complicated setup required."
            />
            <Feature 
              icon={Package}
              title="Lightweight"
              description="Only import what you use. No bloated dependencies or unnecessary code to slow down your application."
            />
            <Feature 
              icon={Terminal}
              title="Developer Friendly"
              description="Well-documented API with TypeScript support and intuitive naming conventions for a seamless developer experience."
            />
            <Feature 
              icon={Github}
              title="Open Source"
              description="Fully open source and community-driven. Contributions are welcome to help make Multi UI even better!"
            />
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 opacity-80"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-2xl overflow-hidden backdrop-blur-sm border border-blue-500/20 shadow-xl relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Background gradient effects */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 blur-3xl rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/10 blur-3xl rounded-full"></div>
            
            <div className="p-10 md:p-16 relative">
            <div className="md:flex items-center justify-between">
                <div className="mb-10 md:mb-0 md:mr-8 md:max-w-xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                      Start building beautiful interfaces <span className="text-blue-400">today</span>
                    </h2>
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                      Join the growing community of developers using Multi UI to create stunning and functional user interfaces. Get started in minutes with our simple setup process.
                </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-4"
                  >
            <Link
              href="/docs"
                      className="px-8 py-3.5 bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg shadow-blue-600/20"
                >
                      Get Started <ArrowRight className="ml-2" size={18} />
                </Link>
                <Link 
                  href="https://github.com/om0852/multi-ui" 
                      className="px-8 py-3.5 bg-gray-800 border border-gray-700 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center"
                    >
                      <Github className="mr-2" size={18} /> GitHub
                    </Link>
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="md:w-5/12 flex justify-center"
                >
                  <div className="relative p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-md shadow-inner">
                    <div className="bg-gray-900/80 rounded-lg p-6 backdrop-blur-md">
                      <div className="space-y-3 mb-4">
                        <div className="h-3 bg-gray-700 rounded-full w-3/4"></div>
                        <div className="h-3 bg-gray-700 rounded-full w-1/2"></div>
                        <div className="h-3 bg-gray-700 rounded-full w-5/6"></div>
                      </div>
                      <div className="flex flex-wrap gap-3 my-5">
                        {["#5D87FF", "#8347FF", "#FF6B6B", "#47C97E"].map((color, i) => (
                          <div 
                            key={color} 
                            className="h-10 w-10 rounded-lg"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                      <div className="flex gap-3">
                        <div className="h-8 bg-blue-500 rounded-md w-24 shadow-md"></div>
                        <div className="h-8 bg-gray-700 rounded-md w-24 shadow-md"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add style tag for animations */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes gradient-xy {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 4s linear infinite;
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 15s linear infinite;
        }
      `}</style>
    </div>
  );
} 