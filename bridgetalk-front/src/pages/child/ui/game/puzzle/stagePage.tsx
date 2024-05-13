import React, { useState, useEffect } from 'react';
import { customAxios } from '@/shared';
import { StageItem } from './item/stageItem';

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
    <div className="stagePage">
      <div className="stagePage__header">
        <img src="#" alt="뒤로 가기" />
      </div>
      <div className="stagePage__container">
        {puzzles.map((puzzle) => (
          <StageItem
            key={puzzle.puzzleId}
            id={puzzle.puzzleId.toString()}
            img={puzzle.puzzleImageUrl}
            name={puzzle.puzzleLandmarkName}
          />
        ))}
      </div>
    </div>
  );
}
