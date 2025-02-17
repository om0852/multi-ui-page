'use client';

import Checkbox from '../_components/Checkbox_4';

export default function DisabledCheckboxExample() {
  return (
    <div className="space-y-4">
      <Checkbox 
        disabled
        value={false}
      />
      <Checkbox 
        disabled
        value={true}
      />
      <Checkbox 
        disabled
        value={false}
      />
    </div>
  );
} 