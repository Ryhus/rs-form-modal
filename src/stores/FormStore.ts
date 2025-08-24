import { create } from 'zustand';

import type { UserFormValues } from '@/utils/validation';

export interface UserFormData extends Omit<UserFormValues, 'picture'> {
  picture: string | null;
}

interface FormDataState {
  formSubmissions: UserFormData[];
  addFormSubmission: (data: UserFormData) => void;
}

export const useFormStore = create<FormDataState>((set) => ({
  formSubmissions: [],
  addFormSubmission: (data) =>
    set((state) => ({
      formSubmissions: [...state.formSubmissions, data],
    })),
}));
