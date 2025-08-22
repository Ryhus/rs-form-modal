import { Input } from './Input';

import './FormsStyles.scss';

function UncontrolledForm() {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, FormDataEntryValue> = {};

    for (const pair of formData.entries()) {
      data[pair[0]] = pair[1];
    }
    console.log(data);
  };

  return (
    <form className="form-container" onSubmit={handleFormSubmit}>
      <fieldset>
        <legend className="sr-only">Contact Information</legend>
        <Input name="email" id="email" type="email" labelText="Email"></Input>
      </fieldset>

      <fieldset>
        <legend className="sr-only">Personal Information</legend>
        <Input name="name" id="name" type="text" labelText="Name"></Input>
        <Input name="age" id="age" type="number" labelText="Age"></Input>
        <Input
          name="country"
          id="country"
          type="text"
          labelText="Country"
        ></Input>

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

        <Input
          name="picture"
          id="picture"
          type="file"
          labelText="Picture"
        ></Input>
      </fieldset>

      <fieldset>
        <legend className="sr-only">Security</legend>
        <Input
          name="password"
          id="password"
          type="text"
          labelText="Password"
        ></Input>
        <Input
          name="confirmedPassword"
          id="confirmedPassword"
          type="text"
          labelText="Confirm password"
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
      </fieldset>

      <button type="submit" className="submit-form-bttn">
        Submit
      </button>
    </form>
  );
}

export default UncontrolledForm;
