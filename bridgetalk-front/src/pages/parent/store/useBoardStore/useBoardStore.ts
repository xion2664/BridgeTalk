import { create } from 'zustand';

interface Store {
  boardList: any;
  setBoardList: (boardList: any[]) => void;
  language: Language['type'];
  setLangauge: (language: Language['type']) => void;
  board_UUID: any;
  setBoard_UUID: (board_UUID: any) => void;
  resultPage: number;
  setResultPage: (resultPage: number) => void;
}

interface Language {
  type: 'kor' | 'viet';
}

interface Board {
    boardId?: number;
    boardsTitle?: string;
    boardsContent?: string;
    likes?: number;
    createdAt?: string;
    reportsSummary?: string;
    reportsKeyword?: string[];
    writer?: string;
}

export const useBoardStore = create<Store>()((set) => ({
  boardList: [],
  setBoardList: (boardList: any) => set({ boardList: boardList }),
  language: 'kor',
  setLangauge: (language: Language['type']) => set({ language: language }),
  board_UUID: new Map(),
  setBoard_UUID: (board_UUID: any) => set({ board_UUID: board_UUID }),
  resultPage: 0,
  setResultPage: (resultPage: number) => set({ resultPage: resultPage }),
}));
