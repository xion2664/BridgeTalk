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

  const [report, setReport] = useState({
    reportsSummary: '오늘 학교에서 친구와 싸워서 기분이 안좋다. 나랑 탕후루 먹으러 같이 안가줘서 서운하다.',
    reportsKeywords: ['학교', '친구', '싸움'],
    reportsSolution: '친구와 싸워서 서운하겠다. 엄마랑 함께 탕후루를 먹으러 가자. 너 기분이 좋아지길 바랄게',
    createdAt: '2024-04-23 24:00:00',
  });
  const [date, setDate] = useState<string[]>(report.createdAt.split(' ')[0].split('-'));

  useEffect(() => {
    console.log(params);
    async function fetchData() {
      try {
        const data: any = await getReportDetail(
          '5810bfe0-5218-41cd-8b71-77417e5b8b44',
          Number(params.reportsId),
          language,
        );

        // setReport(data);
        // setDate(data.createdAt.split(' ')[0].split('-'));
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
          <div className="title">
            {date[0]}년 {date[1]}월 {date[2]}일 분석 리포트
            {/* <TransltaionButton isKor={isKor} setIsKor={setIsKor} /> */}
          </div>
          <div className="content-container">
            <div className="content">
              <S.Keywords>
                {report.reportsKeywords.map((keyword) => (
                  <div className="keyword">#{keyword}</div>
                ))}
              </S.Keywords>
              <S.Summary>{report.reportsSummary}</S.Summary>
            </div>
            <div className="solution">{report.reportsSolution}</div>
          </div>
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
