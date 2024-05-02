import { create } from 'zustand';

export const useUserStore = create<any>()((set) => ({
  // userId: 로그인 유저 UUID
  userId: '',
  setUserId: (userId: string) => set({ userId }),

  // userName: 로그인 유저 이름
  userName: '',
  setUserName: (userName: string) => set({ userName }),

  // userEmail: 로그인 유저 이메일
  userEmail: '',
  setUserEmail: (userEmail: string) => set({ userEmail }),

  // userNickname: 로그인 유저 닉네임
  userNickname: '',
  setUserNickname: (userNickname: string) => set({ userNickname }),

  // userDino: 로그인 유저 공룡 캐릭터
  userDino: '',
  setUserDino: (userDino: string) => set({ userDino }),

  // refreshToken: 로그인 유저 리프레시 토큰
  refreshToken: '',
  setRefreshToken: (refreshToken: string) => set({ refreshToken }),

  // accessToken: 로그인 유저 액세스 토큰
  accessToken: '',
  setAccessToken: (accessToken: string) => set({ accessToken }),
}));
