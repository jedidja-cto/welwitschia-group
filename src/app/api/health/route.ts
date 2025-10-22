import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET() {
  try {
    // Test database connection by querying the clients table
    const { data, error } = await supabaseAdmin
      .from('clients')
      .select('count')
      .limit(1);

    if (error) {
      console.error('Database connection error:', error);
      return NextResponse.json(
        { 
          status: 'error', 
          message: 'Database connection failed',
          error: error.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: 'healthy',
      message: 'Supabase admin client connected successfully',
      timestamp: new Date().toISOString(),
      database: 'connected'
    });

  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}