import { decodeToken, getUUIDbyToken } from '@/shared';
import * as S from '@/styles/main/editProfilePage.style';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store';
import { validateName } from '../../model';
import { patchEditProfile } from '../../query/patchEditProfile/patchEditProfile';

interface Props {
  type: string;
}
export function EditProfilePage({ type }: Props) {
  const { userName, setUserName, userDino, setUserDino } = useUserStore((state) => ({
    userName: state.userName,
    setUserName: state.setUserName,
    userDino: state.userDino,
    setUserDino: state.setUserDino,
  }));

  const [page, setPage] = useState<number>(0);
  const [dino, setDino] = useState<number>(Number(userDino[1] - 1));
  const navigate = useNavigate();

  const dinos: any[] = [];
  for (let i = 1; i <= 6; i++) {
    dinos.push(`D${i}`);
  }

  useEffect(() => {
    setUserDino(dinos[dino]);
  }, [dino]);

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
                  <input
                    type="text"
                    defaultValue={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="main__content-box-name-input"
                  />
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
                <button
                  className="selectbox__content-prev"
                  onClick={() => {
                    setDino((dino) => (dino > 0 ? dino - 1 : dino));
                  }}
                >
                  <img src={'assets/img/prevTriangle.svg'} />
                </button>
                <div className="selectbox__content-dino">
                  <img src={`assets/img/${dinos[dino]}.svg`} />
                </div>
                <button
                  className="selectbox__content-next"
                  onClick={() => {
                    setDino((dino) => (dino < dinos.length - 1 ? dino + 1 : dino));
                  }}
                >
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
                } else if (type === 'edit') {
                  if (validateName(userName)) {
                    console.log(dino, userDino);
                    patchEditProfile(
                      {
                        nickname: userName,
                        dino: userDino,
                      },
                      getUUIDbyToken(),
                    ).then((res: any) => console.log(res));
                    alert('정보가 변경됐습니다.');
                  } else {
                    alert('이름은 영어, 한글, 숫자를 포함한 1자 ~ 20자 이내 문자만 허용됩니다.');
                    return;
                  }
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
