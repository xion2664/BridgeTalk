import React, { useEffect } from 'react';
import { sliceImage } from '@/pages/child/model/puzzle/sliceImage';
import { usePuzzleStore } from '@/pages/child/store/puzzle/usePuzzleStore';
import Draggable from 'react-draggable';

export function PuzzlePage() {
  const { pieces, setPieces } = usePuzzleStore();

  useEffect(() => {
    sliceImage('/assets/img/pic/halongbay.jpg', 6, 6).then((canvasPieces) => {
      const puzzlePieces = canvasPieces.map((canvas, index) => ({
        id: index,
        x: (index % 6) * 100, // Starting x position
        y: Math.floor(index / 6) * 100, // Starting y position
        rotation: 0, // Optional: initial rotation
      }));
      setPieces(puzzlePieces);
    });
  }, [setPieces]);

  return (
    <div style={{ position: 'relative', width: '600px', height: '600px' }}>
      {pieces.map((piece) => (
        <Draggable key={piece.id} bounds="parent" position={{ x: piece.x, y: piece.y }}>
          <div style={{ width: '100px', height: '100px', overflow: 'hidden', position: 'absolute' }}>
            <canvas
              width="100"
              height="100"
              style={{ position: 'absolute', left: -((piece.id % 6) * 100), top: -(Math.floor(piece.id / 6) * 100) }}
            />
          </div>
        </Draggable>
      ))}
    </div>
  );
}
