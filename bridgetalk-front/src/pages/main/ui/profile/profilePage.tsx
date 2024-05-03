import * as S from '@/styles/main/profilePage.style';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfileList } from '../../query';

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

  const user = [
    {
      userId: 0,
      dino: 'assets/img/D1.svg',
      name: '이름1',
    },
    {
      userId: 'aea81011-0743-4423-8c41-170ff790a5f9',
      userName: '김부모',
      userEmail: 'ssafy123@gamil.com',
      userNickname: '부모닉네임',
      userDino: 'D1',
    },
  ];

  useEffect(() => {
    getProfileList().then((res: any) => {
      if (res && res.data) {
        setProfileList(res.data.profileList);
      }
    });
  }, []);

  return (
    <S.Container>
      <button
        className="logout"
        onClick={() => {
          navigate('/start');
        }}
      >
        <img src={'assets/img/main/logout.svg'} />
      </button>
      <button className="setting">
        <img src={'assets/img/main/setting.svg'} />
      </button>
      <div className="main">
        <div className="main__title">
          <img src={'assets/img/main/profile.svg'} />
        </div>
        <div className="main__profilelist">
          {profileList.length > 0 &&
            profileList.map((it) => (
              <div className="main__profilelist-item" key={it.userId}>
                <button
                  className="main__profilelist-item-edit"
                  onClick={() => {
                    navigate('/editProfile');
                  }}
                >
                  <img src={'assets/img/main/editProfileIcon.svg'} />
                </button>
                <div className="main__profilelist-item-dino">
                  <img
                    src={`assets/img/${it.userDino}.svg`}
                    alt="캐릭터"
                    onClick={() => {
                      navigate('/child');
                    }}
                  />
                </div>
                <div className="main__profilelist-item-title">{it.userName}</div>
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
              navigate('/parent');
              // 스타트 버튼 눌렀을 때 임시로 부모 페이지로 링크
            }}
          >
            START!
          </button>
        </div>
      </div>
    </S.Container>
  );
}
