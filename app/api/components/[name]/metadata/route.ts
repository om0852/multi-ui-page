import { fetchComponentMetadata } from '../../../../utils/github.server';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { name: string } }) {
  try {
    const metadata = await fetchComponentMetadata(params.name);
    return NextResponse.json(metadata);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch metadata' }, { status: 500 });
  }
} 