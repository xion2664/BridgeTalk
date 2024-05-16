import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ArticleListItem() {
  return (
    <div className="articleListItem">
      <div className="articleListItem__main">
          <div className="articleListItem__main-title">우리 애 어캄</div>
          <div className="articleListItem__main-like">
            <FontAwesomeIcon icon={faHeart} />
            <span>(좋아요 수)</span>
          </div>
      </div>
      <div className="articleListItem__sub">
        <div className="articleListItem__sub-keywords">
          <div className="articleListItem__sub-keywords-keyword">키워드1</div>
          <div className="articleListItem__sub-keywords-keyword">키워드2</div>
          <div className="articleListItem__sub-keywords-keyword">키워드3</div>
        </div>
        <div className="articleListItem__sub-date">08:19 Dec 10th 2023</div>
      </div>
    </div>
  );
}
