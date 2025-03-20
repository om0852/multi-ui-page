"use client"

import React, { useState } from 'react';
import Clipboard from '../_components/Clipboard_84';
import { FaSun, FaMoon, FaCube, FaSquare, FaArrowRotateRight, FaPalette, FaCircleDot } from 'react-icons/fa6';

const Example_84: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);

  const clipboardExamples = [
    {
      text: "3D cube clipboard",
      onCopy: () => console.log("Copied: 3D cube clipboard")
    },
    {
      text: "Rotating faces example",
      onCopy: () => console.log("Copied: Rotating faces example")
    },
    {
      text: "Glowing edges demo",
      onCopy: () => console.log("Copied: Glowing edges demo")
    },
    {
      text: "Geometric animation button",
      onCopy: () => console.log("Copied: Geometric animation button")
    }
  ];

  return (
    <div className={`min-h-screen p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-800'}`}
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">3D Cube Clipboard</h1>
          <p className="text-lg opacity-80">
            A geometric clipboard component featuring a rotating 3D cube with glowing edges and pulsing corner points.
            Hover over the buttons to reveal the cube animation effect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {clipboardExamples.map((example, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
            >
              <Clipboard text={example.text} onCopy={example.onCopy} />
            </div>
          ))}
        </div>

        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-white'} shadow-lg mb-8`}>
          <h2 className="text-2xl font-bold mb-4">3D Cube Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-center gap-3">
              <span className="text-sky-500"><FaCube /></span>
              <span>Rotating 3D cube animation</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-sky-400"><FaSquare /></span>
              <span>Transparent cube faces</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-sky-500"><FaArrowRotateRight /></span>
              <span>Rotating icon animation</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-sky-400"><FaPalette /></span>
              <span>Sky blue cube color scheme</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-sky-500"><FaCircleDot /></span>
              <span>Pulsing corner point effects</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Example_84; 