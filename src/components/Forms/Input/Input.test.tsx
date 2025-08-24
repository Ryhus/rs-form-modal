import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  it('renders input with correct type, id, name, and value', () => {
    render(
      <Input
        id="username"
        type="text"
        name="username"
        value="John"
        labelText="Username"
      />
    );

    const input = screen.getByLabelText('Username') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe('text');
    expect(input.id).toBe('username');
    expect(input.name).toBe('username');
    expect(input.value).toBe('John');
  });

  it('renders checked input when checked prop is true', () => {
    render(
      <Input
        id="subscribe"
        type="checkbox"
        name="subscribe"
        checked={true}
        labelText="Subscribe"
      />
    );

    const input = screen.getByLabelText('Subscribe') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('applies error class when errorMessage is provided', () => {
    render(
      <Input
        id="email"
        type="email"
        name="email"
        errorMessage="Invalid email"
        labelText="Email"
      />
    );

    const input = screen.getByLabelText('Email');
    expect(input).toHaveClass('input-field--error');
  });

  it('renders right icon when provided', () => {
    render(
      <Input
        id="search"
        type="text"
        labelText="Search"
        rightIcon={<span data-testid="icon">🔍</span>}
      />
    );

    const icon = screen.getByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon.textContent).toBe('🔍');
  });

  it('calls onChange handler when input value changes', () => {
    const handleChange = vi.fn();
    render(
      <Input
        id="username"
        type="text"
        name="username"
        value="John"
        labelText="Username"
        onChange={handleChange}
      />
    );

    const input = screen.getByLabelText('Username') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Jane' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('renders input with list attribute when provided', () => {
    render(
      <Input
        id="country"
        type="text"
        name="country"
        list="countries"
        labelText="Country"
      />
    );

    const input = screen.getByLabelText('Country') as HTMLInputElement;
    expect(input.getAttribute('list')).toBe('countries');
  });

  it('renders label text correctly', () => {
    render(<Input id="username" labelText="Username" />);

    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'username');
  });

  it('applies custom className to container', () => {
    render(
      <Input id="username" labelText="Username" className="custom-class" />
    );

    const container = screen.getByText('Username').parentElement;
    expect(container).toHaveClass('custom-class');
  });
});
