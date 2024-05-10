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
  const [wordDetail, setWordDetail] = useState<Word | null>(null);

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
              {words.length > 0 &&
                words.map((word: Word) => (
                  <div
                    className="main__left-list-item"
                    key={word.slangId}
                    onClick={() => {
                      setWordDetail(word);
                    }}
                  >
                    {word.slangWord}
                  </div>
                ))}
            </div>
          </div>
          <div className="main__right">
            <div className="main__right-item">
              {wordDetail !== null ? (
                <>
                  <div className="main__right-item-word">
                    <div className="main__right-item-word-kor">{wordDetail.slangWord} </div>
                    <div className="main__right-item-word-viet">{`( ${wordDetail.vietnamesePronunciation} )`}</div>
                  </div>
                  <div className="main__right-item-original">{wordDetail.originalWord}</div>
                  <div className="main__right-item-meaning">{wordDetail.meaning}</div>
                  <div className="main__right-item-vietmeaning">{wordDetail.vietnameseTranslation}</div>
                </>
              ) : (
                <div>궁금한 단어를 선택해보세요!</div>
              )}
            </div>
          </div>
        </div>
      </S.Container>
    </>
  );
}
