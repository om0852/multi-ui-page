import React, { useState, useEffect } from 'react';
import CircularProgressBar from '../_components/CircularProgressBar_74';

const Example_74: React.FC = () => {
  const [value, setValue] = useState(50);
  const [max, setMax] = useState(100);
  const [size, setSize] = useState(200);
  const [strokeWidth, setStrokeWidth] = useState(8);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(prevKey => prevKey + 1);
  }, [value, max, size, strokeWidth]);

  return (
    <div className="flex flex-col items-center space-y-8 p-8">
      <div className="w-full max-w-md space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Value: {value}
          </label>
          <input
            type="range"
            min={0}
            max={max}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Maximum: {max}
          </label>
          <input
            type="range"
            min={10}
            max={200}
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Size: {size}px
          </label>
          <input
            type="range"
            min={100}
            max={400}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-600">
            Stroke Width: {strokeWidth}px
          </label>
          <input
            type="range"
            min={2}
            max={20}
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <CircularProgressBar
          key={key}
          value={value}
          max={max}
          size={size}
          strokeWidth={strokeWidth}
        />
      </div>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-purple-600 mb-4">
          Magical Features
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Animated sparkles that dance around the progress ring</li>
          <li>Magical gradient progress ring with shifting colors</li>
          <li>Mystical pattern background with rotating effects</li>
          <li>Dynamic magical core with pulsing animations</li>
          <li>Enchanted percentage display with glowing text</li>
        </ul>
      </div>
    </div>
  );
};

export default Example_74; 