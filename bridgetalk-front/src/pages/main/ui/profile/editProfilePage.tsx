import * as S from '@/styles/main/editProfilePage.style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  type: string;
}
export function EditProfilePage({ type }: Props) {
  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();

  return (
    <S.Container>
      {page === 0 && (
        <>
          <button
            className="back"
            onClick={() => {
              navigate('/profile');
            }}
          >
            <img src={'assets/img/main/backIcon.svg'} />
          </button>
          <div className="main">
            <div className="main__content">
              <div className="main__content-title">
                {type === 'new' ? (
                  <img src={'assets/img/main/newProfile.svg'} />
                ) : (
                  <img src={'assets/img/main/editProfile.svg'} />
                )}
              </div>
              <div className="main__content-box">
                <div className="main__content-box-title">이름을 입력해주세요</div>
                <div className="main__content-box-name">
                  <div className="main__content-box-name-title">
                    <img src={'assets/img/main/nameicon.svg'} />
                  </div>
                  <input type="text" className="main__content-box-name-input" />
                </div>
              </div>
            </div>
            <button
              className="main__button"
              onClick={() => {
                setPage((page) => page + 1);
              }}
            >
              다음 <img src={'assets/img/nexticon.svg'} />
            </button>
          </div>
        </>
      )}
      {page === 1 && (
        <>
          <button
            className="back"
            onClick={() => {
              setPage((page) => page - 1);
            }}
          >
            <img src={'assets/img/main/backIcon.svg'} />
          </button>
          <div className="selectDino">
            <div className="title">
              <img src={'assets/img/main/selectCharacter.svg'} />
            </div>
            <div className="selectbox">
              <div className="selectbox__title">캐릭터를 선택해주세요</div>
              <div className="selectbox__content">
                <button className="selectbox__content-prev">
                  <img src={'assets/img/prevTriangle.svg'} />
                </button>
                <div className="selectbox__content-dino">
                  <img src={'assets/img/D1.svg'} />
                </div>
                <button className="selectbox__content-next">
                  <img src={'assets/img/nextTriangle.svg'} />
                </button>
              </div>
            </div>
          </div>
          <div className="buttons">
            <button
              className="buttons__next"
              onClick={() => {
                if (type === 'new') {
                  // new일때는 신규 프로필 추가 로직 작성
                } else if (type === 'edit;') {
                  // edit일때는 프로필 수정 로직 작성
                }
                navigate('/profile');
              }}
            >
              <img src={'assets/img/main/saveIcon.svg'} />
              저장
            </button>
          </div>
        </>
      )}
    </S.Container>
  );
}
