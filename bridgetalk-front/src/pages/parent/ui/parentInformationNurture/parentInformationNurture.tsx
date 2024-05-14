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

interface Category {
  [key: string]: number;
}

export function ParentInformationNurture() {
  const navigate = useNavigate();
  const [infoList, setInfoList] = useState<Info[]>([]);
  const [page, setPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<number>(0);
  const [searchCategory, setSearchCategory] = useState<any>('prospective');

  const language = useReportStore((state) => state.language);

  const category: Category = useMemo(
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

  const header = useMemo(
    () => ({
      kor: ['번호', '카테고리', '제목'],
      viet: ['Số', 'Phân loại', 'Tiêu đề'],
    }),
    [],
  );
  useEffect(() => {
    handleNurtureInfoList(language, setInfoList, page, setLastPage, searchCategory);
  }, [page, language]);

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
              className={`${searchCategory === it ? 'active' : ''}`}
              style={{
                fontFamily: language === 'kor' ? 'DNF' : 'Pretendard',
                fontSize: language === 'kor' ? `1.3svw` : `1.3svw`,
              }}
              onClick={() => {
                setSearchCategory(it);
              }}
            >
              {categories[language][idx]}
            </button>
          ))}
        </div>
        <div className="main">
          <table>
            <thead className="thead">
              <tr className="main__header">
                {header[language].map((it) => (
                  <td>{it}</td>
                ))}
              </tr>
            </thead>
            <tbody className="tbody">
              {infoList.length > 0 &&
                infoList.map((it) => (
                  <tr
                    className="main__item"
                    key={it.parentingInfoId}
                    onClick={() => {
                      navigate(`${it.parentingInfoId!}`);
                    }}
                  >
                    <td className="main__item-num">{it.parentingInfoId}</td>
                    <td className="main__item-category">{categories[language][category[it.category!]]}</td>
                    <td className="main__item-title">{it.title}</td>
                  </tr>
                ))}
            </tbody>
          </table>
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
