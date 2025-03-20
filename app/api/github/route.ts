import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Handle your file operations here
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
} 