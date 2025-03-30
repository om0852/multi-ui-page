'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Component = {
  name: string;
  slug: string;
  image: string;
  description: string;
  variants: number;
};

export default function ComponentsPage() {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        // In a real implementation, you might fetch this from an API
        // For now, we'll create it based on the directory structure we observed
        const componentList: Component[] = [
          { 
            name: 'Accordion', 
            slug: 'accordian', 
            image: '/images/components/accordion.webp', 
            description: 'Vertically collapsing content panels', 
            variants: 50 
          },
          { 
            name: 'Avatar', 
            slug: 'avatar', 
            image: '/images/components/avatar.webp', 
            description: 'User profile pictures or icons', 
            variants: 20 
          },
          { 
            name: 'Badge', 
            slug: 'badge', 
            image: '/images/components/badge.webp', 
            description: 'Small count and labeling elements', 
            variants: 15 
          },
          { 
            name: 'Bar', 
            slug: 'bar', 
            image: '/images/components/bar.webp', 
            description: 'Progress indicators and data visualization', 
            variants: 12 
          },
          { 
            name: 'Button', 
            slug: 'button', 
            image: '/images/components/button.webp', 
            description: 'Interactive clickable elements', 
            variants: 30 
          },
          { 
            name: 'Cards', 
            slug: 'cards', 
            image: '/images/components/cards.webp', 
            description: 'Content containers for information', 
            variants: 25 
          },
          { 
            name: 'Carousel', 
            slug: 'carousel', 
            image: '/images/components/carousel.webp', 
            description: 'Slideshows for cycling through elements', 
            variants: 18 
          },
          { 
            name: 'Checkbox', 
            slug: 'checkbox', 
            image: '/images/components/checkbox.webp', 
            description: 'Form elements for multiple selections', 
            variants: 10 
          },
          { 
            name: 'Circular Progress Bar', 
            slug: 'circularprogressbar', 
            image: '/images/components/circularprogressbar.webp', 
            description: 'Radial progress indicators', 
            variants: 15 
          },
          { 
            name: 'Clipboard', 
            slug: 'clipboard', 
            image: '/images/components/clipboard.webp', 
            description: 'Copy-to-clipboard functionality', 
            variants: 8 
          },
          { 
            name: 'Clock', 
            slug: 'clock', 
            image: '/images/components/clock.webp', 
            description: 'Time displays and timers', 
            variants: 10 
          },
          { 
            name: 'Collapsible', 
            slug: 'collapsible', 
            image: '/images/components/collapsible.webp', 
            description: 'Expandable and collapsible content sections', 
            variants: 12 
          },
          { 
            name: 'Color Picker', 
            slug: 'colorpicker', 
            image: '/images/components/colorpicker.webp', 
            description: 'Color selection interfaces', 
            variants: 8 
          },
          { 
            name: 'Confetti', 
            slug: 'confetti', 
            image: '/images/components/confetti.webp', 
            description: 'Celebratory animation effects', 
            variants: 5 
          },
          { 
            name: 'Counter', 
            slug: 'counter', 
            image: '/images/components/counter.webp', 
            description: 'Numeric increment/decrement controls', 
            variants: 10 
          },
          { 
            name: 'Dialog', 
            slug: 'dialog', 
            image: '/images/components/dialog.webp', 
            description: 'Modal windows for focused interactions', 
            variants: 15 
          },
          { 
            name: 'Drawer', 
            slug: 'drawer', 
            image: '/images/components/drawer.webp', 
            description: 'Side panel navigation containers', 
            variants: 12 
          },
          { 
            name: 'Editable', 
            slug: 'editable', 
            image: '/images/components/editable.webp', 
            description: 'Inline text editing components', 
            variants: 8 
          },
          { 
            name: 'File Input', 
            slug: 'fileinput', 
            image: '/images/components/fileinput.webp', 
            description: 'File upload controls', 
            variants: 10 
          },
          { 
            name: 'Font Changer', 
            slug: 'fontchanger', 
            image: '/images/components/fontchanger.webp', 
            description: 'Typography and font controls', 
            variants: 5 
          },
          { 
            name: 'Input Field', 
            slug: 'inputfield', 
            image: '/images/components/inputfield.webp', 
            description: 'Text input form elements', 
            variants: 20 
          },
          { 
            name: 'Input Mask', 
            slug: 'inputmask', 
            image: '/images/components/inputmask.webp', 
            description: 'Formatted input with masking', 
            variants: 8 
          }
        ];

        setComponents(componentList);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch components:', error);
        setLoading(false);
      }
    };

    fetchComponents();
  }, []);

  const filteredComponents = components.filter(component => 
    component.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants for components grid
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            UI Components
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Explore our collection of beautifully designed, ready-to-use components
          </p>
          
          {/* Search input */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search components..."
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

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredComponents.map((component) => (
              <motion.div key={component.slug} variants={item}>
                <Link 
                  href={`/components/${component.slug}`}
                  className="block group"
                >
                  <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 group-hover:shadow-lg">
                    <div className="relative h-48 w-full bg-gray-200">
                      {/* Placeholder image - in a real implementation, you'd use actual component preview images */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-4xl font-bold">
                        {component.name.charAt(0)}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                        {component.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {component.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {component.variants} variants
                        </span>
                        <span className="text-sm text-indigo-500 group-hover:text-indigo-700">
                          View details →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
} 