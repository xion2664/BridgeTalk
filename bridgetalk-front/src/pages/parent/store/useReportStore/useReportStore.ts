import { create } from 'zustand';

interface Store {
  reportList: any;
  setReportList: (reportList: any[]) => void;
  language: Language['type'];
  setLangauge: (language: Language['type']) => void;
}

interface Language {
  type: 'kor' | 'viet';
}

interface Report {
  reportsId: number;
  reportsSummary: string;
  reportsKeywords: string[];
  createdAt: string;
}

export const useReportStore = create<Store>()((set) => ({
  reportList: [],
  setReportList: (reportList: any) => set({ reportList: reportList }),
  language: 'kor',
  setLangauge: (language: Language['type']) => set({ language: language }),
}));
