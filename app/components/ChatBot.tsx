"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Code, Copy, Check, Zap, Terminal } from 'lucide-react';

interface Message {
  type: 'user' | 'bot';
  content: string;
  code?: string;
  installCommand?: string;
  customCommand?: string;
}

interface ChatBotProps {
  componentName: string;
  variantId: string;
  onCustomizationComplete?: (code: string) => void;
}

interface CustomizationData {
  componentName: string;
  variantId: string;
  userInput: string;
  generatedCode: string;
  timestamp: Date;
}

// Function to generate code using Puter AI
const generateCustomCode = async (userInput: string, originalCode: string) => {
  try {
    const prompt = `
      You are a React component customization expert. 
      Original code:
      ${originalCode}
      
      User request:
      ${userInput}
      
      Please modify the code according to the user's requirements while maintaining functionality.
      Provide only the modified code without any explanations.
    `;

    const response = await fetch('/api/generate-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate code');
    }

    const data = await response.json();
    return data.content.trim();
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
};

// Function to fetch component code
const fetchComponentCode = async (componentName: string, variantId: string) => {
  try {
    const response = await fetch(`/api/get-component-code?component=${componentName.toLowerCase()}&variant=${variantId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch component code');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching component code:', error);
    throw error;
  }
};

// Function to store customization in database
const storeCustomization = async (data: CustomizationData) => {
  try {
    const response = await fetch('/api/store-customization', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Failed to store customization');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error storing customization:', error);
    throw error;
  }
};

const ChatBot: React.FC<ChatBotProps> = ({ componentName, variantId, onCustomizationComplete }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: `Hi! I'm here to help you customize the ${componentName} component (Variant ${variantId}). What would you like to modify? You can ask about:
      - Styling (colors, sizes, spacing)
      - Animations
      - Props and functionality
      - Event handlers
      - Accessibility features`
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage = { type: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      // Add a typing indicator
      setMessages(prev => [...prev, { type: 'bot', content: '...' }]);

      // Fetch original code
      const { code: originalCode } = await fetchComponentCode(componentName, variantId);
      
      // Generate customized code using Puter AI
      const customizedCode = await generateCustomCode(input, originalCode);
      
      // Store the customization
      const result = await storeCustomization({
        componentName,
        variantId,
        userInput: input,
        generatedCode: customizedCode,
        timestamp: new Date()
      });

      // Remove typing indicator
      setMessages(prev => prev.slice(0, -1));

      // Add the AI response
      const aiResponse = {
        type: 'bot' as const,
        content: 'I\'ve customized the component according to your requirements:',
        code: customizedCode,
        customCommand: result.installCommand
      };

      setMessages(prev => [...prev, aiResponse]);

      if (onCustomizationComplete) {
        onCustomizationComplete(customizedCode);
      }
    } catch (error) {
      // Remove typing indicator
      setMessages(prev => prev.slice(0, -1));
      
      setMessages(prev => [...prev, {
        type: 'bot',
        content: 'Sorry, I encountered an error while customizing the component. Please try again.'
      }]);
      console.error('Error:', error);
    }

    setIsProcessing(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-[350px] sm:h-[500px] bg-gray-900 rounded-lg border border-gray-700">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[80%] rounded-lg p-2 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.content === '...'
                  ? 'bg-gray-800 text-gray-400'
                  : 'bg-gray-800 text-gray-100'
              }`}
            >
              {message.content === '...' ? (
                <div className="flex space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              ) : (
                <>
                  <p className="whitespace-pre-wrap text-xs sm:text-sm">{message.content}</p>
                  
                  {message.code && (
                    <div className="mt-2 bg-gray-900 rounded-md overflow-hidden">
                      <div className="flex items-center justify-between px-2 py-1 bg-gray-800">
                        <div className="flex items-center">
                          <Code className="h-3 w-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-400">Generated Code</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(message.code!)}
                          className="text-gray-400 hover:text-gray-300"
                        >
                          {copied ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                      <pre className="p-2 text-xs overflow-x-auto">
                        <code className="text-gray-300">{message.code}</code>
                      </pre>
                    </div>
                  )}
                  
                  {message.customCommand && (
                    <div className="mt-2 bg-gray-900 rounded-md overflow-hidden">
                      <div className="flex items-center justify-between px-2 py-1 bg-gray-800">
                        <div className="flex items-center">
                          <Terminal className="h-3 w-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-400">Installation Command</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(message.customCommand!)}
                          className="text-gray-400 hover:text-gray-300"
                        >
                          {copied ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                      <pre className="p-2 text-xs overflow-x-auto">
                        <code className="text-gray-300 whitespace-nowrap">{message.customCommand}</code>
                      </pre>
                      <p className="text-xs text-gray-400 p-1.5 border-t border-gray-700 text-[10px] sm:text-xs">
                        Command valid for 30 minutes
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-2 sm:p-3 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe customization..."
            className="flex-1 bg-gray-800 text-white text-xs sm:text-sm rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing}
            className={`px-2 py-1.5 rounded-lg bg-blue-600 text-white flex items-center ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isProcessing ? (
              <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot; 