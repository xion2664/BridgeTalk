import React, { useState } from 'react';
import { HomeButton2 } from '@/shared';
import * as S from '@/styles/child/childMain.style';
import { useNavigate } from 'react-router-dom';
import { MovingScreen } from '@/shared/ui/loading/movingScreen';

export function ChildPage() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true); // 모달 상태 관리
  const navigate = useNavigate();

  const handleCloseWelcomeScreen = () => {
    setShowWelcomeScreen(false);
  };

  return (
    <>
      {showWelcomeScreen && <MovingScreen onClose={handleCloseWelcomeScreen} />}
      {!showWelcomeScreen && (
        <>
          <HomeButton2 navigate={navigate} />
          <S.Container>
            <div className="childMain">
              <div className="childMain__header">
                <div className="childMain__header-toHome"></div>
                <div className="childMain__header-setting"></div>
              </div>
              <div className="childMain__container">
                <div className="childMain__container-title">
                  <img src={'assets/img/pic/childMenu.svg'} alt="Child Menu" />
                </div>
                <div className="childMain__container-content">
                  <div className="childMain__container-content-toMessage">
                    <img
                      src={'assets/img/child/toMessage.svg'}
                      alt="To Message"
                      onClick={() => {
                        navigate('/message/list');
                      }}
                    />
                  </div>
                  <div className="childMain__container-content-toTalk">
                    <img
                      src={'assets/img/child/toTalk.svg'}
                      alt="To Talk"
                      onClick={() => {
                        navigate('/talk');
                      }}
                    />
                  </div>
                  <div className="childMain__container-content-toGame">
                    <img
                      src={'assets/img/child/toGame.svg'}
                      alt="To Game"
                      onClick={() => {
                        navigate('/game');
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="childMain__footer">　</div>
            </div>
          </S.Container>
        </>
      )}
    </>
  );
}
