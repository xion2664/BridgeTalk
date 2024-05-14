import { errorCatch } from '@/shared';
import { postSignup } from '../../query';

export async function handleSignup(
  email: string,
  password: string,
  name: string,
  nickname: string,
  dino: string,
  setErrorModalState: any,
) {
  try {
    postSignup({
      parentsEmail: email,
      parentsPassword: password,
      parentsName: name,
      parentsNickname: nickname,
      parentsDino: dino,
    });
  } catch (err) {
    if (err instanceof Error) {
      errorCatch(err, setErrorModalState);
    }
  }
}
