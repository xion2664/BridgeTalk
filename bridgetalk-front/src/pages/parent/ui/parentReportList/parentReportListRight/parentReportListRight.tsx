import * as S from '@/styles/parent/parentReportListRight.style';
import { ParentReportListItem } from '@/pages/parent/ui/parentReportList/parentReportListItem/parentReportListItem';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import { useReportStore } from '@/pages/parent/store';
import { useEffect } from 'react';

export function ParentReportListRight() {
  const reportList: [] = useReportStore((state) => state.reportList);

  useEffect(() => {
    console.log(reportList);
  }, [reportList]);

  return (
    <S.Container>
      <div className="title">
        <img src={`/assets/img/letter.svg`} />
        <div>아이 속마음 리포트</div>
      </div>
      <div className="filter">
        <div className="calendar">
          <FaCalendarAlt />
          <div>날짜</div>
        </div>
        <button className="due"></button>
        <div>~</div>
        <button className="due"></button>
        <button className="search">
          <FaSearch />
        </button>
      </div>
      <div className="content">
        <div className="list">
          {Array.isArray(reportList) &&
            reportList.map((report: any) => {
              const reportData = report.value.data;

              const arr = reportData.map((it: any) => {
                return (
                  <ParentReportListItem
                    key={it.reportsId}
                    reportsId={it.reportsId}
                    reportsSummary={it.reportsSummary}
                    reportsKeywords={it.reportsKeywords}
                    createdAt={it.createdAt}
                    uuid={report.UUID}
                    name={report.name}
                    nickname={report.nickname}
                  />
                );
              });

              // 저장한 리포트 리스트를 최근 순으로 정렬하기
              arr.sort((a: any, b: any) => {
                return b.props.createdAt - a.props.createdAt;
              });

              return arr;
            })}
        </div>
        <div className="scrollbar"></div>
      </div>
    </S.Container>
  );
}
