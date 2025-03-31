import { useState, useEffect } from 'react';
import { getAllComponents } from '../utils/components';

const BASE_COMMANDS = [
  'help',
  'clear',
  'components',
  'view',
  'install',
  'search',
];

export function useCommandSuggestions(input: string) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    const inputParts = input.toLowerCase().split(' ');
    const command = inputParts[0];
    const arg = inputParts[1] || '';

    // Suggest base commands
    if (inputParts.length === 1) {
      const matchingCommands = BASE_COMMANDS.filter(cmd => 
        cmd.toLowerCase().startsWith(command)
      );
      setSuggestions(matchingCommands);
      return;
    }

    // Suggest component names for 'view', 'install' commands
    if ((command === 'view' || command === 'install') && inputParts.length === 2) {
      const fetchAndFilterComponents = async () => {
        const components = await getAllComponents();
        const matchingComponents = components
          .filter(comp => comp.name.toLowerCase().startsWith(arg))
          .map(comp => `${command} ${comp.name}`);
        setSuggestions(matchingComponents);
      };
      fetchAndFilterComponents();
      return;
    }

    setSuggestions([]);
  }, [input]);

  return suggestions;
} 