import * as S from '@/styles/parent/parentReportDetail.style';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ParentReportDetailRecorder } from './parentReportDetailRecorder/parentReportDetailRecorder';
import { ParentBackButton } from '@/shared';

export function ParentReportDetail() {
    const navigate = useNavigate();

    const fetchData = {
        reportsSummary: '오늘 학교에서 친구와 싸워서 기분이 안좋다. 나랑 탕후루 먹으러 같이 안가줘서 서운하다.',
        reportsKeywords: ['학교', '친구', '싸움'],
        reportsSolution: '친구와 싸워서 서운하겠다. 엄마랑 함께 탕후루를 먹으러 가자. 너 기분이 좋아지길 바랄게',
        createdAt: '2024-04-23 24:00:00',
    };

    return (
        <>
            <ParentBackButton path="../report" navigate={navigate} />
            <S.Container>
                <div>{fetchData.createdAt}</div>
                <S.ContentContainer>
                    <div className="leftside">
                        <div>
                            <S.Keywords>
                                {fetchData.reportsKeywords.map((keyword) => (
                                    <div>{keyword}</div>
                                ))}
                            </S.Keywords>
                            <S.Summary>{fetchData.reportsSummary}</S.Summary>
                        </div>
                        <S.Solution>{fetchData.reportsSolution}</S.Solution>
                    </div>
                    <ParentReportDetailRecorder />
                </S.ContentContainer>
            </S.Container>
        </>
    );
}
