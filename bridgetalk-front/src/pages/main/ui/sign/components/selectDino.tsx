import { useSignupStore } from '@/pages/main/store';
import * as S from '@/styles/main/selectDino.style';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setPage: Dispatch<SetStateAction<number>>;
}

export function SelectDino({ setPage }: Props) {
  const { dino, setDino } = useSignupStore((state) => ({
    dino: state.dino,
    setDino: state.setDino,
  }));

  return (
    <S.Container>
      <div className="title">
        <img src={'assets/img/main/selectCharacter.svg'} />
      </div>
      <div className="selectbox">
        <div className="selectbox__title">캐릭터를 선택해주세요</div>
        <div className="selectbox__content">
          <button className="selectbox__content-prev">
            <img src={'assets/img/prevTriangle.svg'} />
          </button>
          <div className="selectbox__content-dino">
            <img src={'assets/img/D1.svg'} />
          </div>
          <button className="selectbox__content-next">
            <img src={'assets/img/nextTriangle.svg'} />
          </button>
        </div>
      </div>
      <div className="buttons">
        <button
          className="buttons__prev"
          onClick={() => {
            setPage((page) => page - 1);
          }}
        >
          <img src={'assets/img/previcon.svg'} />
          이전
        </button>
        <button
          className="buttons__next"
          onClick={() => {
            setPage((page) => page + 1);
          }}
        >
          다음
          <img src={'assets/img/nexticon.svg'} />
        </button>
      </div>
    </S.Container>
  );
}
