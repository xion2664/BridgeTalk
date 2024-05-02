import * as S from '@/styles/parent/parentReportListItem.style';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  reportsId: number;
  reportsSummary: string;
  reportsKeywords: string[];
  createdAt: string;
  uuid: string;
  name: string;
  nickname: string;
}

export function ParentReportListItem({
  reportsId,
  reportsSummary,
  reportsKeywords,
  createdAt,
  uuid,
  name,
  nickname,
}: Props) {
  const navigate = useNavigate();
  const [date, setDate] = useState<string[]>([]);

  console.log(reportsId, reportsKeywords, reportsSummary);
  useEffect(() => {
    setDate(createdAt.split('T')[0].split('-'));
  }, []);

  return (
    <S.Container onClick={() => navigate(`${reportsId}`)}>
      <S.Content>
        <S.ContentHeader>
          <div>{date && `${date[0]}년 ${date[1]}월 ${date[2]}일`}</div>
          <div className="tags">
            {reportsKeywords.map((keyword, idx) => (
              <div className="tag" key={idx}>
                #{keyword}
              </div>
            ))}
          </div>
        </S.ContentHeader>
        <S.ContentBody>{reportsSummary}</S.ContentBody>
      </S.Content>
    </S.Container>
  );
}
