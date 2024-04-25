import * as S from '@/styles/parent/parentInformationList.style';
import { ParentReportListLeft } from '@/pages/parent/ui/parentReportList/parentReportListLeft/parentReportListLeft';
import { ParentReportListRight } from '@/pages/parent/ui/parentReportList/parentReportListRight/parentReportListRight';

export function ParentReportList() {
    return (
        <S.Container>
            <div>필터</div>
            <S.ContentContainer>
                <ParentReportListLeft />
                <ParentReportListRight />
            </S.ContentContainer>
        </S.Container>
    );
}
