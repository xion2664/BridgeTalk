import { Dispatch, SetStateAction } from 'react';
import * as S from '@/styles/main/inputEmail.style';

interface EmailProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export function InputEmail({ email, setEmail, page, setPage }: EmailProps) {
  return (
    <S.Container>
      <div className="email">
        <div className="email__title">
          <img src={'assets/img/main/emailicon.svg'} />
        </div>
        <input className="email__input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
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
          setPage((page) => page + 1);
        }}
      >
        다음
        <img src={'assets/img/nexticon.svg'} />
      </button>
    </S.Container>
  );
}
