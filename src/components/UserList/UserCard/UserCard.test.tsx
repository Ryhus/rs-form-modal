import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserCard from './UserCard';
import { type UserFormData } from '@/stores/FormStore';

describe('UserCard', () => {
  const baseUser: UserFormData = {
    name: 'John Doe',
    age: '30',
    email: 'john@example.com',
    gender: 'male',
    termsAndConditions: 'on',
    country: 'USA',
    password: 'Strong1!',
    confirmedPassword: 'Strong1!',
    picture: 'data:image/png;base64,abcd',
  };

  it('renders user info correctly', () => {
    render(<UserCard user={baseUser} />);

    const infoPairs: [string, string][] = [
      ['Email:', baseUser.email],
      ['Name:', baseUser.name],
      ['Age:', baseUser.age],
      ['Country:', baseUser.country],
      ['Gender:', baseUser.gender],
      ['Password:', baseUser.password],
      ['ConfirmedPassword:', baseUser.confirmedPassword],
    ];

    infoPairs.forEach(([label, value]) => {
      const labelSpan = screen.getByText(label);
      expect(labelSpan.parentElement).toHaveTextContent(`${label} ${value}`);
    });
  });

  it('renders user image when picture exists', () => {
    render(<UserCard user={baseUser} />);
    const img = screen.getByRole('img', { name: /User/i });
    expect(img).toHaveAttribute('src', baseUser.picture);
  });

  it('does not render image when picture is null', () => {
    render(<UserCard user={{ ...baseUser, picture: null }} />);
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('displays "Accepted" if termsAndConditions is truthy', () => {
    render(<UserCard user={{ ...baseUser, termsAndConditions: 'on' }} />);
    const span = screen.getByText('Terms & Conditions:');
    expect(span.parentElement).toHaveTextContent(
      'Terms & Conditions: ✅ Accepted'
    );
  });

  it('displays "Not Accepted" if termsAndConditions is falsy', () => {
    render(<UserCard user={{ ...baseUser, termsAndConditions: '' }} />);
    const span = screen.getByText('Terms & Conditions:');
    expect(span.parentElement).toHaveTextContent(
      'Terms & Conditions: ❌ Not Accepted'
    );
  });
});
