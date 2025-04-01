import { NextResponse } from 'next/server';
import { storeCustomization } from '../../../lib/mongoose';

// This is a placeholder for your database connection
// You would typically use a proper database like MongoDB, PostgreSQL, etc.
let customizations: any[] = [];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.componentName || !data.variantId || !data.generatedCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store in MongoDB with auto-expiration using Mongoose
    const customizationId = await storeCustomization({
      componentName: data.componentName,
      variantId: data.variantId,
      userInput: data.userInput,
      generatedCode: data.generatedCode,
      timestamp: new Date(data.timestamp) || new Date(),
    });

    // Generate the command for later use
    const installCommand = `npx multi-ui add ${customizationId} [filename]`;

    // Return success response with the command
    return NextResponse.json({
      message: 'Customization stored successfully',
      customizationId,
      installCommand,
      expiresIn: '30 minutes'
    });
  } catch (error) {
    console.error('Error storing customization:', error);
    return NextResponse.json(
      { error: 'Failed to store customization' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // In a real application, you would fetch this from a database
    return NextResponse.json({ customizations });
  } catch (error) {
    console.error('Error fetching customizations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customizations' },
      { status: 500 }
    );
  }
} 