import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faHeart,
  faPen,
  faQ,
  faTrashCan,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { ReplyList } from './components/replyList';
import * as S from '@/styles/parent/boardDetailPage.style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function BoardDetailPage() {
  const navigate = useNavigate();

  const [like, setLike] = useState(false);

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
        <div className="boardDetailPage__container">
          <div className="boardDetailPage__container-article">
            <div className="boardDetailPage__container-article-header-title">
              <p>글 제목</p>
            </div>
            <div className="boardDetailPage__container-article-header-function">
              <div className="boardDetailPage__container-article-header-function-like">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className="boardDetailPage__container-article-header-function-share">
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </div>
              <div className="boardDetailPage__container-article-header-function-edit">
                <FontAwesomeIcon icon={faPen} />
              </div>
              <div className="boardDetailPage__container-article-header-function-delete">
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
            </div>
            <div className="boardDetailPage__container-article-report">
              리포트 요약 리포트 요약 리포트 요약 리포트 요약 리포트 요약 리포트 요약 리포트 요약 리포트 요약 리포트
              요약 리포트 요약 리포트 요약 리포트 요약 리포트 요약 리포트 요약 리포트 요약 리포트 요약 리포트 요약
              리포트 요약 리포트 요약 리포트 요약 리포트 요약 리포트 요약 리포트 요약 리포트 요약 리포트 요약 리포트
              요약 리포트 요약 리포트 요약 리포트 요약 리포트 요약 리포트 요약
            </div>
            <div className="boardDetailPage__container-article-content">
              글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글
              내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글
              내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글
              내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글
              내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글
              내용 글 내용 글 내용 글 내용
            </div>
            <div className="boardDetailPage__container-article-keywords">
              <div className="boardDetailPage__container-article-keywords-keyword">키워드1</div>
              <div className="boardDetailPage__container-article-keywords-keyword">키워드1</div>
              <div className="boardDetailPage__container-article-keywords-keyword">키워드1</div>
            </div>
          </div>

          <div className="boardDetailPage__container-reply">
            <div className="boardDetailPage__container-reply-write">
              <div className="boardDetailPage__container-reply-write-intro">
                <h2>답글을 작성하고 사용자와 의견을 나눠보세요.</h2>
                <button>답글 작성하기</button>
              </div>
              <div className="boardDetailPage__container-reply-write-slide">{/* <replyCreate /> */}</div>
            </div>
            <ReplyList />
          </div>
        </div>
      </div>
    </S.Container>
  );
}
