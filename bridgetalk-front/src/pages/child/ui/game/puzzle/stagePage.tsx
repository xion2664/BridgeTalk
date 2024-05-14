import React, { useState, useEffect } from 'react';
import { customAxios } from '@/shared';
import { StageItem } from './item/stageItem';
import * as S from '@/styles/child/game/stage.style';

interface Puzzle {
  puzzleId: number;
  puzzleNation: string;
  puzzleImageUrl: string;
  puzzleLandmarkName: string;
  puzzleLandmarkContent: string;
}

export function StagePage() {
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);

  useEffect(() => {
    const fetchPuzzles = async () => {
      try {
        const response = await customAxios.get('/puzzle');
        setPuzzles(response.data.puzzleList);
      } catch (error) {
        console.error('Failed to fetch letters:', error);
      }
    };

    fetchPuzzles();
  }, []);

  return (
    <S.Container>
      <div className="stagePage">
        <div className="stagePage__header">
          <img src="/assets/img/icon/toBack.svg" alt="뒤로 가기" />
        </div>
        <div className="stagePage__container">
          {puzzles.map((puzzle) => (
            <div className="stageItem">
              <StageItem
                key={puzzle.puzzleId}
                id={puzzle.puzzleId.toString()}
                img={puzzle.puzzleImageUrl}
                name={puzzle.puzzleLandmarkName}
              />
            </div>
          ))}
        </div>
      </div>
    </S.Container>
  );
}
