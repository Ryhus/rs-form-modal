import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  type MockedFunction,
} from 'vitest';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import UncontrolledForm from './UncontrolledForm';

import * as validation from '@/utils/validation';

const addFormSubmissionMock = vi.fn();
vi.mock('@/stores/FormStore', () => ({
  useFormStore: () => ({
    addFormSubmission: addFormSubmissionMock,
  }),
}));

vi.mock('@/stores/CountriesStore', () => {
  const state = { countries: ['USA', 'Canada', 'Germany'] };
  const useCountriesStore = () => state;
  useCountriesStore.getState = () => state;
  return { useCountriesStore };
});

vi.mock('@/utils/validation', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    validateUser: vi.fn(),
    checkStrength: vi.fn(),
    strengthRules: [
      { key: 'length', label: 'At least 8 characters' },
      { key: 'uppercase', label: 'Contains uppercase letter' },
      { key: 'number', label: 'Contains number' },
      { key: 'special', label: 'Contains special character' },
    ],
  };
});

vi.mock('@/utils/fileConversions', () => ({
  fileToBase64: vi.fn(() => Promise.resolve('base64string')),
}));

const validateUserMock = validation.validateUser as MockedFunction<
  typeof validation.validateUser
>;
const checkStrengthMock = validation.checkStrength as MockedFunction<
  typeof validation.checkStrength
>;

describe('UncontrolledForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    validateUserMock.mockResolvedValue({
      validData: undefined,
      errors: {
        email: 'Email required',
        name: 'Name required',
      },
    });
  });

  it('renders all required fields', () => {
    render(<UncontrolledForm />);
    const fields = [
      'Email',
      'Name',
      'Age',
      'Country',
      'Male',
      'Female',
      'Picture',
      'Password',
      'Confirm password',
      'I agry with terms and conditions',
    ];

    fields.forEach((field) => {
      expect(
        screen.getByLabelText(new RegExp(`^${field}$`, 'i'))
      ).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('validates form fields and shows errors', async () => {
    render(<UncontrolledForm />);
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email required/i)).toBeInTheDocument();
      expect(screen.getByText(/Name required/i)).toBeInTheDocument();
    });
  });

  it('calculates password strength', async () => {
    checkStrengthMock.mockReturnValue({
      length: true,
      upper: false,
      numb: true,
      special: false,
      lower: false,
    });

    render(<UncontrolledForm />);

    const passwordInput = screen.getByLabelText(/^Password$/i);
    fireEvent.change(passwordInput, { target: { value: 'StrongPass123!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(checkStrengthMock).toHaveBeenCalledWith('StrongPass123!');
    });
  });

  it('submits valid data', async () => {
    validateUserMock.mockResolvedValue({
      validData: {
        email: 'test@test.com',
        name: 'John Doe',
        age: '30',
        country: 'USA',
        gender: 'male',
        picture: new File([], 'pic.png'),
        password: 'password',
        confirmedPassword: 'password',
        termsAndConditions: true,
      },
      errors: undefined,
    });

    render(<UncontrolledForm />);

    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: 'test@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Name$/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/^Age$/i), {
      target: { value: '30' },
    });
    fireEvent.change(screen.getByLabelText(/^Country$/i), {
      target: { value: 'USA' },
    });
    fireEvent.click(screen.getByLabelText(/^Male$/i));
    fireEvent.change(screen.getByLabelText(/^Picture$/i), {
      target: { files: [new File([], 'pic.png')] },
    });
    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByLabelText(/Confirm password/i), {
      target: { value: 'password' },
    });
    fireEvent.click(
      screen.getByLabelText(/^I agry with terms and conditions$/i)
    );

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(addFormSubmissionMock).toHaveBeenCalled();
    });
  });
});
