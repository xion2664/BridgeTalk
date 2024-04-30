// src/components/RegisterComponent.tsx
import React, { useState } from 'react';
import { useRegister } from '@/pages/main/query/register';

function RegisterComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [dino, setDino] = useState('');

  const registerMutation = useRegister();

  const handleSubmit = () => {
    registerMutation.mutate({
      parentsEmail: email,
      parentsPassword: password,
      parentsName: name,
      parentsNickname: nickname,
      parentsDino: dino,
    });
  };

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" />
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
      <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="별명" />
      <input value={dino} onChange={(e) => setDino(e.target.value)} placeholder="공룡 선택" />
      <button onClick={handleSubmit}>등록</button>
    </div>
  );
}

export default RegisterComponent;
