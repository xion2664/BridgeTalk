import * as S from '@/styles/parent/parentMain.style';
import { useNavigate } from 'react-router-dom';

export function ParentMain() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <button className="home">
        <img src={'/assets/img/parent/homeIcon.svg'} />
      </button>
      <div className="logo">
        <img src={'/assets/img/parent/bridgeTalkLogo.svg'} />
      </div>
      <div className="main">
        <button className="main__report" onClick={() => navigate('../report')}>
          nỗi lòng <br />
          con cái
        </button>
        <div className="main__character">
          <img src={'/assets/img/parent/dino.svg'} />
        </div>
        <button className="main__info" onClick={() => navigate('../information')}>
          lấy <br />
          thông tin
        </button>
      </div>
    </S.Container>
  );
}
