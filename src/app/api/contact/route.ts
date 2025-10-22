import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Basic validation; client already validates with Zod
    if (!data?.name || !data?.email || !data?.message) {
      return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
    }

    // TODO: integrate email or CRM. For now, simulate success.
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}