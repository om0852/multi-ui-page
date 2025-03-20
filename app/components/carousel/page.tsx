'use client';

import React from 'react';
import ComponentTemplate from '../ComponentTemplate';

// Generate array of variants that actually exist
const generateVariants = () => {
  // Add only the carousel variants that actually exist
  const existingVariants = [
    2, 3, 4, 5, 6, 7, 8, 9,
    12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89,
    93, 94, 95, 96, 97, 98, 99,
    115, 116, 117, 118
  ];
  
  return existingVariants;
};

// Usage example generator function
const getUsageExample = (selectedVariant: number) => {
  return `import Carousel from '@/app/multiui/carousel/_components/Carousel_${selectedVariant}';
                    
// Then use it in your component
<Carousel 
  items={[
    { id: 1, image: '/image1.jpg', caption: 'Slide 1' },
    { id: 2, image: '/image2.jpg', caption: 'Slide 2' },
    { id: 3, image: '/image3.jpg', caption: 'Slide 3' },
  ]}
/>`;
};

// Prop description component
const propDescription = (
  <p>
    The <code className="bg-gray-900 px-2 py-1 rounded text-sm">items</code> prop should be an array of slide objects. Most variants also accept <code className="bg-gray-900 px-2 py-1 rounded text-sm">autoPlay</code>, <code className="bg-gray-900 px-2 py-1 rounded text-sm">interval</code> (in ms), <code className="bg-gray-900 px-2 py-1 rounded text-sm">showIndicators</code>, and <code className="bg-gray-900 px-2 py-1 rounded text-sm">showArrows</code> props.
  </p>
);

export default function CarouselExamplesPage() {
  return (
    <ComponentTemplate
      title="Carousel Components"
      description="Sliding carousel and image gallery components with different transition effects, navigation controls, and responsive layouts."
      componentType="carousel"
      variants={generateVariants()}
      usageExample={getUsageExample}
      propDescription={propDescription}
    />
  );
} 