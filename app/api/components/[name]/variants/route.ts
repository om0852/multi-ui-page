import { fetchComponentVariants } from '../../../../utils/github.server';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { name: string } }) {
  try {
    const variants = await fetchComponentVariants(params.name);
    return NextResponse.json(variants);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch variants' }, { status: 500 });
  }
} 