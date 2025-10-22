import { test, expect } from '@playwright/test';

// Mock Supabase authentication for testing
test.beforeEach(async ({ page }) => {
  // Mock Supabase auth API responses
  await page.route('**/supabase.co/**', async route => {
    const url = route.request().url();
    
    // Mock successful login
    if (url.includes('/auth/v1/token')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: 'mock-token',
          refresh_token: 'mock-refresh',
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
          }
        })
      });
    } 
    // Mock session check
    else if (url.includes('/auth/v1/user')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'test-user-id',
          email: 'test@example.com',
        })
      });
    }
    // Let other requests pass through
    else {
      await route.continue();
    }
  });
});

test.describe('Authentication Flow', () => {
  test('login page should display correctly', async ({ page }) => {
    await page.goto('/client/login');
    
    // Check for login form elements
    await expect(page.getByRole('heading', { name: /client portal/i })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('should toggle between login and signup modes', async ({ page }) => {
    await page.goto('/client/login');
    
    // Initial state should be login
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    
    // Switch to signup
    await page.getByRole('button', { name: /need an account/i }).click();
    await expect(page.getByRole('button', { name: /create account/i })).toBeVisible();
    
    // Switch back to login
    await page.getByRole('button', { name: /have an account/i }).click();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });
  
  test('should login successfully and redirect to dashboard', async ({ page }) => {
    await page.goto('/client/login');
    
    // Fill login form
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/.*\/client\/dashboard/);
  });
  
  test('should protect dashboard from unauthenticated access', async ({ page }) => {
    // Override the auth mock for this test
    await page.route('**/supabase.co/**/user', async route => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Unauthorized' })
      });
    });
    
    // Try to access dashboard directly
    await page.goto('/client/dashboard');
    
    // Should redirect to login
    await expect(page).toHaveURL(/.*\/client\/login/);
  });
});