"use client";
import React, { useState, useEffect } from 'react';
import CircularProgressBar from '../_components/CircularProgressBar_19';

const Example_19 = () => {
  const [value, setValue] = useState(50);
  const [max, setMax] = useState(100);
  const [key, setKey] = useState(0);
  const [size, setSize] = useState(200);
  const [strokeWidth, setStrokeWidth] = useState(12);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [value, max, size, strokeWidth]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMax(parseInt(e.target.value));
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(parseInt(e.target.value));
  };

  const handleStrokeWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrokeWidth(parseInt(e.target.value));
  };

  const percentage = (value / max) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-blue-400">3D Metallic Progress Ring</h1>
      
      <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl flex flex-col items-center border border-gray-700/30">
        <div key={key} className="relative">
          <CircularProgressBar 
            value={value}
            max={max}
            size={size}
            strokeWidth={strokeWidth}
          />
        </div>
        
        <div className="mt-8 w-full max-w-md space-y-4">
          <div>
            <label htmlFor="value-slider" className="block text-sm font-medium text-blue-300 mb-2">
              Value: {value} ({percentage.toFixed(1)}%)
            </label>
            <input 
              id="value-slider"
              type="range" 
              min="0" 
              max={max} 
              value={value} 
              onChange={handleValueChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          <div>
            <label htmlFor="max-slider" className="block text-sm font-medium text-blue-300 mb-2">
              Maximum Value: {max}
            </label>
            <input 
              id="max-slider"
              type="range" 
              min="50" 
              max="200" 
              value={max} 
              onChange={handleMaxChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label htmlFor="size-slider" className="block text-sm font-medium text-blue-300 mb-2">
              Size: {size}px
            </label>
            <input 
              id="size-slider"
              type="range" 
              min="100" 
              max="400" 
              value={size} 
              onChange={handleSizeChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <label htmlFor="stroke-width" className="block text-sm font-medium text-blue-300 mb-2">
              Ring Thickness: {strokeWidth}px
            </label>
            <input 
              id="stroke-width"
              type="range" 
              min="6" 
              max="24" 
              value={strokeWidth} 
              onChange={handleStrokeWidthChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl w-full max-w-md border border-gray-700/30">
        <h2 className="text-lg font-semibold mb-4 text-blue-400">Features</h2>
        <ul className="list-disc pl-5 space-y-2 text-blue-300">
          <li>3D perspective transform effect</li>
          <li>Metallic gradient background</li>
          <li>Blue glow progress indicator</li>
          <li>Rotating highlight animation</li>
          <li>Spring-animated center display</li>
        </ul>
      </div>
    </div>
  );
};

export default Example_19; 