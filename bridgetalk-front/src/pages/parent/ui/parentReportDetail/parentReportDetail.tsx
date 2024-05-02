import * as S from '@/styles/parent/parentReportDetail.style';
import { useNavigate, useParams } from 'react-router-dom';
import { ParentReportDetailRecorder } from './parentReportDetailRecorder/parentReportDetailRecorder';
import { BackButton } from '@/shared';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getReportDetail } from '../../query';
import { useReportStore } from '../../store';

export function ParentReportDetail() {
  const navigate = useNavigate();
  const params = useParams();

  const language = useReportStore((state) => state.language);
  const reports_UUID = useReportStore((state) => state.reports_UUID);

  const [report, setReport] = useState<any>('');
  const [date, setDate] = useState<string[]>([]);

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
  }, []);

  return (
    <>
      <BackButton path="../report" navigate={navigate} />
      <S.ContentContainer>
        <div className="leftside">
          {report && (
            <>
              <div className="title">
                {date[0]}년 {date[1]}월 {date[2]}일 분석 리포트
                {/* <TransltaionButton isKor={isKor} setIsKor={setIsKor} /> */}
              </div>
              <div className="content-container">
                <div className="content">
                  <S.Keywords>
                    {report.reportsKeywords.map((keyword: any) => (
                      <div className="keyword">#{keyword}</div>
                    ))}
                  </S.Keywords>
                  <S.Summary>{report.reportsSummary}</S.Summary>
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
