import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onSearch: () => void;
  onEscape: () => void;
}

export function useKeyboardShortcuts({ onSearch, onEscape }: KeyboardShortcutsProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // Search shortcut (/)
      if (event.key === '/' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        onSearch();
      }

      // Escape shortcut
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscape();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSearch, onEscape]);
} 