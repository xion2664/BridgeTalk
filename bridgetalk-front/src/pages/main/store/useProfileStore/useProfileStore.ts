import { create } from 'zustand';

interface Store {
  deleteModalOpenState: any;
  setDeleteModalOpenState: any;
  passwordCheckModalState: any;
  setPasswordCheckModalState: any;
}

export const useProfileStore = create<Store>()((set) => ({
  deleteModalOpenState: false,
  setDeleteModalOpenState: (deleteModalState: any) =>
    set({
      deleteModalOpenState: deleteModalState,
    }),
  passwordCheckModalState: false,
  setPasswordCheckModalState: (state: []) => set({ passwordCheckModalState: state }),
}));
