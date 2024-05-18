import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { ArticleList } from './components/articleList';
import * as S from '@/styles/parent/boardPage.style';
import { useBoardStore, useReportStore } from '../../store';
import { getBoardList } from '../../query';
import React from 'react';
import { handleSearchBoard } from '../../model';
import { SearchTypes } from './boardPage/searchTypes';
import { Input } from './boardPage/input';
import { BoardListItem } from './boardPage/boardListItem';
import { Pagenation } from './boardPage/pagenation';

interface Board {
  boardId: number;
  boardsTitle: string;
  boardsContent: string;
  likes: number;
  createdAt: string;
  reportsSummary: string;
  reportsKeywords: string[];
  parentsNickname: string;
}

// infant_and_toddler', 'school', 'puberty'
export function BoardPage() {
  // Global state
  const language = useReportStore((state) => state.language);
  const boardStore = useBoardStore();

  // State
  const [page, setPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(0);

  // Ref
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchData() {
      const data: any = await handleSearchBoard(language, page, boardStore.searchType, '', boardStore.sortType);

      boardStore.setBoardList(data.data.boardsList);
    }
    fetchData();
  }, [language]);

  return (
    <S.Container>
      <div className="boardPage">
        <SearchTypes />
        <Input ref={inputRef} />
        <div className="boardPage__list">
          {boardStore.boardList && boardStore.boardList.map((board: Board) => <BoardListItem board={board} />)}
        </div>
        <Pagenation page={page} setPage={setPage} list={boardStore.boardList} lastPage={1} />
      </div>
      <div className="sort">
        <button className="sort__latest">최신순</button>
        <button className="sort__popular">인기순</button>
      </div>
      <button className="write"></button>
    </S.Container>
  );
}
