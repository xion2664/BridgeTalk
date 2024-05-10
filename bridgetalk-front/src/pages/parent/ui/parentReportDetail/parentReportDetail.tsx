import * as S from '@/styles/parent/parentReportDetail.style';
import { useNavigate, useParams } from 'react-router-dom';
import { ParentReportDetailRecorder } from './parentReportDetailRecorder/parentReportDetailRecorder';
import { BackButton } from '@/shared';
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { getReportDetail } from '../../query';
import { useReportStore } from '../../store';

export function ParentReportDetail() {
  // Navigate
  const navigate = useNavigate();

  // Params
  const params = useParams();

  // Global State
  const language = useReportStore((state) => state.language);
  const reports_UUID = useReportStore((state) => state.reports_UUID);

  // State
  const [report, setReport] = useState<any>('');
  const [date, setDate] = useState<string[]>([]);

  const dateWord = useMemo(
    () => ({
      kor: ['년', '월', '일'],
      viet: ['Năm', 'tháng', 'ngày'],
    }),
    [],
  );
  const title = useMemo(
    () => ({
      kor: '분석 리포트',
      viet: 'Báo cáo',
    }),
    [],
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const data: any = await getReportDetail(
          reports_UUID.get(Number(params.reportsId)),
          Number(params.reportsId),
          language,
        );

        setReport(data.data);
        setDate(data.data.createdAt.split('T')[0].split('-'));
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [language]);

  return (
    <>
      <BackButton path="../report" navigate={navigate} />
      <S.ContentContainer>
        <div className="leftside">
          {report && (
            <>
              <div className="title" style={{ fontFamily: language === 'kor' ? 'DNF' : 'Pretendard' }}>
                {date[0]}
                {dateWord[language][0]} {date[1]}
                {dateWord[language][1]} {date[2]}
                {dateWord[language][2]} {title[language]}
                {/* <TransltaionButton isKor={isKor} setIsKor={setIsKor} /> */}
              </div>
              <div className="content-container">
                <div className="content">
                  <S.Keywords>
                    {report.reportsKeywords.map((keyword: any) => (
                      <div className="keyword" style={{ fontFamily: language === 'kor' ? 'DNF' : 'Pretendard' }}>
                        #{keyword.trim()}
                      </div>
                    ))}
                  </S.Keywords>
                  <S.Summary style={{ fontFamily: language === 'kor' ? 'DNF' : 'Pretendard' }}>
                    {report.reportsSummary}
                  </S.Summary>
                </div>
                <div className="solution">{report.reportsSolution}</div>
              </div>
            </>
          )}
        </div>
        <ParentReportDetailRecorder />
      </S.ContentContainer>
    </>
  );
}

interface Props {
  readonly isKor: boolean;
  readonly setIsKor: Dispatch<SetStateAction<boolean>>;
}

function TransltaionButton({ isKor, setIsKor }: Props) {
  return (
    <button
      className="button"
      onClick={() => {
        setIsKor(!isKor);
      }}
    >
      {isKor ? <img src="/assets/img/ktv.svg" /> : <img src="/assets/img/vtk.svg" />}
    </button>
  );
}
