'use client';

import { useState } from 'react';
import Checkbox from '../_components/Checkbox_1';

interface FormData {
  newsletter: boolean;
  updates: boolean;
  terms: boolean;
}

export default function FormIntegrationExample() {
  const [formData, setFormData] = useState<FormData>({
    newsletter: false,
    updates: false,
    terms: false
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};

    // Validate terms
    if (!formData.terms) {
      newErrors.terms = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    setSubmitted(true);
    setErrors({});
  };

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.checked
    }));
    // Clear error when field is checked
    if (e.target.checked && errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  if (submitted) {
    return (
      <div className="p-4 rounded-lg bg-terminal-command/20 border border-terminal-command text-terminal-command">
        Form submitted successfully! Thank you for signing up.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Checkbox 
          checked={formData.newsletter}
          onChange={handleChange('newsletter')}
          label="Subscribe to newsletter"
          description="Get weekly updates about new features"
        />
        <Checkbox 
          checked={formData.updates}
          onChange={handleChange('updates')}
          label="Receive product updates"
          description="Be the first to know about new releases"
        />
        <Checkbox 
          checked={formData.terms}
          onChange={handleChange('terms')}
          label="Accept terms and conditions"
          error={errors.terms ? "You must accept the terms to continue" : undefined}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-terminal-accent text-white rounded-md hover:bg-terminal-accent/90 transition-colors"
      >
        Submit
      </button>
    </form>
  );
} 