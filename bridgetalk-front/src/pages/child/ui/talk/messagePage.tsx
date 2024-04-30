export function messagePage() {
  return (
    <div className="messagePage">
      <div className="messagePage__header">
        <div className="messagePage__header-toBack">
          <span>돌아가기</span>
        </div>
        <div className="messagePage__container">
          <div className="messagePage__container-messageList"></div>
          <div className="messagePage__container-dino">
            <div className="messagePage__container-dino-description">user information</div>
          </div>
        </div>
      </div>
    </div>
  );
}
