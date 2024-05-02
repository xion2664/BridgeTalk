import { Dispatch, SetStateAction } from 'react';
import * as S from '@/styles/main/inputName.style';
import { useSignupStore } from '@/pages/main/store';

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
}

export function InputName({ setPage }: Props) {
  const { name, setName, nickname, setNickname, password, setPassword, passwordCheck, setPasswordCheck } =
    useSignupStore((state) => ({
      name: state.name,
      setName: state.setName,
      nickname: state.nickname,
      setNickname: state.setNickname,
      password: state.password,
      setPassword: state.setPassword,
      passwordCheck: state.passwordCheck,
      setPasswordCheck: state.setPasswordCheck,
    }));

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
