// src/components/RegisterComponent.tsx
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useRegister } from '@/pages/main/query/register';
import * as S from '@/styles/main/signup.style';
import { InputEmail } from './components/inputEmail';
import { InputName } from './components/inputName';
import { SelectDino } from './components/selectDino';
import { SelectCountry } from './components/selectCountry';

export function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [dino, setDino] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  // const registerMutation = useRegister();

  // const handleSubmit = () => {
  //   registerMutation.mutate({
  //     parentsEmail: email,
  //     parentsPassword: password,
  //     parentsName: name,
  //     parentsNickname: nickname,
  //     parentsDino: dino,
  //   });
  // };
  const [page, setPage] = useState<number>(0);

  return (
    <S.Container>
      <button className="back">뒤로가기</button>
      {page === 0 && <InputEmail email={email} setEmail={setEmail} setPage={setPage} />}
      {page === 1 && (
        <InputName
          password={password}
          setPassword={setPassword}
          name={name}
          setName={setName}
          passwordCheck={passwordCheck}
          setPasswordCheck={setPasswordCheck}
          nickname={nickname}
          setNickname={setNickname}
        />
      )}
      {page === 2 && <SelectDino />}
      {page === 3 && <SelectCountry />}
    </S.Container>
  );
}

{
  /* <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
      <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="별명" />
      <input value={dino} onChange={(e) => setDino(e.target.value)} placeholder="공룡 선택" />
      <button onClick={}>등록</button> */
}
