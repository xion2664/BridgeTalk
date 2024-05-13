import * as S from '@/styles/parent/parentInformationNews.style';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

  const language = useReportStore((state) => state.language);

  useEffect(() => {
    handleNurtureInfoList(language, setInfoList, page, setLastPage);
  }, [page]);

  return (
    <>
      <BackButton path="../information" navigate={navigate} />
      <S.Container>
        <div className="categories">
          <button>전체</button>
          <button>카테고리</button>
          <button>카테고리</button>
          <button>카테고리</button>
          <button>카테고리</button>
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
                  onClick={() => {
                    setPage(idx);
                  }}
                >
                  {idx + 1}
                </button>
              ))}
          <button></button>
        </div>
      </S.Container>
    </>
  );
}
