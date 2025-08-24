import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserList from './UserList';
import { useFormStore, type UserFormData } from '@/stores/FormStore';

describe('UserList', () => {
  const sampleUser: UserFormData = {
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

  beforeEach(() => {
    useFormStore.setState({ formSubmissions: [] });
  });

  it('renders empty message when no users are submitted', () => {
    render(<UserList />);
    expect(screen.getByText('No users submitted yet.')).toBeInTheDocument();
  });

  it('renders a list of UserCard components when users exist', () => {
    useFormStore.getState().addFormSubmission(sampleUser);

    render(<UserList />);

    expect(screen.queryByText('No users submitted yet.')).toBeNull();

    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('Email:').parentElement).toHaveTextContent(
      `Email: ${sampleUser.email}`
    );
  });

  it('renders multiple UserCard components', () => {
    useFormStore.getState().addFormSubmission(sampleUser);
    useFormStore.getState().addFormSubmission({
      ...sampleUser,
      email: 'jane@example.com',
      name: 'Jane Doe',
    });

    render(<UserList />);

    const emailSpans = screen.getAllByText('Email:');
    expect(emailSpans).toHaveLength(2);

    expect(emailSpans[0].parentElement).toHaveTextContent(
      'Email: john@example.com'
    );
    expect(emailSpans[1].parentElement).toHaveTextContent(
      'Email: jane@example.com'
    );
  });
});
