import { ParentBackButton } from '@/shared';
import * as S from '@/styles/parent/parentReportListItem.style';
import { useNavigate } from 'react-router-dom';

interface Props {
    reportsId: number;
    reportsSummary: string;
    reportsKeywords: string[];
    createdAt: string;
}

export function ParentReportListItem({ reportsId, reportsSummary, reportsKeywords, createdAt }: Props) {
    const navigate = useNavigate();

    return (
        <S.Container onClick={() => navigate(`${reportsId}`)}>
            <S.Content>
                <S.ContentHeader>
                    <div>{createdAt}</div>
                    <div>
                        {reportsKeywords.map((keyword, idx) => (
                            <span key={idx}>{keyword}</span>
                        ))}
                    </div>
                </S.ContentHeader>
                <S.ContentBody>{reportsSummary}</S.ContentBody>
            </S.Content>
        </S.Container>
    );
}
