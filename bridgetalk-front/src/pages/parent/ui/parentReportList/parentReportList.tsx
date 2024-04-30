import * as S from '@/styles/parent/parentReportList.style';
import { ParentReportListLeft } from '@/pages/parent/ui/parentReportList/parentReportListLeft/parentReportListLeft';
import { ParentReportListRight } from '@/pages/parent/ui/parentReportList/parentReportListRight/parentReportListRight';
import { BackButton } from '@/shared';
import { useNavigate } from 'react-router-dom';

export function ParentReportList() {
    const navigate = useNavigate();

    return (
        <>
            <BackButton path="../main" navigate={navigate} />
            <S.Container>
                <S.ContentContainer>
                    <ParentReportListRight />
                    <ParentReportListLeft />
                </S.ContentContainer>
            </S.Container>
        </>
    );
}
