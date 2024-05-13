import * as S from '@/styles/parent/parentInformationNurturDetail.style';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { handleNurtureInfoDetail } from '../../model';
import { useReportStore } from '../../store';

export function ParentInformationNurtureDetail() {
  const { nurtureId } = useParams();
  const [infoDetail, setInfoDetail] = useState<any>();

  const language = useReportStore((state) => state.language);

  useEffect(() => {
    handleNurtureInfoDetail(Number(nurtureId), language, setInfoDetail);
  }, [language]);

  return (
    <S.Container>
      {infoDetail && (
        <div>
          <div>{infoDetail.title}</div>
          <div>{infoDetail.content}</div>
        </div>
      )}
    </S.Container>
  );
}
