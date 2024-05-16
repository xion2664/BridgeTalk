import { setToken } from '@/shared';
import { postProfileLogin } from '../../query';

export async function handleProfileLogin(
  uuid: string,
  password: string,
  userStore: any,
  navigate: any,
  navigatePath: string,
) {
  try {
    const response = await postProfileLogin('7b16b428-0bae-4955-9a4d-d1a93e114856', 'ssafy789');

    if (response && response.data) {
      userStore.setUserDino(response.data.userDino);
      sessionStorage.setItem('dino', response.data.userDino);
      setToken(response.data.accessToken, response.data.refreshToken);
      navigate(navigatePath);
    }
  } catch (err) {
    console.log(err);
  }
}
