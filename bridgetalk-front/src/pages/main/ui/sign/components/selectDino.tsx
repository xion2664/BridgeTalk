import * as S from '@/styles/main/selectDino.style';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  dino: string;
  setDino: Dispatch<SetStateAction<string>>;
}

export function SelectDino({ page, setPage, dino, setDino }: Props) {
  return (
    <S.Container>
      <div className="title">SELECT CHARACTER</div>
      <div className="selectbox">
        <div className="selectbox__title">캐릭터를 선택해주세요</div>
        <div className="selectbox__content">
          <button className="selectbox__content-prev">{'<'}</button>
          <div className="selectbox__content-dino">공룡캐릭터</div>
          <button className="selectbox__content-next">{'>'}</button>
        </div>
      </div>
      <div className="buttons">
        <button
          className="buttons__prev"
          onClick={() => {
            setPage((page) => page - 1);
          }}
        >
          이전
        </button>
        <button
          className="buttons__next"
          onClick={() => {
            setPage((page) => page + 1);
          }}
        >
          다음
        </button>
      </div>
    </S.Container>
  );
}
