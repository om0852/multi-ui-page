'use client';

import { useState } from 'react';
import Checkbox from '../_components/Checkbox_1';

export default function LoadingCheckboxExample() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess(e.target.checked);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Checkbox 
          checked={success}
          onChange={handleChange}
          disabled={loading}
          label="Save changes"
        />
        {loading && (
          <div className="animate-spin h-4 w-4 border-2 border-terminal-accent border-t-transparent rounded-full" />
        )}
      </div>
      <p className="text-sm text-terminal-text/70">
        {loading ? 'Saving changes...' : 
         success ? 'Changes saved successfully!' : 
         'Click to save changes'}
      </p>
    </div>
  );
} 