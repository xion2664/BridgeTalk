import { create } from 'zustand';

interface Store {
  reportsId: number;
  setReportsId: (reportsId: number) => void;
  isRecording: boolean;
  setIsRecording: (state: boolean) => void;
  isSend: boolean;
  setIsSend: (state: boolean) => void;
  isTalking: boolean;
  setIsTalking: (state: boolean) => void;
  isWaiting: boolean;
  setIsWaiting: (state: boolean) => void;
  isEnd: boolean;
  setIsEnd: (state: boolean) => void;
  subtitle: string;
  setSubtitle: (state: string) => void;
  emotion: string;
  setEmotion: (state: string) => void;
}
export const useTalkStore = create<Store>()((set) => ({
  reportsId: 0,
  setReportsId: (reportsId) => set({ reportsId }),
  isRecording: false,
  setIsRecording: (state) => set({ isRecording: state }),
  isSend: false,
  setIsSend: (state) => set({ isSend: state }),
  isTalking: false,
  setIsTalking: (state) => set({ isTalking: state }),
  isWaiting: false,
  setIsWaiting: (state) => set({ isWaiting: state }),
  isEnd: false,
  setIsEnd: (state) => set({ isEnd: state }),
  subtitle: '',
  setSubtitle: (state: string) => set({ subtitle: state }),
  emotion: '',
  setEmotion: (state: string) => set({ emotion: state }),
}));
