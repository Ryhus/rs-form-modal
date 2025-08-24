import { useState } from 'react';

import {
  Input,
  FormErrorMessage,
  PasswordStrengthIndicator,
} from '@/components';

import { useFormStore } from '@/stores/FormStore';
import { useCountriesStore } from '@/stores/CountriesStore';

import { validateUser, checkStrength } from '@/utils/validation';
import { fileToBase64 } from '@/utils/fileConversions';

import { type PasswordStrengthRules } from './types';

import './FormsStyles.scss';

function UncontrolledForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrengthRules | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const { addFormSubmission } = useFormStore();
  const { countries } = useCountriesStore();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Record<string, FormDataEntryValue> = {};

    for (const pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }

    const strength = checkStrength(data.password as string);

    const { validData, errors } = await validateUser(data);

    if (errors) {
      setErrors(errors);
      setPasswordStrength(strength);
    } else if (validData) {
      let pictureBase64: string | null = null;
      if (validData.picture instanceof File) {
        pictureBase64 = await fileToBase64(validData.picture);
      }

      addFormSubmission({
        ...validData,
        picture: pictureBase64,
      });
    }
  };

  return (
    <form className="form-container" onSubmit={handleFormSubmit}>
      <fieldset>
        <legend className="sr-only">Contact Information</legend>
        <Input
          name="email"
          id="email"
          type="text"
          labelText="Email"
          errorMessage={errors['email']}
        ></Input>
        <FormErrorMessage errorMessage={errors['email']} />
      </fieldset>

      <fieldset>
        <legend className="sr-only">Personal Information</legend>
        <Input
          name="name"
          id="name"
          type="text"
          labelText="Name"
          errorMessage={errors['name']}
        ></Input>
        <FormErrorMessage errorMessage={errors['name']} />

        <Input
          name="age"
          id="age"
          type="text"
          labelText="Age"
          errorMessage={errors['age']}
        ></Input>
        <FormErrorMessage errorMessage={errors['age']} />

        <Input
          name="country"
          list="countries"
          id="country"
          labelText="Country"
          errorMessage={errors['country']}
        ></Input>
        <FormErrorMessage errorMessage={errors['country']} />
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country}></option>
          ))}
        </datalist>

        <div className="gender-radio-container">
          <Input
            name="gender"
            id="genderMale"
            type="radio"
            value="male"
            labelText="Male"
            className="gender-radio"
          ></Input>
          <Input
            name="gender"
            id="genderFemale"
            type="radio"
            value="female"
            labelText="Female"
            className="gender-radio"
          ></Input>
        </div>
        <FormErrorMessage errorMessage={errors['gender']} />

        <Input
          name="picture"
          id="picture"
          type="file"
          labelText="Picture"
          errorMessage={errors['picture']}
        ></Input>
        <FormErrorMessage errorMessage={errors['picture']} />
      </fieldset>

      <fieldset>
        <legend className="sr-only">Security</legend>
        <Input
          name="password"
          id="password"
          type={showPassword ? 'text' : 'password'}
          labelText="Password"
          errorMessage={errors['password']}
          rightIcon={
            <button
              type="button"
              className="icon-button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? '🕶️' : '👁️'}
            </button>
          }
        ></Input>
        <PasswordStrengthIndicator strengthObject={passwordStrength} />

        <Input
          name="confirmedPassword"
          id="confirmedPassword"
          type={showConfirmedPassword ? 'text' : 'password'}
          labelText="Confirm password"
          errorMessage={errors['confirmedPassword']}
          rightIcon={
            <button
              type="button"
              className="icon-button"
              onClick={() => setShowConfirmedPassword((prev) => !prev)}
            >
              {showConfirmedPassword ? '🕶️' : '👁️'}
            </button>
          }
        ></Input>
        <FormErrorMessage errorMessage={errors['confirmedPassword']} />
      </fieldset>

      <fieldset>
        <legend className="sr-only">Terms</legend>
        <Input
          name="termsAndConditions"
          id="termsAndConditions"
          type="checkbox"
          labelText="I agry with terms and conditions"
          className="terms-field"
        ></Input>
        <FormErrorMessage errorMessage={errors['termsAndConditions']} />
      </fieldset>

      <button type="submit" className="submit-form-bttn">
        Submit
      </button>
    </form>
  );
}

export default UncontrolledForm;
