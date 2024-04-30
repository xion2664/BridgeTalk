import * as S from '@/styles/main/start.style';
import { useNavigate } from 'react-router-dom';

export function StartPage() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <div className="title">BRIDGETALK</div>
      <div className="buttons">
        <button
          className="buttons__signup"
          onClick={() => {
            navigate('../signup');
          }}
        >
          회원가입
        </button>
        <button
          className="buttons__siginin"
          onClick={() => {
            navigate('../signin');
          }}
        >
          로그인
        </button>
      </div>
    </S.Container>
  );
}
