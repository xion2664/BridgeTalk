import { Dispatch, SetStateAction } from 'react';
import * as S from '@/styles/main/inputName.style';

interface Props {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  passwordCheck: string;
  setPasswordCheck: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export function InputName({
  name,
  setName,
  nickname,
  setNickname,
  password,
  setPassword,
  passwordCheck,
  setPasswordCheck,
  page,
  setPage,
}: Props) {
  return (
    <S.Container>
      <div className="name">
        <div className="name__title">
          <img src={'assets/img/main/nameicon.svg'} />
        </div>
        <input className="name__input" type="text" />
      </div>
      <div className="nickname">
        <div className="nickname__title">
          <img src={'assets/img/main/nicknameicon.svg'} />
        </div>
        <input className="nickname__input" type="text" />
      </div>
      <div className="password">
        <div className="password__title">
          <img src={'assets/img/main/passwordicon.svg'} />
        </div>
        <input className="password__input" type="text" />
      </div>
      <div className="passwordcheck">
        <div className="passwordcheck__title">
          <img src={'assets/img/main/passwordcheckicon.svg'} />
        </div>
        <input className="passwordcheck__input" type="text" />
      </div>
      <div className="buttons">
        <button
          className="buttons__prev"
          onClick={() => {
            setPage((page) => page - 1);
          }}
        >
          <img src={'assets/img/previcon.svg'} />
          이전
        </button>
        <button
          className="buttons__next"
          onClick={() => {
            setPage((page) => page + 1);
          }}
        >
          다음
          <img src={'assets/img/nexticon.svg'} />
        </button>
      </div>
    </S.Container>
  );
}
