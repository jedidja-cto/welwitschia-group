import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainLayout from '../../components/layout/MainLayout';

describe('MainLayout', () => {
  it('renders correctly', () => {
    render(<MainLayout>Test Content</MainLayout>);
    expect(screen.getByText('Test Content')).toBeDefined();
  });
});
