import { create } from 'zustand';

import type { UserFormValues } from '@/utils/validation';

interface FormDataState {
  formData: UserFormValues | null;
  setFormData: (data: UserFormValues) => void;
}

export const useFormStore = create<FormDataState>((set) => ({
  formData: null,
  setFormData: (data) => set({ formData: data }),
}));
