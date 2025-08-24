import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  type MockedFunction,
} from 'vitest';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import ControlledForm from './ControlledForm';

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
    userSchema: actual.userSchema,
    checkStrength: vi.fn(),
  };
});

vi.mock('@/utils/fileConversions', () => ({
  fileToBase64: vi.fn(() => Promise.resolve('base64string')),
}));

const checkStrengthMock = validation.checkStrength as MockedFunction<
  typeof validation.checkStrength
>;

describe('ControlledForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all required fields', () => {
    render(<ControlledForm />);
    const fields = [
      'Email',
      'Name',
      'Age',
      'Country',
      'Male',
      'Female',
      'Picture',
      'Password',
      'Confirm Password',
      'I agree with terms and conditions',
    ];

    fields.forEach((field) => {
      expect(
        screen.getByLabelText(new RegExp(`^${field}$`, 'i'))
      ).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('calculates password strength', async () => {
    checkStrengthMock.mockReturnValue({
      length: true,
      upper: false,
      numb: true,
      special: false,
      lower: false,
    });

    render(<ControlledForm />);

    const passwordInput = screen.getByLabelText(/^Password$/i);
    fireEvent.change(passwordInput, { target: { value: 'StrongPass123!' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(checkStrengthMock).toHaveBeenCalledWith('StrongPass123!');
    });
  });

  it('submits valid data', async () => {
    render(<ControlledForm />);

    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: 'test@test.com' },
    });

    fireEvent.change(screen.getByLabelText(/^Name$/i), {
      target: { value: 'John' },
    });

    fireEvent.change(screen.getByLabelText(/^Age$/i), {
      target: { value: '30' },
    });

    fireEvent.change(screen.getByLabelText(/^Country$/i), {
      target: { value: 'USA' },
    });

    fireEvent.click(screen.getByLabelText(/^Male$/i));

    const file = new File(['dummy'], 'pic.png', { type: 'image/png' });
    const pictureInput = screen.getByLabelText(
      /^Picture$/i
    ) as HTMLInputElement;
    fireEvent.change(pictureInput, { target: { files: [file] } });

    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: 'Password123!' },
    });

    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'Password123!' },
    });

    fireEvent.click(
      screen.getByLabelText(/^I agree with terms and conditions$/i)
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await waitFor(() => expect(submitButton).not.toBeDisabled());

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(addFormSubmissionMock).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@test.com',
          name: 'John',
          age: '30',
          country: 'USA',
          gender: 'male',
          password: 'Password123!',
          confirmedPassword: 'Password123!',
          termsAndConditions: true,
          picture: 'base64string',
        })
      );
    });
  });
});
