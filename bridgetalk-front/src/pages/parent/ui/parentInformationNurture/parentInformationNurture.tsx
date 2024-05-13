import * as S from '@/styles/parent/parentInformationNews.style';

import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { BackButton } from '@/shared';
import { handleNurtureInfoList } from '../../model';
import { useReportStore } from '../../store';

interface Info {
  parentingInfoId?: number;
  title?: string;
  content?: string;
  link?: string;
  category?: string;
}

export function ParentInformationNurture() {
  const navigate = useNavigate();
  const [infoList, setInfoList] = useState<Info[]>([]);
  const [page, setPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(0);
  const [searchCategory, setSearchCategory] = useState<any>('');

  const language = useReportStore((state) => state.language);

  const category = useMemo(
    () => ({
      prospective: 0,
      infant_and_toddler: 1,
      school: 2,
      puberty: 3,
    }),
    [],
  );

  const categories = useMemo(
    () => ({
      kor: ['예비', '영유아기', '학령기', '사춘기'],
      viet: ['Chuẩn bị', 'Thời kỳ ấu thơ', 'Thời kỳ đến trường', 'Thời kỳ dậy thì'],
    }),
    [],
  );

  useEffect(() => {
    handleNurtureInfoList(language, setInfoList, page, setLastPage, searchCategory);
  }, [page]);

  useEffect(() => {
    setPage(0);
    handleNurtureInfoList(language, setInfoList, 0, setLastPage, searchCategory);
  }, [searchCategory]);

  return (
    <>
      <BackButton path="../information" navigate={navigate} />
      <S.Container>
        <div className="categories">
          {['prospective', 'infant_and_toddler', 'school', 'puberty'].map((it, idx) => (
            <button
              className={`${page === idx ? 'active' : ''}`}
              style={{ fontFamily: language === 'kor' ? 'DNF' : 'Pretendard' }}
              onClick={() => {
                setSearchCategory(it);
              }}
            >
              {categories[language][idx]}
            </button>
          ))}
        </div>
        <div className="main">
          {infoList.length > 0 &&
            infoList.map((it) => (
              <div className="main__item" key={it.parentingInfoId}>
                <div className="main__item-num">{it.parentingInfoId}</div>
                <div className="main__item-category">{it.category}</div>
                <div className="main__item-title">{it.title}</div>
              </div>
            ))}
        </div>
        <div className="pagenation">
          {infoList.length > 0 &&
            Array(lastPage)
              .fill(0)
              .map((it, idx) => (
                <button
                  className={`${page === idx ? 'active' : ''}`}
                  onClick={() => {
                    setPage(idx);
                  }}
                >
                  {idx + 1}
                </button>
              ))}
        </div>
      </S.Container>
    </>
  );
}
