import { useState } from 'react';

import { Input } from './Input';
import { COUNTIRIES } from '@/utils/data';
import { validateUser } from '@/utils/validation';

import './FormsStyles.scss';

function UncontrolledForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, FormDataEntryValue> = {};

    for (const pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }
    console.log(data);
    const { validData, errors } = await validateUser(data);
    if (errors) {
      setErrors(errors);
    } else {
      console.log('Valid form data:', validData);
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
        <Input
          name="age"
          id="age"
          type="text"
          labelText="Age"
          errorMessage={errors['age']}
        ></Input>
        <Input
          name="country"
          list="countries"
          id="country"
          labelText="Country"
          errorMessage={errors['country']}
        ></Input>
        <datalist id="countries">
          {COUNTIRIES.map((country) => (
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
        {errors['gender'] && (
          <p className="input-error-message">{errors['gender']}</p>
        )}

        <Input
          name="picture"
          id="picture"
          type="file"
          labelText="Picture"
          errorMessage={errors['picture']}
        ></Input>
      </fieldset>

      <fieldset>
        <legend className="sr-only">Security</legend>
        <Input
          name="password"
          id="password"
          type="text"
          labelText="Password"
          errorMessage={errors['password']}
        ></Input>
        <Input
          name="confirmedPassword"
          id="confirmedPassword"
          type="text"
          labelText="Confirm password"
          errorMessage={errors['confirmedPassword']}
        ></Input>
      </fieldset>

      <fieldset>
        <legend className="sr-only">Terms</legend>
        <Input
          name="termsAndConditions"
          id="termsAndConditions"
          type="checkbox"
          labelText="I agry with terms and conditions"
          className="tearms-field"
        ></Input>
        {errors['termsAndConditions'] && (
          <p className="input-error-message">{errors['termsAndConditions']}</p>
        )}
      </fieldset>

      <button type="submit" className="submit-form-bttn">
        Submit
      </button>
    </form>
  );
}

export default UncontrolledForm;
