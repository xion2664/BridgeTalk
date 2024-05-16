import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faHeart,
  faPen,
  faQ,
  faTrashCan,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';

export function ArticlePage() {
  return (
    <div className="articlePage">
      <div className="articlePage__header"></div>

      <div className="articlePage__container">
        <div className="articlePage__container-article">
          <div className="articlePage__container-article-header-title">
            <p>글 제목</p>
          </div>
          <div className="articlePage__container-article-header-function">
            <div className="articlePage__container-article-header-function-like">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className="articlePage__container-article-header-function-share">
              <FontAwesomeIcon icon={faUpRightFromSquare} />
            </div>
            <div className="articlePage__container-article-header-function-edit">
              <FontAwesomeIcon icon={faPen} />
            </div>
            <div className="articlePage__container-article-header-function-delete">
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          </div>
          <div className="articlePage__container-article-content">
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글
            내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글
            내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용
            글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글 내용 글
            내용 글 내용
          </div>
        </div>

        <div className="articlePage__container-reply">
          <div className="articlePage__container-reply-write">
            <div className="articlePage__container-reply-write-intro">
              <h2>답글을 작성하고 사용자와 의견을 나눠보세요.</h2>
              <button>답글 작성하기</button>
            </div>
            <div className="articlePage__container-reply-write-slide">{/* <replyCreate /> */}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
