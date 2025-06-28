'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Search, 
  Zap, 
  Package,
  Layers,
  Sparkles,
  Command 
} from 'lucide-react';

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
            slug: 'accordion', 
            image: '/images/components/accordion.webp', 
            description: 'Vertically collapsing content panels', 
            variants: 30 
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
            variants: 30 
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
            variants: 30 
          },
          { 
            name: 'Carousel', 
            slug: 'carousel', 
            image: '/images/components/carousel.webp', 
            description: 'Slideshows for cycling through elements', 
            variants: 20 
          },
          { 
            name: 'Checkbox', 
            slug: 'checkbox', 
            image: '/images/components/checkbox.webp', 
            description: 'Form elements for multiple selections', 
            variants: 30 
          },
          { 
            name: 'Circular Progress Bar', 
            slug: 'circularprogressbar', 
            image: '/images/components/circularprogressbar.webp', 
            description: 'Radial progress indicators', 
            variants: 25 
          },
          { 
            name: 'Clock', 
            slug: 'clock', 
            image: '/images/components/clock.webp', 
            description: 'Time displays and timers', 
            variants: 20 
          },
          { 
            name: 'Collapsible', 
            slug: 'collapsible', 
            image: '/images/components/collapsible.webp', 
            description: 'Expandable and collapsible content sections', 
            variants: 20 
          },
          { 
            name: 'Color Picker', 
            slug: 'colorpicker', 
            image: '/images/components/colorpicker.webp', 
            description: 'Color selection interfaces', 
            variants: 15 
          },
          { 
            name: 'Confetti', 
            slug: 'confetti', 
            image: '/images/components/confetti.webp', 
            description: 'Celebratory animation effects', 
            variants: 17 
          },
          { 
            name: 'Counter', 
            slug: 'counter', 
            image: '/images/components/counter.webp', 
            description: 'Numeric increment/decrement controls', 
            variants: 20 
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
            variants: 20 
          },
          { 
            name: 'Editable', 
            slug: 'editable', 
            image: '/images/components/editable.webp', 
            description: 'Inline text editing components', 
            variants: 20 
          },
          { 
            name: 'File Input', 
            slug: 'fileinput', 
            image: '/images/components/fileinput.webp', 
            description: 'File upload controls', 
            variants: 20 
          },
          { 
            name: 'Input Field', 
            slug: 'inputfield', 
            image: '/images/components/inputfield.webp', 
            description: 'Text input form elements', 
            variants: 14 
          },
          { 
            name: 'Input Mask', 
            slug: 'inputmask', 
            image: '/images/components/inputmask.webp', 
            description: 'Formatted input with masking', 
            variants: 15 
          },
          { 
            name: 'Label', 
            slug: 'label', 
            image: '/images/components/label.webp', 
            description: 'Text labeling and annotation', 
            variants: 30 
          },
          { 
            name: 'Link', 
            slug: 'link', 
            image: '/images/components/link.webp', 
            description: 'Navigation and action links', 
            variants: 3 
          },
          { 
            name: 'List Group', 
            slug: 'listgroup', 
            image: '/images/components/listgroup.webp', 
            description: 'Grouped list items and selections', 
            variants: 20 
          },
          { 
            name: 'Loader', 
            slug: 'loader', 
            image: '/images/components/loader.webp', 
            description: 'Loading and progress indicators', 
            variants: 20 
          },
          { 
            name: 'Menu Bar', 
            slug: 'menubar', 
            image: '/images/components/menubar.webp', 
            description: 'Navigation and action menus', 
            variants: 20 
          },
          { 
            name: 'OTP Field', 
            slug: 'otpfield', 
            image: '/images/components/otpfield.webp', 
            description: 'One-time password input fields', 
            variants: 20 
          },
          { 
            name: 'Password Input', 
            slug: 'passwordinput', 
            image: '/images/components/passwordinput.webp', 
            description: 'Secure password entry fields', 
            variants: 20 
          },
          { 
            name: 'Popup', 
            slug: 'popup', 
            image: '/images/components/popup.webp', 
            description: 'Contextual overlays and tooltips', 
            variants: 20 
          },
          { 
            name: 'Progress Bar', 
            slug: 'progressbar', 
            image: '/images/components/progressbar.webp', 
            description: 'Linear progress indicators', 
            variants: 25 
          },
          { 
            name: 'Radio Group', 
            slug: 'radiogroup', 
            image: '/images/components/radiogroup.webp', 
            description: 'Single selection controls', 
            variants: 20 
          },
          { 
            name: 'Range Slider', 
            slug: 'rangeslider', 
            image: '/images/components/rangeslider.webp', 
            description: 'Value range selection controls', 
            variants: 5 
          },
          { 
            name: 'Rating', 
            slug: 'rating', 
            image: '/images/components/rating.webp', 
            description: 'Star rating and feedback', 
            variants: 20 
          },
          { 
            name: 'Scroll Area', 
            slug: 'scrollarea', 
            image: '/images/components/scrollarea.webp', 
            description: 'Custom scrollable containers', 
            variants: 7 
          },
          { 
            name: 'Separator', 
            slug: 'separator', 
            image: '/images/components/separator.webp', 
            description: 'Visual dividers and spacers', 
            variants: 20 
          },
          { 
            name: 'Share', 
            slug: 'share', 
            image: '/images/components/share.webp', 
            description: 'Social sharing buttons and menus', 
            variants: 30 
          },
          { 
            name: 'Sidebar', 
            slug: 'sidebar', 
            image: '/images/components/sidebar.webp', 
            description: 'Side navigation panels', 
            variants: 15 
          },
          { 
            name: 'Skeleton', 
            slug: 'skeleton', 
            image: '/images/components/skeleton.webp', 
            description: 'Loading state placeholders', 
            variants: 20 
          },
          { 
            name: 'Stepped Progress Bar', 
            slug: 'steppedprogressbar', 
            image: '/images/components/steppedprogressbar.webp', 
            description: 'Multi-step progress indicators', 
            variants: 30 
          },
          { 
            name: 'Switch', 
            slug: 'switch', 
            image: '/images/components/switch.webp', 
            description: 'Toggle switches and controls', 
            variants: 30 
          },
          { 
            name: 'Tab', 
            slug: 'tab', 
            image: '/images/components/tab.webp', 
            description: 'Tabbed navigation and content', 
            variants: 20 
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Speed up stagger for mobile
        delayChildren: 0.2
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
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Background */}
      <section className="relative overflow-hidden py-8 sm:py-12">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-800"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="relative inline-block"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 relative">
                  <span className="absolute -inset-3 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 rounded-xl opacity-20 blur-xl animate-pulse"></span>
                  <div className="relative flex flex-col items-center justify-center gap-0">
                    <motion.div 
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center"
                    >
                      <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 animate-pulse hidden xs:inline-block" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 animate-gradient">
                        Multi UI
                      </span>
                      <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 animate-pulse hidden xs:inline-block" />
                    </motion.div>
                    <motion.div 
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "3rem", opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent my-1 sm:my-2 mx-auto"
                    ></motion.div>
                    <motion.span 
                      initial={{ y: 5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide"
                    >
                      Components
                    </motion.span>
                  </div>
                </h1>
              </motion.div>
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto max-w-[280px] sm:max-w-[300px]"
              />
              <p className="mt-3 max-w-xl mx-auto text-base sm:text-lg md:text-xl text-gray-300 px-4 sm:px-0">
                Explore our collection of beautifully designed, ready-to-use components
              </p>
            </motion.div>

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
              /* Add responsive styles for extra small screens */
              @media (max-width: 375px) {
                .xs\:inline-block {
                  display: inline-block;
                }
              }
            `}</style>
          
          {/* Search input */}
            <motion.div 
              className="mt-6 sm:mt-8 max-w-xs sm:max-w-sm md:max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 rounded-lg opacity-30 blur-lg group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <Search className="h-4 w-4 sm:h-5 sm:w-5 text-white/70 hover:text-white transition-colors" />
                    </motion.div>
                  </div>
                  <input
                    type="text"
                    className="block w-full bg-gray-800/90 backdrop-blur-sm text-white rounded-lg pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 border-2 border-gray-600/50 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
                    placeholder="Search components..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center pointer-events-none">
                    <div className="hidden sm:flex items-center space-x-1 text-gray-400 bg-gray-700/50 rounded-md px-2 py-1 text-sm">
                      <Command className="h-3 w-3" />
                      <span>K</span>
                    </div>
                  </div>
                </div>
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: searchTerm ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Components Grid */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div 
              className="grid grid-cols-1 gap-4 sm:gap-6 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
          >
            {filteredComponents.map((component) => (
                <motion.div 
                  key={component.slug} 
                  variants={itemVariants}
                  whileHover={{ y: -5, filter: "drop-shadow(0px 10px 25px rgba(0,0,0,0.3))" }}
                >
                <Link 
                  href={`/components/${component.slug}`}
                  className="block h-full"
                >
                    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden h-full transition-all duration-300 hover:border-blue-500">
                      <div className="relative h-32 xs:h-36 sm:h-40 md:h-48 w-full bg-gray-900 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-gradient-to-r from-blue-600 to-purple-600 absolute inset-0 opacity-80"></div>
                          <Layers className="relative z-10 h-12 w-12 sm:h-16 sm:w-16 text-white opacity-80" />
                        </div>
                      </div>
                      <div className="p-3 sm:p-5">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">
                          {component.name}
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
                          {component.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="bg-blue-900/30 px-2 sm:px-3 py-1 rounded-full text-xs text-blue-400 font-medium flex items-center">
                            <Zap className="h-3 w-3 mr-1" />
                            {component.variants} variants
                          </div>
                          <span className="text-blue-400 text-xs sm:text-sm">View details →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
            ))}
          </motion.div>
        )}
          
          {filteredComponents.length === 0 && !loading && (
            <div className="text-center py-12 sm:py-20">
              <Package className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-600 mb-4" />
              <h3 className="text-lg sm:text-xl font-medium text-gray-300 mb-2">No components found</h3>
              <p className="text-sm sm:text-base text-gray-400">Try a different search term</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 