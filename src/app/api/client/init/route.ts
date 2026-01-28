import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Client init error', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}