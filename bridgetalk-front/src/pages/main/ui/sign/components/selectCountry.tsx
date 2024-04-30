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
      <div className="title">Select Your Country</div>
      <div className="countrylist">
        <button className="countrylist__taiwan">Taiwan</button>
        <button className="countrylist__vietnam">Vietnam</button>
        <button className="countrylist__china">China</button>
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
        <button className="buttons__next" onClick={() => navigate('/start')}>
          완료
        </button>
      </div>
    </S.Container>
  );
}
