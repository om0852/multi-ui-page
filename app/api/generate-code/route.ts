import { NextResponse } from 'next/server';

const API_KEY = 'AIzaSyA4PExnmF9w-JWhcvZdfZA8fw-aLOsOwVM';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
console.log(prompt);
    // Format the prompt with instructions
    const promptText = `You are a React component expert. Generate a React component based on this request: ${prompt}
Rules:
- Only provide the code, no explanations
- Include necessary imports
- Use TypeScript and modern React practices
- Include proper types and interfaces
- Make it responsive and accessible
- Use Tailwind CSS for styling`;

    // Make request to Gemini API with correct format
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: promptText
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
          topP: 0.8,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'API request failed');
    }

    const result = await response.json();
    let generatedContent = result.candidates[0].content.parts[0].text;

    // Clean up the generated code
    if (!generatedContent.includes('import React')) {
      generatedContent = `import React from 'react';\n${generatedContent}`;
    }

    // Remove any markdown code block syntax if present
    generatedContent = generatedContent
      .replace(/```(jsx|tsx|javascript|js|typescript|ts)?\n?/g, '')
      .replace(/```\n?$/g, '')
      .trim();

    return NextResponse.json({ content: generatedContent });
  } catch (error) {
    console.error('Error:', error);
    
    // More detailed error message for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        error: 'Failed to generate code. Please try again.',
        details: errorMessage 
      },
      { status: 500 }
    );
  }
} 