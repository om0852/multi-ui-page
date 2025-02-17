'use client';

import { useState } from 'react';
import Checkbox from '../_components/Checkbox_1';

export default function ColorVariantsExample() {
  const [selected, setSelected] = useState<string[]>([]);

  const colors = {
    default: 'checked:bg-terminal-accent checked:border-terminal-accent',
    success: 'checked:bg-terminal-command checked:border-terminal-command',
    warning: 'checked:bg-yellow-500 checked:border-yellow-500',
    error: 'checked:bg-terminal-error checked:border-terminal-error',
    info: 'checked:bg-blue-500 checked:border-blue-500'
  };

  const handleToggle = (color: string) => {
    setSelected(prev => 
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  return (
    <div className="space-y-6">
      {Object.entries(colors).map(([color, className]) => (
        <Checkbox 
          key={color}
          checked={selected.includes(color)}
          onChange={() => handleToggle(color)}
          label={`${color.charAt(0).toUpperCase()}${color.slice(1)} variant`}
          className={className}
        />
      ))}
      <p className="text-sm text-terminal-text/70">
        Selected colors: {selected.length ? selected.join(', ') : 'none'}
      </p>
    </div>
  );
} 