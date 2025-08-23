import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from './Input';

import { userSchema, type UserFormValues } from '@/utils/validation';

import { useFormStore } from '@/stores/FormStore';
import { useCountriesStore } from '@/stores/CountriesStore';

import './FormsStyles.scss';

export default function ControlledForm() {
  const { setFormData } = useFormStore();
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

  const onSubmit = (data: UserFormValues) => {
    setFormData(data);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend className="sr-only">Contact Information</legend>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="email"
              type="text"
              labelText="Email"
              errorMessage={errors.email?.message}
            />
          )}
        />
      </fieldset>

      <fieldset>
        <legend className="sr-only">Personal Information</legend>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="name"
              type="text"
              labelText="Name"
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="age"
              type="text"
              labelText="Age"
              errorMessage={errors.age?.message}
            />
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
        </div>
        {errors.gender && (
          <p className="input-error-message">{errors.gender.message}</p>
        )}

        <Controller
          name="picture"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              value={undefined}
              onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
              id="picture"
              type="file"
              labelText="Picture"
              errorMessage={errors.picture?.message}
            />
          )}
        />
      </fieldset>

      <fieldset>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="password"
              type="password"
              labelText="Password"
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          name="confirmedPassword"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="confirmedPassword"
              type="password"
              labelText="Confirm Password"
              errorMessage={errors.confirmedPassword?.message}
            />
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
              {errors.termsAndConditions && (
                <p className="input-error-message">
                  {errors.termsAndConditions.message}
                </p>
              )}
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
