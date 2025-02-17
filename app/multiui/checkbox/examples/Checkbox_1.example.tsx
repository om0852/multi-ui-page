'use client';

import { useState } from 'react';
import Checkbox from '../_components/Checkbox_1';

export default function BasicCheckboxExample() {
  const [checked, setChecked] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  return (
    <div className="flex flex-col gap-4">
      <Checkbox 
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        label="Accept terms and conditions"
      />
      <Checkbox 
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
        label="Remember me"
      />
    </div>
  );
} 