import { create } from 'zustand';

interface Store {
  reportsId: number;
  setReportsId: (reportsId: number) => void;
  isRecording: boolean;
  setIsRecording: (state: boolean) => void;
  isSend: boolean;
  setIsSend: (state: boolean) => void;
}
export const useTalkStore = create<Store>()((set) => ({
  reportsId: 0,
  setReportsId: (reportsId: number) => set({ reportsId }),
  isRecording: false,
  setIsRecording: (state: boolean) => set({ isRecording: state }),
  isSend: false,
  setIsSend: (state: boolean) => set({ isSend: state }),
}));
