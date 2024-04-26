import * as S from '@/styles/parent/parentReportList.style';
import { ParentReportListLeft } from '@/pages/parent/ui/parentReportList/parentReportListLeft/parentReportListLeft';
import { ParentReportListRight } from '@/pages/parent/ui/parentReportList/parentReportListRight/parentReportListRight';
import { ParentBackButton } from '@/shared';
import { useNavigate } from 'react-router-dom';

export function ParentReportList() {
    const navigate = useNavigate();

    return (
        <>
            <ParentBackButton path="../main" navigate={navigate} />
            <S.Container>
                <div>필터</div>
                <S.ContentContainer>
                    <ParentReportListLeft />
                    <ParentReportListRight />
                </S.ContentContainer>
            </S.Container>
        </>
    );
}
