import { useEffect, useMemo, useState } from 'react';
import { ArticleList } from './components/articleList';
import * as S from '@/styles/parent/boardPage.style';
import { useBoardStore, useReportStore } from '../../store';
import { getBoardList } from '../../query';

// infant_and_toddler', 'school', 'puberty'
export function BoardPage() {
  const language = useReportStore((state) => state.language);
  const boardStore = useBoardStore();

  const [page, setPage] = useState<number>(0);

  function activeCategory(category: string, searchType: string) {
    const map: any = {
      제목: '제목',
      작성자: '작성자',
      내용: '내용과레포트요약',
    };

    return map[category] === searchType ? 'active' : '';
  }
  const categories = useMemo(
    () => ({
      kor: ['제목', '작성자', '내용'],
      viet: [],
      ph: [],
    }),
    [],
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBoardList(language, page, '내용과레포트요약', '', boardStore.sortType);
        console.log(data);
      } catch (err) {}
    }
    fetchData();
  }, [language]);

  return (
    <S.Container>
      <div className="boardPage">
        <div className="boardPage__categories">
          <button
            className={`boardPage__categories-title ${activeCategory(boardStore.searchType, '제목')}`}
            onClick={() => {
              boardStore.setSearchType('제목');
            }}
          >
            {categories[language][0]}
          </button>
          <button
            className={`boardPage__categories-writer ${activeCategory(boardStore.searchType, '작성자')} `}
            onClick={() => {
              boardStore.setSearchType('작성자');
            }}
          >
            {categories[language][1]}
          </button>
          <button
            className={`boardPage__categories-content ${activeCategory(boardStore.searchType, '내용과레포트요약')}`}
            onClick={() => {
              boardStore.setSearchType('내용');
            }}
          >
            {categories[language][2]}
          </button>
        </div>
        <div className="boardPage__search">
          <form className="boardPage__search-form">
            <input className="boardPage__search-input" type="text" placeholder="검색어를 입력해주세요"></input>
            <button className="boardPage__search-button">
              <img src={`/assets/img/parent/community/search_solid.svg`} />
            </button>
          </form>
        </div>
      </div>
      <div className="sort">
        <button className="sort__latest"></button>
        <button className="sort__popular"></button>
      </div>
      <button className="write"></button>
    </S.Container>
  );
}

function BoardList() {
  return <div className="boardPage__list"></div>;
}
