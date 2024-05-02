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

export function SignUpPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [dino, setDino] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [country, setCountry] = useState<string>('');
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

  function handleSignup(
    email: string,
    password: string,
    passwordCheck: string,
    name: string,
    nickname: string,
    dino: string,
  ) {
    if (password !== passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    postSignup({
      parentsEmail: email,
      parentsPassword: password,
      parentsName: name,
      parentsNickname: nickname,
      parnetsDino: dino,
    });
  }

  return (
    <S.Container>
      <HomeButton navigate={navigate} />
      {page === 0 && <InputEmail page={page} setPage={setPage} />}
      {page === 1 && <InputName setPage={setPage} />}
      {page === 2 && <SelectDino page={page} setPage={setPage} />}
      {page === 3 && <SelectCountry page={page} setPage={setPage} handleSignup={handleSignup} />}
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
