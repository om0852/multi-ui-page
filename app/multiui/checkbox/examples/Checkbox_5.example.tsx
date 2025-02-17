'use client';

import { useState } from 'react';
import Checkbox from '../_components/Checkbox_5';

export default function ValidationCheckboxExample() {
  const [accepted, setAccepted] = useState(false);
  const [optional, setOptional] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Checkbox 
          value={accepted}
          onChange={setAccepted}
        />
        <span className="text-sm text-terminal-text">
          Accept terms and conditions
          {!accepted && (
            <span className="text-terminal-error ml-2">
              Required
            </span>
          )}
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Checkbox 
          value={optional}
          onChange={setOptional}
        />
        <span className="text-sm text-terminal-text">Optional checkbox</span>
      </div>
    </div>
  );
} 