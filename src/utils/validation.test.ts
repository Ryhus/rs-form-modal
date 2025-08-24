import { describe, it, expect } from 'vitest';
import { checkStrength, validateUser, type UserFormValues } from './validation';

describe('checkStrength', () => {
  it('should return all false for empty string', () => {
    const result = checkStrength('');
    expect(result).toEqual({
      length: false,
      numb: false,
      upper: false,
      lower: false,
      special: false,
    });
  });

  it('should validate a strong password correctly', () => {
    const result = checkStrength('Abcdef1!');
    expect(result).toEqual({
      length: true,
      numb: true,
      upper: true,
      lower: true,
      special: true,
    });
  });

  it('should fail rules when missing criteria', () => {
    const result = checkStrength('abcdefg');
    expect(result).toEqual({
      length: false,
      numb: false,
      upper: false,
      lower: true,
      special: false,
    });
  });
});

describe('validateUser', () => {
  const validFile = new File(['dummy'], 'avatar.png', { type: 'image/png' });

  const validData: Record<string, FormDataEntryValue> = {
    name: 'John',
    age: '25',
    email: 'john@example.com',
    gender: 'male',
    termsAndConditions: 'on',
    picture: validFile,
    country: 'Ukraine',
    password: 'Strong1!',
    confirmedPassword: 'Strong1!',
  };

  it('should validate correct data', async () => {
    const { validData: validated, errors } = await validateUser(validData);

    expect(errors).toBeUndefined();
    expect(validated).toMatchObject({
      name: 'John',
      age: '25',
      email: 'john@example.com',
    } satisfies Partial<UserFormValues>);
  });

  it('should return errors for invalid email & password mismatch', async () => {
    const invalidData = {
      ...validData,
      email: 'wrong-email',
      confirmedPassword: 'different',
    };

    const { errors } = await validateUser(invalidData);

    expect(errors?.email).toBe('Pls, enter a valid email address');
    expect(errors?.confirmedPassword).toBe('Passwords must match');
  });

  it('should return error for missing required fields', async () => {
    const emptyData: Partial<Record<keyof UserFormValues, FormDataEntryValue>> =
      {};

    const { errors } = await validateUser(emptyData);

    expect(errors?.name).toBe('Pls, enter your name');
    expect(errors?.age).toBe('Pls, enter your age');
    expect(errors?.email).toBe('Pls, enter your email');
    expect(errors?.gender).toBe('Pls, choose your gender');
    expect(errors?.termsAndConditions).toBe('Pls, accept the terms');
    expect(errors?.picture).toBe('Pls, attach your picture');
    expect(errors?.country).toBe('Pls, select a country');
    expect(errors?.password).toBe('Pls, enter your password');
    expect(errors?.confirmedPassword).toBe('Pls, confirm your password');
  });

  it('should reject files larger than 2MB', async () => {
    const bigFile = new File(['a'.repeat(3 * 1024 * 1024)], 'big.png', {
      type: 'image/png',
    });

    const invalidData = { ...validData, picture: bigFile };

    const { errors } = await validateUser(invalidData);

    expect(errors?.picture).toBe('File is larger then 2 MB');
  });

  it('should reject unsupported file formats', async () => {
    const txtFile = new File(['dummy'], 'file.txt', { type: 'text/plain' });

    const invalidData = { ...validData, picture: txtFile };

    const { errors } = await validateUser(invalidData);

    expect(errors?.picture).toBe(
      'Pls, attach your picture in jpg or png format'
    );
  });
});
