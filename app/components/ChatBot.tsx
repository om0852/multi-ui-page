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
      - Accessibility features
      - State management
      - Performance optimizations`
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
    <div className="flex flex-col h-[600px] bg-gray-900 rounded-lg border border-gray-700">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.content === '...'
                  ? 'bg-gray-800 text-gray-400'
                  : 'bg-gray-800 text-gray-100'
              }`}
            >
              {message.content === '...' ? (
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              ) : (
                <>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  
                  {message.code && (
                    <div className="mt-3 bg-gray-900 rounded-md overflow-hidden">
                      <div className="flex items-center justify-between px-3 py-2 bg-gray-800">
                        <div className="flex items-center">
                          <Code className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-400">Generated Code</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(message.code!)}
                          className="text-gray-400 hover:text-gray-300"
                        >
                          {copied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <pre className="p-3 text-sm overflow-x-auto">
                        <code className="text-gray-300">{message.code}</code>
                      </pre>
                    </div>
                  )}
                  
                  {message.customCommand && (
                    <div className="mt-2 bg-gray-900 rounded-md overflow-hidden">
                      <div className="flex items-center justify-between px-3 py-2 bg-gray-800">
                        <div className="flex items-center">
                          <Terminal className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-400">Installation Command</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(message.customCommand!)}
                          className="text-gray-400 hover:text-gray-300"
                        >
                          {copied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <pre className="p-3 text-sm">
                        <code className="text-gray-300">{message.customCommand}</code>
                      </pre>
                      <p className="text-xs text-gray-400 p-2 border-t border-gray-700">
                        This command will be valid for 30 minutes. Use it to add the customized component to your project.
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
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe how you want to customize the component..."
            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing}
            className={`px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center ${
              isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isProcessing ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot; 