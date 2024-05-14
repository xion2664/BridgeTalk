import { HomeButton2 } from '@/shared';
import * as S from '@/styles/child/childMain.style';
import { useNavigate } from 'react-router-dom';

export function ChildPage() {
  const navigate = useNavigate();

  return (
    <>
      <HomeButton2 navigate={navigate} />
      <S.Container>
        <div className="childMain">
          <div className="childMain__header">
            <div className="childMain__header-toHome"></div>
            <div className="childMdain__header-setting"></div>
          </div>
          <div className="childMain__container">
            <div className="childMain__container-title">
              <img src={'assets/img/pic/childMenu.svg'} />
            </div>
            <div className="childMain__container-content">
              <div className="childMain__container-content-toMessage">
                <img
                  src={'assets/img/child/toMessage.svg'}
                  onClick={() => {
                    navigate('/message/list');
                  }}
                />
              </div>
              <div className="childMain__container-content-toTalk">
                <img
                  src={'assets/img/child/toTalk.svg'}
                  onClick={() => {
                    navigate('/talk');
                  }}
                />
              </div>
              <div className="childMain__container-content-toGame">
                <img
                  src={'assets/img/child/toGame.svg'}
                  onClick={() => {
                    navigate('/game');
                  }}
                />
              </div>
            </div>
          </div>
          <div className="childMain__footer">
            <div className="childMain__footer-help"></div>
          </div>
        </div>
      </S.Container>
    </>
  );
}
