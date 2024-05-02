import * as S from '@/styles/parent/parentReportListRight.style';
import { ParentReportListItem } from '@/pages/parent/ui/parentReportList/parentReportListItem/parentReportListItem';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';
import { useReportStore } from '@/pages/parent/store';
import { useEffect } from 'react';

export function ParentReportListRight() {
  const reportList = useReportStore((state) => state.reportList);

  useEffect(() => {
    console.log(reportList.data);
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
          {reportList &&
            reportList.data &&
            reportList.data.map((report: any) => (
              <ParentReportListItem
                key={report.reportsId}
                reportsId={report.reportsId}
                reportsSummary={report.reportsSummary}
                reportsKeywords={report.reportsKeywords}
                createdAt={report.createdAt}
              />
            ))}
        </div>
        <div className="scrollbar"></div>
      </div>
    </S.Container>
  );
}
