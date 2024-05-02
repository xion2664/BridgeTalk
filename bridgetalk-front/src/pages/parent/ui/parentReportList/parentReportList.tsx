import * as S from '@/styles/parent/parentReportList.style';
import { ParentReportListLeft } from '@/pages/parent/ui/parentReportList/parentReportListLeft/parentReportListLeft';
import { ParentReportListRight } from '@/pages/parent/ui/parentReportList/parentReportListRight/parentReportListRight';
import { BackButton, customAxios } from '@/shared';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getReportList } from '../../query';

export function ParentReportList() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = getReportList('5810bfe0-5218-41cd-8b71-77417e5b8b44', 'kor');
    console.log(fetchData);
  }, []);
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
