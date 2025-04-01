'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail, Heart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-gray-800">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-95" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10" />

      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo and description */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center group">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-6 w-6 text-blue-500" />
                </motion.div>
                <div className="ml-2 flex items-center">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Multi UI
                  </span>
                </div>
              </Link>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                A modern React component library with multiple design variants, built with performance and customization in mind.
              </p>
              <div className="mt-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Heart className="h-4 w-4 mr-2 text-red-400" />
                  Built with love
                </div>
              </div>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/docs" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/components" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Components
                  </Link>
                </li>
                <li>
                  <Link href="/contribute" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Contribute
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Connect */}
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400 mb-4">
                Connect
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Terms of Service
                  </Link>
                </li>
              </ul>
              
              {/* Social links */}
              <div className="mt-6">
                <div className="flex space-x-4">
                  <a 
                    href="https://github.com/om0852/multi-ui" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="sr-only">GitHub</span>
                    <Github className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://twitter.com/multi_ui" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="sr-only">Twitter</span>
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a 
                    href="mailto:info@multi-ui.com" 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <span className="sr-only">Email</span>
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Multi UI. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <Sparkles className="h-4 w-4 text-blue-400" />
                </motion.div>
                <span className="text-sm text-gray-400">
                  Crafted with precision
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;