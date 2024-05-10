import * as S from '@/styles/parent/parent.style';

import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useReportStore } from '../../store';
import { getSlang } from '../../query';

export function Parent() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('main');
  }, []);

  return (
    <S.Background>
      <Outlet />
      <LangIcon />
    </S.Background>
  );
}

function LangIcon() {
  const { language, setLanguage } = useReportStore((state) => ({
    language: state.language,
    setLanguage: state.setLangauge,
  }));

  return (
    <button
      className="lang"
      onClick={() => {
        setLanguage(language === 'kor' ? 'viet' : 'kor');
      }}
    >
      {language === 'kor' ? <img src={'/assets/img/ktv.svg'} /> : <img src={'/assets/img/vtk.svg'} />}
    </button>
  );
}
