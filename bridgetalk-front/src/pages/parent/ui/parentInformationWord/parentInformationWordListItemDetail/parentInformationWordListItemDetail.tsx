import * as S from '@/styles/parent/parentInformationWord.style';
import { useEffect, useState } from 'react';

interface Word {
  kwordId: number;
  kwordAbbreviation: string;
  kwordFullname: string;
  kwordTranslation: string;
  kwordContent: string;
}

export function ParentInformationWordListItemDetail() {
  const [word, setWord] = useState<Word>();
  useEffect(() => {
    const fetchData = {
      kwordId: 1,
      kwordAbbreviation: '문센',
      kwordFullname: '문화센터',
      kwordTranslation: 'trung tâm văn hoá',
      kwordContent: '자역주민이 언제라도 편하게 이용할 수 있는 자율적인 문화 활동의 거점공간',
    };
    setWord(fetchData);
  }, []);

  return (
    <S.ItemDetail>
      {word && (
        <>
          <div>{word.kwordAbbreviation}</div>
          <div>{word.kwordFullname}</div>
          <div>{word.kwordTranslation}</div>
          <div>{word.kwordContent}</div>
        </>
      )}
    </S.ItemDetail>
  );
}
