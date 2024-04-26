import * as S from '@/styles/parent/parentInformationListRight.style';
import { ParentReportListItem } from '@/pages/parent/ui/parentReportList/parentReportListItem/parentReportListItem';

export function ParentReportListRight() {
    const fetchData = [
        {
            reportsId: 1,
            reportsSummary: '오늘 학교에서 친구와 싸워서 기분이 안좋다',
            reportsKeywords: ['학교', '친구', '싸움'],
            createdAt: '2024-04-23 24:00:00',
        },
        {
            reportsId: 2,
            reportsSummary: '엄마랑 놀이동산에 가고 싶은데 내 마음을 몰라준다.',
            reportsKeywords: ['놀이동산', '엄마'],
            createdAt: '2024-04-23 24:00:00',
        },
    ];

    return (
        <S.Container>
            {fetchData.map((it) => (
                <ParentReportListItem
                    key={it.reportsId}
                    reportsId={it.reportsId}
                    reportsSummary={it.reportsSummary}
                    reportsKeywords={it.reportsKeywords}
                    createdAt={it.createdAt}
                />
            ))}
        </S.Container>
    );
}
