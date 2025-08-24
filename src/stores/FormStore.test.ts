import { describe, it, expect, beforeEach } from 'vitest';
import { useFormStore, type UserFormData } from './FormStore';

describe('useFormStore', () => {
  beforeEach(() => {
    useFormStore.setState({
      formSubmissions: [],
      addFormSubmission: useFormStore.getState().addFormSubmission,
    });
  });

  it('should have initial empty formSubmissions', () => {
    const { formSubmissions } = useFormStore.getState();
    expect(formSubmissions).toEqual([]);
  });

  it('should add a new form submission', () => {
    const submission: UserFormData = {
      name: 'John Doe',
      age: '30',
      email: 'john@example.com',
      gender: 'male',
      termsAndConditions: 'on',
      country: 'USA',
      password: 'Strong1!',
      confirmedPassword: 'Strong1!',
      picture: 'data:image/png;base64,...',
    };

    useFormStore.getState().addFormSubmission(submission);

    const { formSubmissions } = useFormStore.getState();
    expect(formSubmissions.length).toBe(1);
    expect(formSubmissions[0]).toEqual(submission);
  });

  it('should add multiple submissions', () => {
    const first: UserFormData = {
      name: 'Alice',
      age: '25',
      email: 'alice@example.com',
      gender: 'female',
      termsAndConditions: 'on',
      country: 'Canada',
      password: 'Password1!',
      confirmedPassword: 'Password1!',
      picture: null,
    };

    const second: UserFormData = {
      ...first,
      name: 'Bob',
      email: 'bob@example.com',
    };

    const store = useFormStore.getState();
    store.addFormSubmission(first);
    store.addFormSubmission(second);

    const { formSubmissions } = useFormStore.getState();
    expect(formSubmissions.length).toBe(2);
    expect(formSubmissions[0].name).toBe('Alice');
    expect(formSubmissions[1].name).toBe('Bob');
  });
});
