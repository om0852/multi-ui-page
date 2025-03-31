"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Code, Eye } from 'lucide-react';

export default function ComponentPage() {
  const pathname = usePathname();
  const slug = pathname.split('/').pop() || '';

  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchComponentData = async () => {
      try {
        const variantNumbers = [];
        
        // Simulate getting the number of variants
        let maxVariants = 50; // Default maximum for Accordion
        
        // Adjust max variants based on component type
        switch(slug) {
          case 'accordian':
            maxVariants = 50;
            break;
          case 'avatar':
            maxVariants = 20;
            break;
          case 'badge':
            maxVariants = 15;
            break;
          default:
            maxVariants = 10;
        }
        
        // Generate variant numbers from 1 to maxVariants
        for (let i = 1; i <= maxVariants; i++) {
          variantNumbers.push(i);
        }
        
        // Convert numbers to variant objects
        const variants = variantNumbers.map(num => ({
          id: `${num}`,
          name: `Variant ${num}`,
          description: `${toTitleCase(slug.replace('-', ' '))} design variation ${num}`
        }));
        
        // Create component data object
        const componentData = {
          name: toTitleCase(slug.replace('-', ' ')),
          slug: slug,
          description: `A collection of ${variants.length} ${toTitleCase(slug.replace('-', ' '))} components for your UI needs.`,
          variants
        };
        
        setComponent(componentData);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch component data:', error);
        setLoading(false);
      }
    };
    
    fetchComponentData();
  }, [slug]);
  
  // Helper function to convert strings to title case
  const toTitleCase = (str) => {
    return str.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Filter variants based on search term
  const filteredVariants = component?.variants.filter(variant => 
    variant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    variant.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!component) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-900">Component not found</h1>
        <p className="mt-2 text-gray-600">The component you&apos;re looking for doesn&apos;t exist.</p>
        <Link 
          href="/components" 
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Components
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link 
            href="/components" 
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Components
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{component.name}</h1>
          <p className="mt-2 text-lg text-gray-500">{component.description}</p>
        </div>
        
        {/* Search variants */}
        <div className="mb-8">
          <div className="max-w-md">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={`Search ${component.name} variants...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Variants grid */}
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredVariants.map((variant) => (
            <motion.div key={variant.id} variants={item}>
              <Link 
                href={`/components/${component.slug}/${variant.id}`}
                className="block group"
              >
                <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 group-hover:shadow-lg">
                  <div className="relative h-48 w-full bg-gray-100">
                    {/* Placeholder preview - in a real implementation, you'd render a preview of the component */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                      <div className="text-center">
                        <span className="block text-2xl font-bold">
                          {variant.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                      {variant.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {variant.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <Code className="h-3 w-3 mr-1" />
                          Code
                        </span>
                      </div>
                      <span className="text-sm text-indigo-500 group-hover:text-indigo-700">
                        View &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {filteredVariants.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No variants found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
} 