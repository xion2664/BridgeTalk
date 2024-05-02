import { create } from 'zustand';

interface Store {
  reportList: Report[];
  setReportList: (reportList: Report[]) => void;
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
  reportList: [
    // 이 안에 들어있는 데이터는 임시 데이터
    {
      reportsId: 1,
      reportsSummary: '오늘 학교에서 친구와 싸워서 기분이 안좋다.',
      reportsKeywords: ['학교', '친구', '싸움'],
      createdAt: '2024-04-23 24:00:00',
    },
    {
      reportsId: 3,
      reportsSummary: '엄마랑 놀이동산에 가고 싶은데 내 마음을 몰라준다.',
      reportsKeywords: ['놀이동산', '엄마'],
      createdAt: '2024-04-23 24:00:00',
    },
    {
      reportsId: 4,
      reportsSummary: '엄마랑 놀이동산에 가고 싶은데 내 마음을 몰라준다.',
      reportsKeywords: ['놀이동산', '엄마'],
      createdAt: '2024-04-23 24:00:00',
    },
    {
      reportsId: 7,
      reportsSummary: '엄마랑 놀이동산에 가고 싶은데 내 마음을 몰라준다.',
      reportsKeywords: ['놀이동산', '엄마'],
      createdAt: '2024-04-23 24:00:00',
    },
  ],
  setReportList: (reportList: Report[]) => set({ reportList: reportList }),
  language: 'kor',
  setLangauge: (language: Language['type']) => set({ language: language }),
}));
