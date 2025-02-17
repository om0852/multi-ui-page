'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  code: string;
}

export function CopyButton({ code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 hover:text-terminal-accent transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="h-4 w-4 text-terminal-command" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  );
} 