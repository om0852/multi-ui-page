import { readFileSync } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const componentType = searchParams.get('component');
  const variant = searchParams.get('variant');

  if (!componentType || !variant) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'app', 'multiui', componentType.toLowerCase(), 'examples', `Example_${variant}.tsx`);
    const content = readFileSync(filePath, 'utf8');
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json({ error: 'Example not found' }, { status: 404 });
  }
} 