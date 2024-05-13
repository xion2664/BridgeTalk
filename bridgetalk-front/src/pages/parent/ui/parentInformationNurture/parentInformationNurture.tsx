import * as S from '@/styles/parent/parentInformationNews.style';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BackButton } from '@/shared';
import { handleNurtureInfoList } from '../../model';
import { useReportStore } from '../../store';

export function ParentInformationNurture() {
  const navigate = useNavigate();
  const [infoList, setInfoList] = useState<any[]>([]);

  const language = useReportStore((state) => state.language);

  useEffect(() => {
    handleNurtureInfoList(language, setInfoList);
  }, []);

  return (
    <>
      <BackButton path="../information" navigate={navigate} />
      <S.Container></S.Container>
    </>
  );
}
