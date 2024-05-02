// src/components/RegisterComponent.tsx
import { useState } from 'react';
import { useRegister } from '@/pages/main/query/register';
import * as S from '@/styles/main/signup.style';
import { InputEmail } from './components/inputEmail';
import { InputName } from './components/inputName';
import { SelectDino } from './components/selectDino';
import { SelectCountry } from './components/selectCountry';
import { useNavigate } from 'react-router-dom';
import { HomeButton } from '@/shared';
import { postSignup } from '../../query';
import { useSignupStore } from '../../store';

export function SignUpPage() {
  const navigate = useNavigate();

  const [page, setPage] = useState<number>(0);

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

  function handleSignup(email: string, password: string, name: string, nickname: string, dino: string) {
    console.log(email, password, name, nickname, dino);

    postSignup({
      parentsEmail: email,
      parentsPassword: password,
      parentsName: name,
      parentsNickname: nickname,
      parentsDino: dino,
    }).then((res) => console.log(res));
  }

  return (
    <S.Container>
      <HomeButton navigate={navigate} />
      {page === 0 && <InputEmail setPage={setPage} />}
      {page === 1 && <InputName setPage={setPage} />}
      {page === 2 && <SelectDino setPage={setPage} />}
      {page === 3 && <SelectCountry setPage={setPage} handleSignup={handleSignup} />}
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
