'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Command } from 'cmdk';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ChevronRight, X } from 'lucide-react';
import { getAllComponents, getComponent, searchComponents, getInstallationInstructions } from '../utils/components';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useCommandSuggestions } from '../hooks/useCommandSuggestions';

interface CommandOutput {
  id: string;
  type: 'success' | 'error' | 'info' | 'command';
  content: string | React.ReactNode;
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const suggestions = useCommandSuggestions(input);

  const initialMessage: CommandOutput = {
    id: 'welcome',
    type: 'info',
    content: (
      <div className="space-y-1">
        <p className="text-terminal-accent">Welcome to Multi-UI Terminal</p>
        <p className="text-terminal-text">Type <span className="text-terminal-command">help</span> to see available commands</p>
        <p className="text-terminal-text text-sm">Press <kbd className="px-1 py-0.5 bg-terminal-border rounded">/</kbd> to focus input, <kbd className="px-1 py-0.5 bg-terminal-border rounded">Esc</kbd> to clear</p>
      </div>
    ),
  };

  useEffect(() => {
    setHistory([initialMessage]);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useKeyboardShortcuts({
    onSearch: () => inputRef.current?.focus(),
    onEscape: () => {
      setInput('');
      inputRef.current?.blur();
    },
  });

  const handleCommand = (value: string) => {
    const command = value.trim().toLowerCase();
    const [cmd, ...args] = command.split(' ');
    
    if (!command) return;

    let output: CommandOutput = {
      id: Date.now().toString(),
      type: 'success',
      content: 'Command not recognized. Type "help" for available commands.',
    };

    switch (cmd) {
      case 'help':
        output = {
          id: Date.now().toString(),
          type: 'info',
          content: (
            <div className="space-y-1">
              <p className="text-terminal-command">Available commands:</p>
              <p>help - Show this help message</p>
              <p>clear - Clear terminal</p>
              <p>components - List all available components</p>
              <p>view [component] - View component details</p>
              <p>install [component] - Show installation instructions</p>
              <p>search [query] - Search for components</p>
            </div>
          ),
        };
        break;

      case 'clear':
        setHistory([initialMessage]);
        setInput('');
        return;

      case 'components':
        const allComponents = getAllComponents();
        output = {
          id: Date.now().toString(),
          type: 'info',
          content: (
            <div className="space-y-2">
              <p className="text-terminal-accent">Available Components:</p>
              {allComponents.map(comp => (
                <div key={comp.name} className="pl-2">
                  <p className="text-terminal-text">{comp.name} - {comp.description}</p>
                </div>
              ))}
            </div>
          ),
        };
        break;

      case 'view':
        if (args.length === 0) {
          output = {
            id: Date.now().toString(),
            type: 'error',
            content: 'Please specify a component name.',
          };
        } else {
          const component = getComponent(args[0]);
          if (component) {
            output = {
              id: Date.now().toString(),
              type: 'info',
              content: (
                <div className="space-y-4">
                  <div>
                    <p className="text-terminal-accent text-lg">{component.name}</p>
                    <p className="text-terminal-text">{component.description}</p>
                  </div>
                  <div>
                    <p className="text-terminal-command">Usage:</p>
                    <pre className="bg-terminal-border p-4 rounded-lg mt-2 overflow-x-auto">
                      <code>{component.usage}</code>
                    </pre>
                  </div>
                </div>
              ),
            };
          } else {
            output = {
              id: Date.now().toString(),
              type: 'error',
              content: `Component "${args[0]}" not found.`,
            };
          }
        }
        break;

      case 'install':
        if (args.length === 0) {
          output = {
            id: Date.now().toString(),
            type: 'error',
            content: 'Please specify a component name.',
          };
        } else {
          const instructions = getInstallationInstructions(args[0]);
          if (instructions) {
            output = {
              id: Date.now().toString(),
              type: 'info',
              content: (
                <div className="space-y-2">
                  <p className="text-terminal-command">Installation:</p>
                  <pre className="bg-terminal-border p-4 rounded-lg mt-2">
                    <code>{instructions}</code>
                  </pre>
                  <button
                    onClick={() => navigator.clipboard.writeText(instructions)}
                    className="mt-2 px-3 py-1 text-sm bg-terminal-border hover:bg-terminal-muted rounded transition-colors"
                  >
                    Copy to clipboard
                  </button>
                </div>
              ),
            };
          } else {
            output = {
              id: Date.now().toString(),
              type: 'error',
              content: `Component "${args[0]}" not found.`,
            };
          }
        }
        break;

      case 'search':
        if (args.length === 0) {
          output = {
            id: Date.now().toString(),
            type: 'error',
            content: 'Please provide a search query.',
          };
        } else {
          const results = searchComponents(args.join(' '));
          output = {
            id: Date.now().toString(),
            type: 'info',
            content: (
              <div className="space-y-2">
                <p className="text-terminal-accent">Search Results:</p>
                {results.length > 0 ? (
                  results.map(comp => (
                    <div key={comp.name} className="pl-2">
                      <p className="text-terminal-text">{comp.name} - {comp.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-terminal-error">No components found matching &quot;{args.join(' ')}&quot;</p>
                )}
              </div>
            ),
          };
        }
        break;
    }

    setHistory(prev => [...prev, {
      id: Date.now().toString(),
      type: 'command',
      content: `$ ${command}`,
    }, output]);
    setInput('');
  };

  return (
    <div className="w-full h-full bg-terminal-bg text-terminal-text font-mono p-4 rounded-lg border border-terminal-border">
      <ScrollArea className="h-full">
        <div className="space-y-4">
          {history.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${
                item.type === 'error' ? 'text-terminal-error' :
                item.type === 'command' ? 'text-terminal-command' :
                'text-terminal-text'
              }`}
            >
              {item.content}
            </motion.div>
          ))}
          
          <div className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-terminal-accent" />
            <Command className="flex-1 relative">
              <Command.Input
                ref={inputRef}
                value={input}
                onValueChange={setInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCommand(input);
                  } else if (e.key === 'Tab' && suggestions.length > 0) {
                    e.preventDefault();
                    setInput(suggestions[0]);
                  }
                }}
                className="w-full bg-transparent outline-none"
                placeholder="Type a command..."
              />
              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 bottom-full mb-2 bg-terminal-border rounded-lg overflow-hidden">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion}
                      className={`w-full px-3 py-2 text-left hover:bg-terminal-muted transition-colors ${
                        index === 0 ? 'bg-terminal-muted' : ''
                      }`}
                      onClick={() => {
                        setInput(suggestion);
                        inputRef.current?.focus();
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </Command>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-2 h-5 bg-terminal-accent"
            />
          </div>
        </div>
        <div ref={terminalEndRef} />
      </ScrollArea>
    </div>
  );
} 