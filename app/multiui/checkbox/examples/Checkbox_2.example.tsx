'use client';

import Checkbox from '../_components/Checkbox_1';

export default function CheckboxWithDescriptionExample() {
  return (
    <div className="space-y-4">
      <Checkbox 
        label="Marketing emails"
        description="Receive emails about new products, features, and more."
      />
      <Checkbox 
        label="Security updates"
        description="Get notified about security updates and privacy policy changes."
        defaultChecked
      />
    </div>
  );
} 