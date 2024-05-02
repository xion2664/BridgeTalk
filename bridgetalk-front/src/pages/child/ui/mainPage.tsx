import * as S from '@/styles/parent/parentInformationNews.style';

export function mainPage() {
  return (
    <div className="childMain">
      <div className="childMain__header">
        <div className="childMain__header-toHome"></div>
        <div className="childMdain__header-setting"></div>
      </div>
      <div className="childMain__container">
        <div className="childMain__container-title">
          <h1>WELCOME TO BRIDGE TALK!</h1>
        </div>
        <div className="childMain__container-content">
          <div className="childMain__container-content-toTalk">
            <span>대화 나누기</span>
          </div>
          <div className="childMain__container-content-dino">
            <span>"menu description"</span>
          </div>
          <div className="childMain__container-content-toGame">
            <span>게임하기</span>
          </div>
        </div>
      </div>
      <div className="childMain__footer">
        <div className="childMain__footer-help"></div>
      </div>
    </div>
  );
}
