"use client";

import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles } from 'lucide-react';

interface ChatBotProps {
  componentName: string;
  variantId: string;
  onCustomizationComplete: (code: string) => void;
}

export default function ChatBot({ componentName, variantId, onCustomizationComplete }: ChatBotProps) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ type: 'user' | 'bot'; content: string }>>([
    {
      type: 'bot',
      content: `Hi! I can help you customize the ${componentName} component (Variant ${variantId}). What would you like to change?`
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = message;
    setChatHistory(prev => [...prev, { type: 'user', content: userMessage }]);
    setMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        type: 'bot',
        content: `I understand you want to customize the ${componentName}. I'm working on implementing this feature. For now, you can modify the component code directly or check our documentation for customization guidelines.`
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700">
      {/* Chat history */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-200'
              }`}
            >
              {msg.type === 'bot' && (
                <div className="flex items-center mb-1">
                  <Sparkles className="h-4 w-4 text-blue-400 mr-2" />
                  <span className="text-xs font-medium text-blue-400">AI Assistant</span>
                </div>
              )}
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Message input */}
      <div className="border-t border-gray-700 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your customization request..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-lg px-4 py-2 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
} 