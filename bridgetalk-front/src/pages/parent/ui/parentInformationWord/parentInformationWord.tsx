import { BackButton } from '@/shared';
import * as S from '@/styles/parent/parentInformationWord.style';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ParentInformationWordListItem } from './parentInformationWordListItem/parentInformationWordListItem';
import { ParentInformationWordListItemDetail } from './parentInformationWordListItemDetail/parentInformationWordListItemDetail';

interface Word {
    kwordId: number;
    kwordAbbreviation: string;
}

export function ParentInformationWord() {
    const navigate = useNavigate();
    const [words, setWords] = useState<Word[]>([]);

    useEffect(() => {
        const fetchData = [
            { kwordId: 1, kwordAbbreviation: '문센' },
            { kwordId: 1, kwordAbbreviation: '문센' },
            { kwordId: 1, kwordAbbreviation: '문센' },
        ];

        setWords(fetchData);
    }, []);

    return (
        <>
            <BackButton path="../information" navigate={navigate} />
            <S.Container>
                <S.Header>
                    <button>tiếng lóng</button>
                    <button>sự viết tắt</button>
                </S.Header>
                <S.Body>
                    <S.List>
                        {words.length > 0 &&
                            words.map((word: Word) => (
                                <ParentInformationWordListItem
                                    key={word.kwordId}
                                    kwordAbbreviation={word.kwordAbbreviation}
                                />
                            ))}
                    </S.List>
                    <ParentInformationWordListItemDetail />
                </S.Body>
            </S.Container>
        </>
    );
}
