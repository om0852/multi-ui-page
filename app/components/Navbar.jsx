"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/logo.svg"
                alt="Multi UI Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">Multi UI</span>
            </Link>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
              Home
            </Link>
            <Link href="/docs" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
              Documentation
            </Link>
            <Link href="/components" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
              Components
            </Link>
            <Link href="/examples" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100">
              Examples
            </Link>
            <Link href="https://github.com/om0852/multi-ui" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100"
                  target="_blank" rel="noopener noreferrer">
              GitHub
            </Link>
          </div>
          
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
              Home
            </Link>
            <Link href="/docs" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
              Documentation
            </Link>
            <Link href="/components" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
              Components
            </Link>
            <Link href="/examples" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
              Examples
            </Link>
            <Link 
              href="https://github.com/om0852/multi-ui" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 