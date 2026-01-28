/**
 * Simple test to verify URL structure
 */

import { describe, it, expect } from 'vitest';
import { navigationConfig } from '../navigationConfig';

describe('URL Structure Simple Test', () => {
  it('should have valid navigation URLs', () => {
    expect(navigationConfig.primaryItems).toHaveLength(7);
    
    navigationConfig.primaryItems.forEach(item => {
      expect(item.href).toMatch(/^\/[a-z-]*$/);
    });
  });
});