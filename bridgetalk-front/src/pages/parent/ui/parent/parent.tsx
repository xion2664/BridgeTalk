import * as S from '@/styles/parent/parent.style';

import { useEffect, useState } from 'react';
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
      <Navbar navigate={navigate} />
      <Outlet />
      <LangIcon />
    </S.Background>
  );
}
function Navbar({ navigate }: any) {
  return (
    <S.Navbar>
      <button
        onClick={() => {
          navigate('main');
        }}
      >
        <img src={`/assets/img/parent/navbar/home_off.svg`} />
      </button>
      <button
        onClick={() => {
          navigate('report');
        }}
      >
        <img src={`/assets/img/parent/navbar/message_off.svg`} />
      </button>
      <button
        onClick={() => {
          navigate('information/nurture');
        }}
      >
        <img src={`/assets/img/parent/navbar/nurture_off.svg`} />
      </button>
      <button
        onClick={() => {
          navigate('information/word');
        }}
      >
        <img src={`/assets/img/parent/navbar/info_off.svg`} />
      </button>
      <button>
        <img src={`/assets/img/parent/navbar/community_off.svg`} />
      </button>
    </S.Navbar>
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
