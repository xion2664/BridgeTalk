import { Dispatch, SetStateAction } from 'react';

interface Props {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  passwordCheck: string;
  setPasswordCheck: Dispatch<SetStateAction<string>>;
}

export function InputName({
  name,
  setName,
  nickname,
  setNickname,
  password,
  setPassword,
  passwordCheck,
  setPasswordCheck,
}: Props) {
  return <div></div>;
}
