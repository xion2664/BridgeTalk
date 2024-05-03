import { NavigateFunction } from 'react-router-dom';
import { postSignin } from '../../query';

export function handleSignin(requestDto: any, userStore: any, navigate: NavigateFunction) {
  postSignin(requestDto)
    .then((res: any) => {
      if (res.status === 200) {
        const data = res.data;
        // base64 인코딩
        sessionStorage.setItem(
          btoa('access' + process.env.REACT_APP_SECURE_CODE),
          btoa(data.accessToken + process.env.REACT_APP_SECURE_CODE),
        );
        sessionStorage.setItem(
          btoa('refresh' + process.env.REACT_APP_SECURE_CODE),
          btoa(data.refreshToken + process.env.REACT_APP_SECURE_CODE),
        );

        userStore.setUserId(data.userId);
        userStore.setUserDino(data.userDino);
        userStore.setUserEmail(data.userEmail);
        userStore.setUserName(data.name);
        userStore.setUserNickname(data.userNickname);
        userStore.setAccessToken(data.accessToken);
        userStore.setRefreshToken(data.refreshToken);

        navigate('/profile');
      }
    })
    .catch((err) => alert('로그인 정보가 일치하지 않습니다.'));
}
