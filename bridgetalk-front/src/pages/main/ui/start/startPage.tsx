import { customAxios } from '@/shared';
import * as S from '@/styles/main/start.style';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store';

export function StartPage() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <div className="title">
        <img src={'assets/img/bridgetalk_red.svg'} />
      </div>
      <div className="buttons">
        <button
          className="buttons__signup"
          onClick={() => {
            navigate('../signup');
          }}
        >
          <img src={'assets/img/signupicon.svg'} />
          회원가입
        </button>
        <button
          className="buttons__siginin"
          onClick={() => {
            navigate('../signin');
          }}
        >
          <img src={'assets/img/signinicon.svg'} />
          로그인
        </button>
      </div>
    </S.Container>
  );
}
