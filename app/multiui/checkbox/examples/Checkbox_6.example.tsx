'use client';

import { useState } from 'react';
import Checkbox from '../_components/Checkbox_6';

export default function CustomStyledCheckboxExample() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = (option: string) => (checked: boolean) => {
    setSelectedOptions(prev => 
      checked
        ? [...prev, option]
        : prev.filter(item => item !== option)
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg border-2 transition-colors
          ${selectedOptions.includes('option1')
            ? 'border-terminal-accent bg-terminal-accent/10'
            : 'border-terminal-border hover:border-terminal-accent/50'}`}
        >
          <div className="flex items-center gap-3">
            <Checkbox 
              value={selectedOptions.includes('option1')}
              onChange={handleOptionChange('option1')}
            />
            <div>
              <h3 className="font-medium">Professional Plan</h3>
              <p className="text-sm text-terminal-text/70">Perfect for small teams</p>
            </div>
          </div>
        </div>
        <div className={`p-4 rounded-lg border-2 transition-colors
          ${selectedOptions.includes('option2')
            ? 'border-terminal-accent bg-terminal-accent/10'
            : 'border-terminal-border hover:border-terminal-accent/50'}`}
        >
          <div className="flex items-center gap-3">
            <Checkbox 
              value={selectedOptions.includes('option2')}
              onChange={handleOptionChange('option2')}
            />
            <div>
              <h3 className="font-medium">Enterprise Plan</h3>
              <p className="text-sm text-terminal-text/70">For larger organizations</p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-terminal-text/70">
        Selected: {selectedOptions.length ? selectedOptions.join(', ') : 'None'}
      </p>
    </div>
  );
}