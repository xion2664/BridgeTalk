import { customAxios } from '@/shared';
import * as S from '@/styles/parent/parentMain.style';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReportStore } from '../../store';

export function ParentMain() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <button
        className="home"
        onClick={() => {
          navigate('/profile');
        }}
      >
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
