import { Dispatch, SetStateAction } from 'react';
import * as S from '@/styles/main/inputEmail.style';

interface EmailProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
}

export function InputEmail({ email, setEmail, setPage }: EmailProps) {
  return (
    <S.Container>
      <div className="email">
        <div className="email__title">Email</div>
        <input className="email__input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
        <button className="email__submit">Verify</button>
      </div>
      <div className="confirm">
        <div className="confirm__title">EmailVerifyNumber</div>
        <input className="confirm__input" />
      </div>
      <button
        className="next"
        onClick={() => {
          setPage(1);
        }}
      >
        다음
      </button>
    </S.Container>
  );
}
