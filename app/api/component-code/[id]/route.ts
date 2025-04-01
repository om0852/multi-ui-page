import { NextResponse } from 'next/server';
import { getCustomizationById } from '../../../../lib/mongoose';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    
    if (!id || !id.startsWith('Component-')) {
      return NextResponse.json(
        { error: 'Invalid component ID format' },
        { status: 400 }
      );
    }
    
    // Extract the actual MongoDB ID
    const customizationId = id.replace('Component-', '');
    
    // Fetch the customization from MongoDB
    const customization = await getCustomizationById(customizationId);
    
    if (!customization) {
      return NextResponse.json(
        { 
          error: 'Component not found or has expired',
          message: 'Customized components are only available for 30 minutes after creation.'
        },
        { status: 404 }
      );
    }
    
    // Return the component code
    return NextResponse.json({
      componentName: customization.componentName,
      variantId: customization.variantId,
      code: customization.generatedCode,
      created: customization.timestamp,
    });
  } catch (error) {
    console.error('Error retrieving component code:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve component code' },
      { status: 500 }
    );
  }
} 