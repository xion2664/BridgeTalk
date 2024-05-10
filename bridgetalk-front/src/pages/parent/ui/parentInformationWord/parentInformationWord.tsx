import { BackButton } from '@/shared';
import * as S from '@/styles/parent/parentInformationWord.style';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ParentInformationWordListItem } from './parentInformationWordListItem/parentInformationWordListItem';
import { getSlang } from '../../query';

interface Word {
  meaning: string;
  originalWord: string;
  slangId: number;
  slangWord: string;
  vietnamesePronunciation: string;
  vietnameseTranslation: string;
}

export function ParentInformationWord() {
  const navigate = useNavigate();
  const [words, setWords] = useState<Word[]>([]);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    getSlang(page, 7).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setWords(res.data.list);
      }
    });
  }, [page]);

  return (
    <>
      <BackButton path="../information" navigate={navigate} />
      <S.Container>
        <div className="main">
          <div className="main__left">
            <div className="main__left-buttons">
              {Array(6)
                .fill(0)
                .map((it, idx) => (
                  <button
                    key={idx + 1}
                    className={`main__left-buttons-button ${page === idx ? 'active' : null} `}
                    onClick={() => {
                      setPage(idx);
                    }}
                  >
                    {idx + 1}
                  </button>
                ))}
            </div>
            <div className="main__left-list">
              {words.length > 0 && words.map((word: Word) => <div key={word.slangId}>{word.slangWord}</div>)}
            </div>
          </div>
          <div className="main__right"></div>
        </div>
      </S.Container>
    </>
  );
}
