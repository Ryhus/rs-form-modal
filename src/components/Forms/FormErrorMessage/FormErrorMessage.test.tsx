import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import FormErrorMessage from './FormErrorMessage';

describe('FormErrorMessage', () => {
  it('renders the error message when provided', () => {
    const errorMessage = 'This field is required';
    render(<FormErrorMessage errorMessage={errorMessage} />);

    const messageElement = screen.getByText(errorMessage);
    expect(messageElement).toBeInTheDocument();
    expect(messageElement).toHaveClass('input-error-message');
  });

  it('renders a non-breaking space when errorMessage is undefined', () => {
    render(<FormErrorMessage errorMessage={undefined} />);

    const messageElement = screen.getByText((content, element) => {
      return Boolean(
        element?.classList.contains('input-error-message') &&
          content.trim() === ''
      );
    });

    expect(messageElement).toBeInTheDocument();
  });

  it('renders a non-breaking space when errorMessage is an empty string', () => {
    render(<FormErrorMessage errorMessage="" />);

    const messageElement = screen.getByText((content, element) => {
      return Boolean(
        element?.classList.contains('input-error-message') &&
          content.trim() === ''
      );
    });

    expect(messageElement).toBeInTheDocument();
  });
});
