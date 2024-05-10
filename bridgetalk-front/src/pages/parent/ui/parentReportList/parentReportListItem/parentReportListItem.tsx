import { useReportStore } from '@/pages/parent/store';
import * as S from '@/styles/parent/parentReportListItem.style';
import { useEffect, useMemo, useState } from 'react';
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
  const langauge = useReportStore((state) => state.language);

  const dateWord = useMemo(
    () => ({
      kor: ['년', '월', '일'],
      viet: ['Năm', 'tháng', 'ngày'],
    }),
    [],
  );

  useEffect(() => {
    setDate(createdAt.split('T')[0].split('-'));
  }, []);

  return (
    <S.Container onClick={() => navigate(`${reportsId}`)}>
      <S.Content>
        <S.ContentHeader>
          <div style={{ fontFamily: langauge === 'kor' ? 'DNF' : 'Pretendard' }}>
            {date &&
              `${date[0]}${dateWord[langauge][0]} ${date[1]}${dateWord[langauge][1]} ${date[2]}${dateWord[langauge][2]}`}
          </div>
          <div className="tags">
            {reportsKeywords.map((keyword, idx) => (
              <div className="tag" key={idx} style={{ fontFamily: langauge === 'kor' ? 'DNF' : 'Pretendard' }}>
                #{keyword.trim()}
              </div>
            ))}
          </div>
        </S.ContentHeader>
        <S.ContentBody style={{ fontFamily: langauge === 'kor' ? 'DNF' : 'Pretendard' }}>
          {reportsSummary}
        </S.ContentBody>
      </S.Content>
    </S.Container>
  );
}
