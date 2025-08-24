import { describe, beforeEach, it, expect } from 'vitest';
import { useCountriesStore } from './CountriesStore';

describe('useCountriesStore', () => {
  beforeEach(() => {
    useCountriesStore.setState({
      countries: [
        'Afghanistan',
        'Albania',
        'Algeria',
        'Andorra',
        'Angola',
        'Canada',
        'USA',
      ],
      setCountries: useCountriesStore.getState().setCountries,
    });
  });

  it('should have initial countries', () => {
    const { countries } = useCountriesStore.getState();
    expect(countries).toEqual([
      'Afghanistan',
      'Albania',
      'Algeria',
      'Andorra',
      'Angola',
      'Canada',
      'USA',
    ]);
  });

  it('should update countries when setCountries is called', () => {
    const newCountries = ['France', 'Germany', 'Italy'];
    useCountriesStore.getState().setCountries(newCountries);

    const { countries } = useCountriesStore.getState();
    expect(countries).toEqual(newCountries);
  });

  it('should allow adding a country', () => {
    const state = useCountriesStore.getState();
    const updated = [...state.countries, 'Brazil'];
    state.setCountries(updated);

    const { countries } = useCountriesStore.getState();
    expect(countries).toContain('Brazil');
    expect(countries.length).toBe(updated.length);
  });

  it('should allow removing a country', () => {
    const state = useCountriesStore.getState();
    const updated = state.countries.filter((c) => c !== 'Albania');
    state.setCountries(updated);

    const { countries } = useCountriesStore.getState();
    expect(countries).not.toContain('Albania');
  });
});
