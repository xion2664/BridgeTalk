import React, { useState } from 'react';
import { useLogin } from '@/pages/main/query/login';
import { useUserStore } from '@/pages/main/store/user';
import { useNavigate } from 'react-router-dom';
import * as S from '@/styles/main/signIn.style';
import { HomeButton } from '@/shared';

export function SignInPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const loginMutation = useLogin();
  // const setUserData = useUserStore((state) => state.setUserData);

  // const handleLogin = () => {
  //   loginMutation.mutate(
  //     { parents_email: email, parents_password: password },
  //     {
  //       onSuccess: (data) => {
  //         // Zustand를 사용하여 사용자 데이터 저장
  //         setUserData({
  //           userId: data.data.userId,
  //           userName: data.data.userName,
  //           userEmail: data.data.userEmail,
  //           userNickname: data.data.userNickname,
  //           userDino: data.data.userDino,
  //         });
  //       },
  //     },
  //   );
  // };

  return (
    <S.Container>
      <HomeButton navigate={navigate} />
      <div className="title">LOGIN</div>
      <div className="email">
        <div className="email__title">Email</div>
        <input type="text" className="email__input" />
      </div>
      <div className="password">
        <div className="password__title">Password</div>
        <input type="text" className="password__input" />
      </div>
      <button
        className="button"
        onClick={() => {
          navigate('/profile');
        }}
      >
        다음
      </button>
      {/* <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
      {/* <button onClick={handleLogin}>로그인</button> */}
    </S.Container>
  );
}
