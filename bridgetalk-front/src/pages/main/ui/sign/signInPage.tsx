import React, { useState } from 'react';
import { useLogin } from '@/pages/main/query/login';
import { useUserStore } from '@/pages/main/store/user';

export function SignInPage() {
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
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {/* <button onClick={handleLogin}>로그인</button> */}
    </div>
  );
}
