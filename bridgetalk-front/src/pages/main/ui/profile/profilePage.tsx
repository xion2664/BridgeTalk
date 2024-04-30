import * as S from '@/styles/main/profilePage.style';

export function ProfilePage() {
  const user = [
    {
      id: 0,
      dino: 'DINO캐릭터',
      name: '이름1',
    },
    {
      id: 1,
      dino: 'DINO캐릭터',
      name: '이름2',
    },
  ];
  return (
    <S.Container>
      <button className="logout">로그아웃</button>
      <button className="setting">설정</button>
      <div className="main">
        <div className="main__title">PROFILE</div>
        <div className="main__profilelist">
          {user.map((it) => (
            <div className="main__profilelist-item" key={it.id}>
              <div className="main__profilelist-item-dino">{it.dino}</div>
              <div className="main__profilelist-item-title">{it.name}</div>
            </div>
          ))}

          <div className="main__profilelist-empty">+</div>
        </div>
        <div className="main__button">
          <button className="main__button-start">START!</button>
        </div>
      </div>
    </S.Container>
  );
}
