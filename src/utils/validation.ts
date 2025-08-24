import {
  object,
  string,
  mixed,
  ValidationError,
  ref,
  type InferType,
} from 'yup';
import { useCountriesStore } from '@/stores/CountriesStore';

type StrengthKey = 'length' | 'numb' | 'upper' | 'lower' | 'special';
type StrengthMap = Record<StrengthKey, boolean>;

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];
const FILE_SIZE = 2 * 1024 * 1024;

const countries = useCountriesStore.getState().countries;

export const userSchema = object({
  name: string()
    .required('Pls, enter your name')
    .matches(/^[A-Za-z]+$/, 'Name must contain only letters')
    .matches(/^[A-Z][a-zA-Z]*$/, 'First letter must be uppercase'),

  age: string()
    .required('Pls, enter your age')
    .matches(/^\d+$/, 'Pls, enter a valid non-negative number')
    .min(0, 'Age must be non negative'),

  email: string()
    .required('Pls, enter your email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Pls, enter a valid email address'),

  gender: string().required('Pls, choose your gender'),

  termsAndConditions: mixed()
    .required('Pls, accept the terms')
    .oneOf([true, 'on'], 'Pls, accept the terms'),

  picture: mixed<File>()
    .required('Pls, attach your picture')
    .test('fileSize', 'File is larger then 2 MB', (file: File) => {
      return file && file.size <= FILE_SIZE;
    })
    .test(
      'fileFormat',
      'Pls, attach your picture in jpg or png format',
      (file: File) => {
        if (!file) return false;
        return file && SUPPORTED_FORMATS.includes(file.type);
      }
    ),

  country: string()
    .required('Pls, select a country')
    .oneOf(countries, 'Pls, choose coutries from the list'),

  password: string()
    .required('Pls, enter your password')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Must contain at least one special character'
    ),

  confirmedPassword: string()
    .required('Pls, confirm your password')
    .oneOf([ref('password')], 'Passwords must match'),
});

export type UserFormValues = InferType<typeof userSchema>;

export async function validateUser(
  data: Record<string, FormDataEntryValue>
): Promise<{
  validData?: UserFormValues;
  errors?: Partial<Record<keyof UserFormValues, string>>;
}> {
  try {
    const validData = await userSchema.validate(data, { abortEarly: false });
    return { validData };
  } catch (err) {
    if (err instanceof ValidationError) {
      const formErrors: Partial<Record<keyof UserFormValues, string>> = {};
      err.inner.forEach((error) => {
        if (error.path) {
          formErrors[error.path as keyof UserFormValues] = error.message;
        }
      });
      return { errors: formErrors };
    }
    throw err;
  }
}

export const strengthRules: Array<{ key: StrengthKey; label: string }> = [
  { key: 'length', label: 'Must be at least 8 characters long' },
  { key: 'numb', label: 'Must contain at least one number' },
  { key: 'upper', label: 'Must contain at least one uppercase letter' },
  { key: 'lower', label: 'Must contain at least one lowercase letter' },
  { key: 'special', label: 'Must contain at least one special character' },
];

export function checkStrength(pw: string): StrengthMap {
  return {
    length: pw.length >= 8,
    numb: /[0-9]/.test(pw),
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(pw),
  };
}
