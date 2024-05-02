import { Dispatch, SetStateAction } from 'react';
import * as S from '@/styles/main/inputName.style';
import { useSignupStore } from '@/pages/main/store';
import { validatePassword } from '@/pages/main/model';

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
        <input
          className="name__input"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="nickname">
        <div className="nickname__title">
          <img src={'assets/img/main/nicknameicon.svg'} />
        </div>
        <input
          className="nickname__input"
          type="text"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
      </div>
      <div className="password">
        <div className="password__title">
          <img src={'assets/img/main/passwordicon.svg'} />
        </div>
        <input
          className="password__input"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="passwordcheck">
        <div className="passwordcheck__title">
          <img src={'assets/img/main/passwordcheckicon.svg'} />
        </div>
        <input
          className="passwordcheck__input"
          type="password"
          value={passwordCheck}
          onChange={(e) => {
            setPasswordCheck(e.target.value);
          }}
        />
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
            if (!validatePassword(password)) {
              alert('비밀번호는 영문, 숫자 포함 8자 ~ 20자 이내이며\n특수문자(!@#$%^&*+=-)를 포함할 수 있습니다.');
              return;
            }
            if (password !== passwordCheck) {
              alert('입력한 비밀번호가 일치하지 않습니다.');
              return;
            }

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
