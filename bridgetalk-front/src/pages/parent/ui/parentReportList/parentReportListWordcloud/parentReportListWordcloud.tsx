import * as S from '@/styles/parent/parentReportListWordcloud.style';
import ReactWordcloud from 'react-wordcloud';

export function ParentReportListWordcloud() {
    return (
        <S.Wrapper>
            <div className="title">키워드 분석</div>
            <div className="cloud">
                <ReactWordcloud
                    words={[
                        { text: '학교', value: 3 },
                        { text: '친구', value: 5 },
                        { text: '엄마', value: 2 },
                    ]}
                    options={{ fontFamily: 'DNF' }}
                />
            </div>
        </S.Wrapper>
    );
}
