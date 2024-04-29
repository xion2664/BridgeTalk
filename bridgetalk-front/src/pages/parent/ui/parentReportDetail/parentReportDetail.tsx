import * as S from '@/styles/parent/parentReportDetail.style';
import { useNavigate } from 'react-router-dom';
import { ParentReportDetailRecorder } from './parentReportDetailRecorder/parentReportDetailRecorder';
import { BackButton } from '@/shared';
import { useEffect, useState } from 'react';

export function ParentReportDetail() {
    const navigate = useNavigate();

    const fetchData = {
        reportsSummary: '오늘 학교에서 친구와 싸워서 기분이 안좋다. 나랑 탕후루 먹으러 같이 안가줘서 서운하다.',
        reportsKeywords: ['학교', '친구', '싸움'],
        reportsSolution: '친구와 싸워서 서운하겠다. 엄마랑 함께 탕후루를 먹으러 가자. 너 기분이 좋아지길 바랄게',
        createdAt: '2024-04-23 24:00:00',
    };
    const [date, setDate] = useState<string[]>([]);

    useEffect(() => {
        setDate(fetchData.createdAt.split(' ')[0].split('-'));
    }, []);

    return (
        <>
            <BackButton path="../report" navigate={navigate} />
            <S.ContentContainer>
                <div className="leftside">
                    <div className="title">
                        {date[0]}년 {date[1]}월 {date[2]}일 아이의 기록
                    </div>
                    <div className="content-container">
                        <div className="content">
                            <S.Keywords>
                                {fetchData.reportsKeywords.map((keyword) => (
                                    <div className="keyword">#{keyword}</div>
                                ))}
                            </S.Keywords>
                            <S.Summary>{fetchData.reportsSummary}</S.Summary>
                        </div>
                        <div className="solution">{fetchData.reportsSolution}</div>
                    </div>
                </div>
                <ParentReportDetailRecorder />
            </S.ContentContainer>
        </>
    );
}
