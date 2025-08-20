import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './Home';

describe('Home component', () => {
  it('renders the starting point text', () => {
    render(<Home />);
    expect(screen.getByText('Starting point')).toBeInTheDocument();
  });
});
