import { create } from 'zustand';

export const useSignupStore = create<any>()((set) => ({
  email: '',
  setEmail: (email: string) => set({ email: email }),
  name: '',
  setName: (name: string) => set({ name: name }),
  nickname: '',
  setNickname: (nickname: string) => set({ nickname: nickname }),
  password: '',
  setPassword: (password: string) => set({ password: password }),
  country: '',
  setCountry: (country: string) => set({ country: country }),
  dino: '',
  setDino: (dino: string) => set({ dino: dino }),
}));
