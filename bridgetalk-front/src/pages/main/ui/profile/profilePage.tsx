import * as S from '@/styles/main/profilePage.style';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileList, postProfileLogin } from '../../query';
import { decodeToken, setToken } from '@/shared';
import { useUserStore } from '../../store';

interface Profile {
  userId: string;
  userName: string;
  userEmail: string;
  userNickname: string;
  userDino: string;
}

export function ProfilePage() {
  const navigate = useNavigate();

  const [profileList, setProfileList] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { setUserName, setUserDino, refreshToken, accessToken } = useUserStore((state) => ({
    setUserName: state.setUserName,
    setUserDino: state.setUserDino,
    refreshToken: state.refreshToken,
    accessToken: state.accessToken,
  }));

  useEffect(() => {
    if (accessToken) {
      getProfileList(accessToken).then((res: any) => {
        if (res && res.data) {
          setProfileList([...res.data.profileList]);
        }
      });
    } else if (decodeToken('access') !== null) {
      getProfileList(decodeToken('access')!).then((res: any) => {
        if (res && res.data) {
          setProfileList([...res.data.profileList]);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (profileList.length > 0) {
      setIsLoading(false);
    }
  }, [profileList]);

  return (
    <S.Container>
      <button
        className="logout"
        onClick={() => {
          if (confirm('로그아웃 하시겠습니까?')) {
            sessionStorage.clear();
            navigate('/start');
          }
        }}
      >
        <img src={'assets/img/main/logout.svg'} />
      </button>
      <button className="setting">
        <img src={'assets/img/main/setting.svg'} />
      </button>
      {!isLoading && (
        <div className="main">
          <div className="main__title">
            <img src={'assets/img/main/profile.svg'} />
          </div>
          <div className="main__profilelist">
            {profileList.length > 0 &&
              profileList.map((it, idx) => (
                <div
                  className="main__profilelist-item"
                  key={it.userId}
                  onClick={(e) => {
                    e.stopPropagation();
                    postProfileLogin(it.userId).then((res) => {
                      if (res && res.data) {
                        setToken(res.data.accessToken, res.data.refreshToken);
                        navigate(idx > 0 ? '/child' : '/parent');
                      }
                    });
                  }}
                >
                  <button
                    className="main__profilelist-item-edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserDino(it.userDino);
                      setUserName(it.userNickname);
                      navigate('/editProfile');
                    }}
                  >
                    <img src={'assets/img/main/editProfileIcon.svg'} />
                  </button>
                  <div className="main__profilelist-item-dino">
                    <img src={`assets/img/${it.userDino}.svg`} alt="캐릭터" />
                  </div>
                  <div className="main__profilelist-item-title">{it.userName}</div>
                  <div className="main__profilelist-item-nickname">{it.userNickname}</div>
                </div>
              ))}
            <div className="main__profilelist-empty">
              <button
                onClick={() => {
                  navigate('/addProfile');
                }}
              >
                <img src={'assets/img/main/addProfile.svg'} />
              </button>
            </div>
          </div>
          <div className="main__button">
            <button
              className="main__button-start"
              onClick={() => {
                navigate('/parent'); // 스타트 버튼 눌렀을 때 임시로 부모 페이지로 링크
              }}
            >
              START!
            </button>
          </div>
        </div>
      )}
    </S.Container>
  );
}
