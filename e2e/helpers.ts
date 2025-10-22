import { Page, expect } from '@playwright/test';

// Test data
export const TEST_EMAIL = 'test@example.com';
export const TEST_PASSWORD = 'Password123!';

/**
 * Helper function to login a user
 */
export async function login(page: Page, email = TEST_EMAIL, password = TEST_PASSWORD) {
  await page.goto('/client/login');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('/client/dashboard', { timeout: 10000 });
}

/**
 * Helper function to logout a user
 */
export async function logout(page: Page) {
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page).toHaveURL('/client/login', { timeout: 5000 });
}