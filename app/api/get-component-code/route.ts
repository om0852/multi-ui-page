import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const component = searchParams.get('component');
    const variant = searchParams.get('variant');

    if (!component || !variant) {
      return NextResponse.json(
        { error: 'Component and variant are required' },
        { status: 400 }
      );
    }

    // Construct the path to the component file
    const filePath = path.join(
      process.cwd(),
      'multiui',
      component.toLowerCase(),
      '_components',
      `${component}_${variant}.tsx`
    );

    try {
      // Read the component file
      const code = await fs.readFile(filePath, 'utf-8');
      
      return NextResponse.json({
        code,
        component,
        variant
      });
    } catch (error) {
      console.error(`Error reading component file: ${filePath}`, error);
      return NextResponse.json(
        { error: 'Component file not found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to fetch component code' },
      { status: 500 }
    );
  }
} 