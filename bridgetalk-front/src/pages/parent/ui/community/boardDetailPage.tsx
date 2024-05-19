import { ReplyList } from './components/replyList';
import * as S from '@/styles/parent/boardDetailPage.style';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBoardStore, useReportStore } from '../../store';
import { getBoardDetail } from '../../query';
import { dateToString } from '@/shared';
import { ReplyRegist } from './boardPage/replyRegist';

interface BoardContent {
  boardsContent: string;
  boardsId: number;
  boardsTitle: string;
  createdAt: string;
  likes: number;
  reportsKeywords: string[];
  reportsSummary: string;
  writer: string;
}

export function BoardDetailPage() {
  const navigate = useNavigate();

  const params = useParams();

  const boardStore = useBoardStore();
  const langauge = useReportStore((state) => state.language);
  const [like, setLike] = useState(false);
  const [board, setBoard] = useState<BoardContent>();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBoardDetail(Number(params.boardId), langauge);

        if (data.status === 200) {
          console.log(data.data);
          setBoard(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <S.Container>
      <div className="boardDetailPage">
        <div className="boardDetailPage__header">
          <button
            className="boardDetailPage__header-btn"
            onClick={() => {
              navigate('/parent/board');
            }}
          >
            <img src={'/assets/img/parent/community/back.svg'} />
          </button>
          <div className="boardDetailPage__header-icons">
            <button className="boiardDetailPage__header-icons-share">
              <img src={'/assets/img/parent/community/share.svg'} />
            </button>
            <button className="boiardDetailPage__header-icons-like">
              <img src={`/assets/img/parent/community/like_${like ? 'solid' : 'empty'}.svg`} />
            </button>
            <div className="boiardDetailPage__header-icons-like-cnt">0</div>
          </div>
        </div>
        <div className="scroll">
          <div className="boardDetailPage__container">
            <div className="boardDetailPage__container-article">
              <div className="boardDetailPage__container-article-header-title">글 제목</div>
              <div className="boardDetailPage__container-article-header-sub">
                <p>{board?.writer}</p>
                <p>{`|`}</p>
                <p>{board && dateToString(board?.createdAt)}</p>
              </div>
              <hr />
              <div className="boardDetailPage__container-article-report">
                {board?.reportsSummary ?? '요약된 리포트 정보가 없습니다.'}
              </div>
              <div className="boardDetailPage__container-article-content">{board?.boardsContent}</div>
              <div className="boardDetailPage__container-article-keywords">
                {board?.reportsKeywords.map((keyword: string) => (
                  <div className="boardDetailPage__container-article-keywords-keyword"># {keyword}</div>
                ))}
              </div>
            </div>
          </div>
          <div className="boardDetailPage__container-reply">
            <div className="boardDetailPage__container-reply-wrapper">
              <ReplyRegist boardsId={board?.boardsId} />
            </div>
            <ReplyList boardId={board?.boardsId} />
          </div>
        </div>
      </div>
    </S.Container>
  );
}
