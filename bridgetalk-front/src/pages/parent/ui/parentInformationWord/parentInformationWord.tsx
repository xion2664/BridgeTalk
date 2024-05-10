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

  useEffect(() => {
    getSlang(0, 10).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setWords(res.data.list);
      }
    });
  }, []);

  return (
    <>
      <BackButton path="../information" navigate={navigate} />
      <S.Container>
        <div className="main">
          <div className="main__left">
            <div className="main__left-buttons">
              <button
                className="main__left-buttons-button"
                onClick={() => {
                  getSlang(0, 10).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                      setWords(res.data.list);
                    }
                  });
                }}
              >
                1
              </button>
              <button
                className="main__left-buttons-button"
                onClick={() => {
                  getSlang(1, 10).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                      setWords(res.data.list);
                    }
                  });
                }}
              >
                2
              </button>
              <button
                className="main__left-buttons-button"
                onClick={() => {
                  getSlang(2, 10).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                      setWords(res.data.list);
                    }
                  });
                }}
              >
                3
              </button>
              <button
                className="main__left-buttons-button"
                onClick={() => {
                  getSlang(3, 10).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                      setWords(res.data.list);
                    }
                  });
                }}
              >
                4
              </button>
              <button
                className="main__left-buttons-button"
                onClick={() => {
                  getSlang(4, 10).then((res) => {
                    console.log(res);
                    if (res.status === 200) {
                      setWords(res.data.list);
                    }
                  });
                }}
              >
                5
              </button>
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
