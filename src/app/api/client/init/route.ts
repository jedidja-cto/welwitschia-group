import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { user_id, email, name } = body || {};

    if (!user_id || !email) {
      return NextResponse.json({ ok: false, error: 'Missing user_id or email' }, { status: 400 });
    }

    // Check if client already exists for this auth user
    const { data: existing, error: fetchErr } = await supabaseAdmin
      .from('clients')
      .select('id')
      .eq('user_id', user_id)
      .maybeSingle();

    if (fetchErr) {
      console.error('Error checking client', fetchErr);
      return NextResponse.json({ ok: false, error: 'Failed to check client' }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json({ ok: true });
    }

    // Insert new client record
    const { error: insertErr } = await supabaseAdmin
      .from('clients')
      .insert({
        user_id,
        email,
        name: name || (email?.split('@')[0] || 'Client'),
        role: 'client',
      });

    if (insertErr) {
      console.error('Error creating client', insertErr);
      return NextResponse.json({ ok: false, error: 'Failed to create client' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Client init error', err);
    return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}