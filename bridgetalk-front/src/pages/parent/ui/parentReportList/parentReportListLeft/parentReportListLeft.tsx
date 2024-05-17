import { useReportStore } from '@/pages/parent/store';
import { dateToString } from '@/shared';
import * as S from '@/styles/parent/parentReportListLeft.style';
import { useEffect, useMemo, useState } from 'react';

interface Board {
  boardId: number;
  boardsTitle: string;
  boardsContent: string;
  likes: number;
  createdAt: string;
  reportsSummary: string;
  reportsKeywords: string[];
  writer: string;
}

export function ParentReportListLeft() {
  const [boardList, setBoardList] = useState<Board[]>([]);
  const language = useReportStore((state) => state.language);

  const title = useMemo(
    () => ({
      kor: '게시판',
      viet: 'một bảng thông báo',
      ph: '',
    }),
    [],
  );
  useEffect(() => {
    const tmp = [
      {
        boardId: 3,
        boardsTitle: '제목 테스트',
        boardsContent: '내용 테스트',
        likes: 0,
        createdAt: '2024-05-13T13:33:28.005731',
        reportsSummary: ' 생각이 들어 위험하고 거기에 약간의 도전도 있어.',
        reportsKeywords: ['놀이동산', '엄마', '롤러코스터'],
        writer: '부모닉네임',
      },
      {
        boardId: 3,
        boardsTitle: '제목 테스트',
        boardsContent: '내용 테스트',
        likes: 0,
        createdAt: '2024-05-13T13:33:28.005731',
        reportsSummary: ' 생각이 들어 위험하고 거기에 약간의 도전도 있어.',
        reportsKeywords: ['놀이동산', '엄마', '롤러코스터'],
        writer: '부모닉네임',
      },
      {
        boardId: 3,
        boardsTitle: '제목 테스트',
        boardsContent: '내용 테스트',
        likes: 0,
        createdAt: '2024-05-13T13:33:28.005731',
        reportsSummary: ' 생각이 들어 위험하고 거기에 약간의 도전도 있어.',
        reportsKeywords: ['놀이동산', '엄마', '롤러코스터'],
        writer: '부모닉네임',
      },
      {
        boardId: 3,
        boardsTitle: '제목 테스트',
        boardsContent: '내용 테스트',
        likes: 0,
        createdAt: '2024-05-13T13:33:28.005731',
        reportsSummary: ' 생각이 들어 위험하고 거기에 약간의 도전도 있어.',
        reportsKeywords: ['놀이동산', '엄마', '롤러코스터'],
        writer: '부모닉네임',
      },
      {
        boardId: 3,
        boardsTitle: '제목 테스트',
        boardsContent: '내용 테스트',
        likes: 0,
        createdAt: '2024-05-13T13:33:28.005731',
        reportsSummary: ' 생각이 들어 위험하고 거기에 약간의 도전도 있어.',
        reportsKeywords: ['놀이동산', '엄마', '롤러코스터'],
        writer: '부모닉네임',
      },
    ];

    setBoardList(tmp);
  }, []);

  return (
    <S.Container>
      <div className="main">
        <div className="main__title" style={{ fontFamily: 'Pretendard-Black' }}>
          {title[language]}
        </div>
        <div className="main__content">
          <div className="main__content-list">
            {boardList.length > 0 && boardList.map((board: Board) => <BoardListItem board={board} />)}
          </div>
          {/* <div className="main__content-input"></div> */}
        </div>
      </div>
    </S.Container>
  );
}

interface BoardListItem {
  board: Board;
}

function BoardListItem({ board }: BoardListItem) {
  return (
    <div className="main__content-list-item">
      <div className="flex">
        <div className="main__content-list-item-title">{board.boardsTitle}</div>
        <div className="main__content-list-item-like">
          <img src={'/assets/img/parent/heart.svg'} alt="like" /> {board.likes}
        </div>
      </div>
      <div className="main__content-list-item-body">{board.boardsContent}</div>
      <div className="main__content-list-item-date">{dateToString(board.createdAt)}</div>
    </div>
  );
}
