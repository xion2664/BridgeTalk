import * as S from '@/styles/main/selectCountry.style';
import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  country: string;
  setCountry: Dispatch<SetStateAction<string>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

export function SelectCountry({ country, setCountry, page, setPage }: Props) {
  const navigate = useNavigate();

  return (
    <S.Container>
      <div className="top">
        <div className="title">
          <img src={'assets/img/main/selectYourCountry.svg'} />
        </div>
        <div className="countrylist">
          <button className="countrylist__taiwan">
            Taiwan
            <img src={'assets/img/main/commingSoon.svg'} />
          </button>
          <button className="countrylist__vietnam">Vietnam</button>
          <button className="countrylist__china">
            China
            <img src={'assets/img/main/commingSoon.svg'} />
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
        <button className="buttons__next" onClick={() => navigate('/start')}>
          완료
          <img src={'assets/img/main/star.svg'} />
        </button>
      </div>
    </S.Container>
  );
}
