export function CreatePage() {
  return (
    <div className="createPage">
      <div className="createPage__header">
        <div className="createPage__header-toBack">목록으로 돌아가기</div>
      </div>
      <div className="createPage__container">
        <div className="createPage__container-title">
          <input type="text" placeholder="제목을 입력하세요" required />
        </div>
        <div className="createPage__container-content">
          <textarea name="article" id="article" cols={40} rows={30} placeholder="내용을 입력해주세요"></textarea>
        </div>
        <div className="createPage__container-btns">
          <button>작성 완료</button>
        </div>
      </div>
    </div>
  );
}
