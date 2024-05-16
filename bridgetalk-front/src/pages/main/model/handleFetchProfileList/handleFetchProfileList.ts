import { decodeToken } from '@/shared';
import { getProfileList } from '../../query';

export async function handleFetchProfileList(accessToken: string, setProfileList: any) {
  let response;

  try {
    if (accessToken) {
      response = await getProfileList(accessToken);
    } else if (decodeToken('access') !== null) {
      response = await getProfileList(decodeToken('access')!);
    }

    if (response && response.data) {
      setProfileList(response.data.profileList);
    }
  } catch (err) {
    console.log(err);
  }
}
