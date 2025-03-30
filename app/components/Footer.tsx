'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">Multi UI</span>
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              A modern React component library with multiple design variants
            </p>
          </div>
          
          {/* Links 1 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/docs" className="text-base text-gray-600 hover:text-gray-900">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/components" className="text-base text-gray-600 hover:text-gray-900">
                  Components
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="text-base text-gray-600 hover:text-gray-900">
                  Contribute
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Links 2 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-base text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-base text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-base text-gray-600 hover:text-gray-900">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Links 3 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/privacy" className="text-base text-gray-600 hover:text-gray-900">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-gray-600 hover:text-gray-900">
                  Terms
                </Link>
              </li>
            </ul>
            
            {/* Social links */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Connect
              </h3>
              <div className="mt-4 flex space-x-4">
                <a href="https://github.com/om0852/multi-ui" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">GitHub</span>
                  <Github className="h-6 w-6" />
                </a>
                <a href="https://twitter.com/multi_ui" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Twitter</span>
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="mailto:info@multi-ui.com" className="text-gray-600 hover:text-gray-900">
                  <span className="sr-only">Email</span>
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Multi UI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 