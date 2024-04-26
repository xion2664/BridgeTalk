import { create } from 'zustand';

interface Store {
    audioURL: string;
    setAudioURL: (audioURL: string) => void;

    volume: number;
    setVolume: (volume: number) => void;

    isRecordFinished: boolean;
    setIsRecordFinished: (status: boolean) => void;
}

export const useVoiceStore = create<Store>()((set) => ({
    audioURL: '',
    setAudioURL: (audioURL: string) => set({ audioURL: audioURL }),

    volume: 0,
    setVolume: (volume: number) => set({ volume: volume }),

    isRecordFinished: false,
    setIsRecordFinished: (status: boolean) => set({ isRecordFinished: status }),
}));
