import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { customAxios } from '@/shared';
import { JigsawPuzzle } from 'react-jigsaw-puzzle/lib';
import 'react-jigsaw-puzzle/lib/jigsaw-puzzle.css';
import * as S from '@/styles/child/game/puzzle.style';

export function PuzzlePage() {
  const { id } = useParams();
  const [puzzle, setPuzzle] = useState('');

  useEffect(() => {
    const fetchPuzzle = async () => {
      try {
        const response = await customAxios.get(`/puzzle/${id}`, {});
        setPuzzle(response.data.puzzleImageUrl);
        console.log('API Response Status Code:', response.status); // 콘솔에 상태 코드 출력
      } catch (error) {
        console.error('Failed to fetch puzzle data:', error);
      }
    };

    if (id) {
      fetchPuzzle();
    }
  }, [id]);

  return (
    <S.Container>
      <div className="puzzlePage">
        <div className="puzzlePage__side">
          <img src={puzzle} alt="" />
        </div>
        <div className="puzzlePage__puzzle">
          <JigsawPuzzle imageSrc={puzzle} rows={3} columns={4} onSolved={() => alert('Solved!')} />
        </div>
      </div>
    </S.Container>
  );
}
