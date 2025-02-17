 'use client';

import { useState, useRef, useEffect } from 'react';
import Checkbox from '../_components/Checkbox_1';

export default function KeyboardNavigationExample() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const checkboxRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusIndex, setFocusIndex] = useState(0);

  const items = [
    { id: 1, label: 'Item 1' },
    { id: 2, label: 'Item 2' },
    { id: 3, label: 'Item 3' },
    { id: 4, label: 'Item 4' },
    { id: 5, label: 'Item 5' },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName !== 'INPUT') return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusIndex(prev => (prev + 1) % items.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusIndex(prev => (prev - 1 + items.length) % items.length);
          break;
        case 'a':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setSelectedItems(items.map(item => item.id));
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items.length]);

  useEffect(() => {
    checkboxRefs.current[focusIndex]?.focus();
  }, [focusIndex]);

  const toggleItem = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-terminal-text/70">
        Use arrow keys to navigate, space to toggle, and Ctrl/Cmd + A to select all
      </p>
      <div className="space-y-2 border rounded-lg p-4 bg-terminal-bg/50">
        {items.map((item, index) => (
          <Checkbox
            key={item.id}
            ref={el => { checkboxRefs.current[index] = el }}
            checked={selectedItems.includes(item.id)}
            onChange={() => toggleItem(item.id)}
            label={item.label}
            description={`Press space to ${selectedItems.includes(item.id) ? 'uncheck' : 'check'}`}
          />
        ))}
      </div>
      <div className="text-sm text-terminal-text/70">
        Selected: {selectedItems.length ? selectedItems.map(id => `Item ${id}`).join(', ') : 'None'}
      </div>
    </div>
  );
}