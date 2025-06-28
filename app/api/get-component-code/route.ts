import { NextResponse } from 'next/server';

// Base URL for raw GitHub content
const GITHUB_RAW_BASE_URL = 'https://raw.githubusercontent.com/om0852/multi-ui/main/app';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const component = searchParams.get('component')?.toLowerCase();
    const variant = searchParams.get('variant');

    if (!component || !variant) {
      return NextResponse.json(
        { error: 'Component and variant are required' },
        { status: 400 }
      );
    }

    // Construct the GitHub raw content URL based on the repository structure
    // Example: https://raw.githubusercontent.com/om0852/multi-ui/main/app/accordion/tsx/Accordion_1.tsx
    const githubPath = `${GITHUB_RAW_BASE_URL}/${component}/tsx/${component.charAt(0).toUpperCase() + component.slice(1)}_${variant}.tsx`;

    try {
      // Fetch the component file from GitHub
      const response = await fetch(githubPath);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch component: ${response.statusText}`);
      }

      const code = await response.text();
      
      // Return the component code and metadata
      return NextResponse.json({
        code,
        component,
        variant,
        githubUrl: `https://github.com/om0852/multi-ui/blob/main/app/${component}/tsx/${component.charAt(0).toUpperCase() + component.slice(1)}_${variant}.tsx`
      });
    } catch (error) {
      console.error(`Error fetching component from GitHub: ${githubPath}`, error);
      return NextResponse.json(
        { 
          error: 'Component file not found on GitHub',
          details: error instanceof Error ? error.message : 'Unknown error',
          path: githubPath
        },
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

// Also support POST method for compatibility
export { GET as POST } 