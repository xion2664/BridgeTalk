import * as S from '@/styles/main/start.style';
import { MutableRefObject, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function StartPage() {
  const navigate = useNavigate();

  // Ref
  const signinBtnRef: any = useRef<HTMLButtonElement>();
  const singnupBtnRef: any = useRef<HTMLButtonElement>();

  useEffect(() => {
    setTimeout(() => {
      singnupBtnRef.current.classList.remove('invisible');
    }, 1200);
    setTimeout(() => {
      signinBtnRef.current.classList.remove('invisible');
    }, 1700);
  });

  return (
    <S.Container>
      <div className="title">
        <img src={'assets/img/bridgetalk_red.svg'} />
      </div>
      <div className="buttons">
        <button
          ref={singnupBtnRef}
          className="buttons__signup invisible"
          onClick={() => {
            navigate('../signup');
          }}
        >
          <img src={'assets/img/signupicon.svg'} />
          회원가입
        </button>
        <button
          ref={signinBtnRef}
          className="buttons__siginin invisible"
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
