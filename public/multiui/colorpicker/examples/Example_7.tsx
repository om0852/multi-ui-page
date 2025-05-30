"use client"

import React, { useState } from 'react';
import ColorPicker_7 from '../_components/ColorPicker_7';

export default function Example_7() {
  const [selectedColor, setSelectedColor] = useState('#ec4899');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`p-4 ${darkMode ? "dark" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">RGB/HSL Color Picker</h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <div 
          className="h-32 rounded-lg mb-4"
          style={{ backgroundColor: selectedColor }}
        />
        <ColorPicker_7 
          onChange={setSelectedColor}
        />
      </div>
    </div>
  );
} 