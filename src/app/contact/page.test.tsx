import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactPage from './page';

describe('ContactPage', () => {
  it('renders correctly', () => {
    render(<ContactPage />);
    expect(screen.getByText('Contact Us')).toBeDefined();
  });
});
