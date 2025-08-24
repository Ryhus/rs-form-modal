import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Input,
  FormErrorMessage,
  PasswordStrengthIndicator,
} from '@/components';

import {
  userSchema,
  checkStrength,
  type UserFormValues,
} from '@/utils/validation';

import { useFormStore } from '@/stores/FormStore';
import { useCountriesStore } from '@/stores/CountriesStore';

import { fileToBase64 } from '@/utils/fileConversions';

import './FormsStyles.scss';

export default function ControlledForm() {
  const { addFormSubmission } = useFormStore();
  const { countries } = useCountriesStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserFormValues>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      email: '',
      name: '',
      age: '',
      country: '',
      gender: '',
      password: '',
      confirmedPassword: '',
      termsAndConditions: false,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: UserFormValues) => {
    let pictureBase64: string | null = null;
    if (data.picture instanceof File) {
      pictureBase64 = await fileToBase64(data.picture);
    }

    addFormSubmission({
      ...data,
      picture: pictureBase64,
    });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend className="sr-only">Contact Information</legend>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <>
              <Input
                {...field}
                id="email"
                type="text"
                labelText="Email"
                errorMessage={errors.email?.message}
              />
              <FormErrorMessage errorMessage={errors.email?.message} />
            </>
          )}
        />
      </fieldset>

      <fieldset>
        <legend className="sr-only">Personal Information</legend>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <>
              <Input
                {...field}
                id="name"
                type="text"
                labelText="Name"
                errorMessage={errors.name?.message}
              />
              <FormErrorMessage errorMessage={errors.name?.message} />
            </>
          )}
        />

        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <>
              <Input
                {...field}
                id="age"
                type="text"
                labelText="Age"
                errorMessage={errors.age?.message}
              />
              <FormErrorMessage errorMessage={errors.age?.message} />
            </>
          )}
        />

        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <>
              <Input
                {...field}
                id="country"
                list="countries"
                labelText="Country"
                errorMessage={errors.country?.message}
              />
              <FormErrorMessage errorMessage={errors.country?.message} />
              <datalist id="countries">
                {countries.map((country) => (
                  <option key={country} value={country} />
                ))}
              </datalist>
            </>
          )}
        />

        <div className="gender-radio-container">
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  {...field}
                  id="male"
                  type="radio"
                  value="male"
                  labelText="Male"
                  className="gender-radio"
                />

                <Input
                  {...field}
                  id="female"
                  type="radio"
                  value="female"
                  labelText="Female"
                  className="gender-radio"
                />
              </>
            )}
          />
          <FormErrorMessage errorMessage={errors.gender?.message} />
        </div>
        {errors.gender && (
          <p className="input-error-message">{errors.gender.message}</p>
        )}

        <Controller
          name="picture"
          control={control}
          render={({ field }) => (
            <>
              <Input
                {...field}
                value={undefined}
                onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
                id="picture"
                type="file"
                labelText="Picture"
                errorMessage={errors.picture?.message}
              />
              <FormErrorMessage errorMessage={errors.picture?.message} />
            </>
          )}
        />
      </fieldset>

      <fieldset>
        <Controller
          name="password"
          control={control}
          render={({ field }) => {
            const strength = checkStrength(field.value);
            return (
              <>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  labelText="Password"
                  errorMessage={errors.password?.message}
                />
                <div className="password-erorr-container">
                  <PasswordStrengthIndicator strengthObject={strength} />
                </div>
              </>
            );
          }}
        />

        <Controller
          name="confirmedPassword"
          control={control}
          render={({ field }) => (
            <>
              <Input
                {...field}
                id="confirmedPassword"
                type="password"
                labelText="Confirm Password"
                errorMessage={errors.confirmedPassword?.message}
              />
              <FormErrorMessage
                errorMessage={errors.confirmedPassword?.message}
              />
            </>
          )}
        />
      </fieldset>

      <fieldset>
        <legend className="sr-only">Terms</legend>
        <Controller
          name="termsAndConditions"
          control={control}
          render={({ field }) => (
            <>
              <Input
                {...field}
                value={undefined}
                id="termsAndConditions"
                type="checkbox"
                labelText="I agree with terms and conditions"
                className="terms-field"
              />
              <FormErrorMessage
                errorMessage={errors.termsAndConditions?.message}
              />
            </>
          )}
        />
      </fieldset>

      <button type="submit" className="submit-form-bttn" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
