import * as S from '@/styles/main/profilePage.style';
import { useNavigate } from 'react-router-dom';

export function ProfilePage() {
  const navigate = useNavigate();

  const user = [
    {
      id: 0,
      dino: 'assets/img/D1.svg',
      name: '이름1',
    },
    {
      id: 1,
      dino: 'assets/img/D1.svg',
      name: '이름2',
    },
  ];
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
          {user.map((it) => (
            <div className="main__profilelist-item" key={it.id}>
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
                  src={it.dino}
                  alt="캐릭터"
                  onClick={() => {
                    navigate('/child');
                  }}
                />
              </div>
              <div className="main__profilelist-item-title">{it.name}</div>
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
