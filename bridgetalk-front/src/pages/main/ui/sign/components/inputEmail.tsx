import { Dispatch, SetStateAction } from 'react';
import * as S from '@/styles/main/inputEmail.style';
import { useSignupStore } from '@/pages/main/store';
import { validateEmail } from '@/pages/main/model';

interface EmailProps {
  setPage: Dispatch<SetStateAction<number>>;
}

export function InputEmail({ setPage }: EmailProps) {
  const { email, setEmail } = useSignupStore((state) => ({ email: state.email, setEmail: state.setEmail }));

  return (
    <S.Container>
      <div className="email">
        <div className="email__title">
          <img src={'assets/img/main/emailicon.svg'} />
        </div>
        <input className="email__input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        <button className="email__verify">Verify</button>
      </div>
      <div className="confirm">
        <div className="confirm__title">
          <img src={'assets/img/main/emailverifynumbericon.svg'} />
        </div>
        <input className="confirm__input" />
      </div>
      <button
        className="next"
        onClick={() => {
          let alert = '';
          if (!validateEmail(email)) {
            alert += '이메일은 영어(소문자), 숫자만 허용되며 5자 ~ 30자 이내만 가능합니다.';
          }

          if (alert) {
            window.alert(alert);
            return;
          }
          setPage((page) => page + 1);
        }}
      >
        다음
        <img src={'assets/img/nexticon.svg'} />
      </button>
    </S.Container>
  );
}
