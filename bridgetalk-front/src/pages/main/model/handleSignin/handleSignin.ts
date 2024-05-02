import { postSignin } from '../../query';
import { useUserStore } from '../../store';

export function handleSignin(requestDto: any) {
  postSignin(requestDto)
    .then((res: any) => {
      if (res.status === 200) {
        console.log(res.data);
        const data = res.data;
        sessionStorage.setItem(
          btoa('access' + process.env.REACT_APP_SECURE_CODE),
          btoa(data.accessToken + process.env.REACT_APP_SECURE_CODE),
        );
        sessionStorage.setItem(
          btoa('refresh' + process.env.REACT_APP_SECURE_CODE),
          btoa(data.refreshToken + process.env.REACT_APP_SECURE_CODE),
        );
      }
    })
    .catch((err) => alert('로그인 정보가 일치하지 않습니다.' + err));
}
