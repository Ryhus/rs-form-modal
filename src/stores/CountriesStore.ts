import { create } from 'zustand';

interface CountriesDataState {
  countries: string[];
  setCountries: (countries: string[]) => void;
}

export const useCountriesStore = create<CountriesDataState>((set) => ({
  countries: ['Germany', 'Russia', 'Ukraine', 'France'],
  setCountries: (countries) => set({ countries }),
}));
