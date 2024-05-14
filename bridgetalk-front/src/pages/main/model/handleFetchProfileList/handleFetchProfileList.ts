import { decodeToken } from '@/shared';
import { getProfileList } from '../../query';

export function handleFetchProfileList(accessToken: string, setProfileList: any) {
  let profileList: any[] = [];
  if (accessToken) {
    getProfileList(accessToken).then((res: any) => {
      if (res && res.data) {
        profileList = res.data.profileList.splice(1);
      }
    });
  } else if (decodeToken('access') !== null) {
    getProfileList(decodeToken('access')!).then((res: any) => {
      if (res && res.data) {
        profileList = res.data.profileList.splice(1);
      }
    });
  }

  setProfileList(profileList);
}
