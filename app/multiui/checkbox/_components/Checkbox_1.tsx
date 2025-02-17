"use client";

import { forwardRef } from 'react';
import { Check, Minus } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  indeterminate?: boolean;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  className = '',
  label,
  description,
  indeterminate = false,
  error,
  disabled,
  ...props
}, ref) => {
  const baseStyles = "peer h-4 w-4 shrink-0 rounded border border-terminal-border bg-terminal-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terminal-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  const checkedStyles = "checked:bg-terminal-accent checked:border-terminal-accent";
  const hoverStyles = "hover:border-terminal-accent/50";
  const errorStyles = error ? "border-terminal-error" : "";

  return (
    <div className="flex gap-2">
      <div className="relative flex h-5 items-center">
        <input
          type="checkbox"
          ref={ref}
          className={`${baseStyles} ${checkedStyles} ${hoverStyles} ${errorStyles} ${className}`}
          disabled={disabled}
          {...props}
        />
        {/* Custom checkbox icons */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {props.checked && !indeterminate && (
            <Check className="h-3 w-3 text-white stroke-[3]" />
          )}
          {indeterminate && (
            <Minus className="h-3 w-3 text-white stroke-[3]" />
          )}
        </div>
      </div>
      {(label || description) && (
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={props.id}
              className={`text-sm font-medium ${disabled ? 'opacity-50' : ''} ${error ? 'text-terminal-error' : 'text-terminal-text'}`}
            >
              {label}
            </label>
          )}
          {description && (
            <p className={`text-sm ${disabled ? 'opacity-50' : ''} text-terminal-text/70`}>
              {description}
            </p>
          )}
          {error && (
            <p className="text-sm text-terminal-error">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
