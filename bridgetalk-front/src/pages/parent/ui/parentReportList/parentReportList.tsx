import * as S from '@/styles/parent/parentReportList.style';
import { ParentReportListLeft } from '@/pages/parent/ui/parentReportList/parentReportListLeft/parentReportListLeft';
import { ParentReportListRight } from '@/pages/parent/ui/parentReportList/parentReportListRight/parentReportListRight';
import { BackButton, customAxios } from '@/shared';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getReportList } from '../../query';
import { useReportStore } from '../../store';

export function ParentReportList() {
  const navigate = useNavigate();

  const reportList = useReportStore((state) => state.reportList);
  const setReportList = useReportStore((state) => state.setReportList);
  const language = useReportStore((state) => state.language);

  useEffect(() => {
    async function fetchData() {
      try {
        const data: any = await getReportList('5810bfe0-5218-41cd-8b71-77417e5b8b44', language);
        setReportList(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
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
