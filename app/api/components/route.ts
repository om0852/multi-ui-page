import { fetchComponentsList } from '../../utils/github.server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const components = await fetchComponentsList();
    return NextResponse.json(components);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch components' }, { status: 500 });
  }
} 