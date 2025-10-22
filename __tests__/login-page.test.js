import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../src/app/client/(unauth)/login/page';

// Mock the necessary dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// Mock Supabase client
jest.mock('@/lib/supabaseClient', () => ({
  __esModule: true,
  default: {
    auth: {
      signInWithPassword: jest.fn().mockResolvedValue({
        data: { user: { id: 'test-user-id' } },
        error: null
      }),
      signUp: jest.fn().mockResolvedValue({
        data: { user: { id: 'new-user-id' } },
        error: null
      })
    }
  }
}));

// Mock API client
jest.mock('@/lib/clientApi', () => ({
  initClient: jest.fn().mockResolvedValue({ success: true })
}));

describe('Login Page', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  test('renders login form correctly', () => {
    render(<LoginPage />);
    
    expect(screen.getByText(/client portal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('toggles between login and signup modes', () => {
    render(<LoginPage />);
    
    // Initially in login mode
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    
    // Switch to signup mode
    fireEvent.click(screen.getByRole('button', { name: /need an account/i }));
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    
    // Switch back to login mode
    fireEvent.click(screen.getByRole('button', { name: /have an account/i }));
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('handles login submission', async () => {
    const { getByLabelText, getByRole } = render(<LoginPage />);
    
    // Fill the form
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(getByRole('button', { name: /sign in/i }));
    
    // Wait for the form submission to complete
    await waitFor(() => {
      expect(require('@/lib/supabaseClient').default.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  test('handles signup submission', async () => {
    const { getByLabelText, getByRole } = render(<LoginPage />);
    
    // Switch to signup mode
    fireEvent.click(getByRole('button', { name: /need an account/i }));
    
    // Fill the form
    fireEvent.change(getByLabelText(/email/i), { target: { value: 'new@example.com' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'password123' } });
    
    // Submit the form
    fireEvent.click(getByRole('button', { name: /create account/i }));
    
    // Wait for the form submission to complete
    await waitFor(() => {
      expect(require('@/lib/supabaseClient').default.auth.signUp).toHaveBeenCalledWith({
        email: 'new@example.com',
        password: 'password123'
      });
      expect(require('@/lib/clientApi').initClient).toHaveBeenCalled();
    });
  });
});