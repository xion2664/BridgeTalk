import { ArticleList } from './components/articleList';

export function BoardPage() {
  return (
    <div className="boardPage">
      <div className="boardPage__header">
        <div className="boardPage__header-title">
          <h1>Community</h1>
          <p>parents' talking</p>
        </div>
        <div className="boardPage__header-side">
          <button>New Article</button>
        </div>
      </div>
      <div className="boardPage__container">
        <div className="boardPage__container-content">
          <ArticleList />
        </div>
        <div className="boardPage__container-content">
          <span>The List is Empty</span>
          <span>Ask a Question and find your Answer!</span>
        </div>
      </div>
    </div>
  );
}
