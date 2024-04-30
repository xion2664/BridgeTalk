import * as S from '@/styles/parent/parentReportListRight.style';
import { ParentReportListItem } from '@/pages/parent/ui/parentReportList/parentReportListItem/parentReportListItem';
import { FaSearch, FaCalendarAlt } from 'react-icons/fa';

export function ParentReportListRight() {
    const fetchData = [
        {
            reportsId: 1,
            reportsSummary: '오늘 학교에서 친구와 싸워서 기분이 안좋다.',
            reportsKeywords: ['학교', '친구', '싸움'],
            createdAt: '2024-04-23 24:00:00',
        },
        {
            reportsId: 2,
            reportsSummary: '엄마랑 놀이동산에 가고 싶은데 내 마음을 몰라준다.',
            reportsKeywords: ['놀이동산', '엄마'],
            createdAt: '2024-04-23 24:00:00',
        },
        {
            reportsId: 3,
            reportsSummary: '엄마랑 놀이동산에 가고 싶은데 내 마음을 몰라준다.',
            reportsKeywords: ['놀이동산', '엄마'],
            createdAt: '2024-04-23 24:00:00',
        },
        {
            reportsId: 4,
            reportsSummary: '엄마랑 놀이동산에 가고 싶은데 내 마음을 몰라준다.',
            reportsKeywords: ['놀이동산', '엄마'],
            createdAt: '2024-04-23 24:00:00',
        },
        {
            reportsId: 5,
            reportsSummary: '엄마랑 놀이동산에 가고 싶은데 내 마음을 몰라준다.',
            reportsKeywords: ['놀이동산', '엄마'],
            createdAt: '2024-04-23 24:00:00',
        },
        {
            reportsId: 6,
            reportsSummary: '엄마랑 놀이동산에 가고 싶은데 내 마음을 몰라준다.',
            reportsKeywords: ['놀이동산', '엄마'],
            createdAt: '2024-04-23 24:00:00',
        },
    ];

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
                    {fetchData.map((it) => (
                        <ParentReportListItem
                            key={it.reportsId}
                            reportsId={it.reportsId}
                            reportsSummary={it.reportsSummary}
                            reportsKeywords={it.reportsKeywords}
                            createdAt={it.createdAt}
                        />
                    ))}
                </div>
                <div className="scrollbar"></div>
            </div>
        </S.Container>
    );
}
