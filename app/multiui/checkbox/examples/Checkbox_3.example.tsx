'use client';

import { useState } from 'react';
import Checkbox from '../_components/Checkbox_3';

export default function IndeterminateCheckboxExample() {
  const [parentChecked, setParentChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);
  const [children, setChildren] = useState({
    item1: true,
    item2: false,
    item3: true
  });

  const handleParentChange = (checked: boolean) => {
    setParentChecked(checked);
    setIndeterminate(false);
    setChildren({
      item1: checked,
      item2: checked,
      item3: checked
    });
  };

  const handleChildChange = (key: keyof typeof children) => (checked: boolean) => {
    const newChildren = { ...children, [key]: checked };
    setChildren(newChildren);
    
    const checkedCount = Object.values(newChildren).filter(Boolean).length;
    setParentChecked(checkedCount === Object.keys(newChildren).length);
    setIndeterminate(checkedCount > 0 && checkedCount < Object.keys(newChildren).length);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Checkbox 
          value={parentChecked}
          onChange={handleParentChange}
        />
        <span className="text-sm text-terminal-text">Select all items</span>
      </div>
      <div className="ml-6 space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox 
            value={children.item1}
            onChange={handleChildChange('item1')}
          />
          <span className="text-sm text-terminal-text">Item 1</span>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox 
            value={children.item2}
            onChange={handleChildChange('item2')}
          />
          <span className="text-sm text-terminal-text">Item 2</span>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox 
            value={children.item3}
            onChange={handleChildChange('item3')}
          />
          <span className="text-sm text-terminal-text">Item 3</span>
        </div>
      </div>
    </div>
  );
} 