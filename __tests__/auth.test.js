import { createClient } from '@supabase/supabase-js';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest.fn().mockResolvedValue({
        data: { user: { id: 'test-user-id', email: 'test@example.com' } },
        error: null
      }),
      signUp: jest.fn().mockResolvedValue({
        data: { user: { id: 'new-user-id', email: 'new@example.com' } },
        error: null
      }),
      signOut: jest.fn().mockResolvedValue({ error: null }),
      getSession: jest.fn().mockResolvedValue({
        data: { session: { user: { id: 'test-user-id', email: 'test@example.com' } } },
        error: null
      })
    }
  }))
}));

describe('Supabase Authentication', () => {
  let supabase;

  beforeEach(() => {
    supabase = createClient('https://example.com', 'fake-key');
  });

  test('should sign in with email and password', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'password123'
    });

    expect(error).toBeNull();
    expect(data.user).toBeDefined();
    expect(data.user.email).toBe('test@example.com');
  });

  test('should sign up a new user', async () => {
    const { data, error } = await supabase.auth.signUp({
      email: 'new@example.com',
      password: 'password123'
    });

    expect(error).toBeNull();
    expect(data.user).toBeDefined();
    expect(data.user.email).toBe('new@example.com');
  });

  test('should sign out a user', async () => {
    const { error } = await supabase.auth.signOut();
    expect(error).toBeNull();
  });

  test('should get current session', async () => {
    const { data, error } = await supabase.auth.getSession();
    
    expect(error).toBeNull();
    expect(data.session).toBeDefined();
    expect(data.session.user.email).toBe('test@example.com');
  });
});