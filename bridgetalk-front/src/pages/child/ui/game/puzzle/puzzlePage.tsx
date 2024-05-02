import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styled from 'styled-components';

interface Piece {
  id: number;
  src: string;
  originalPosition: number;
}

const Board = styled.div`
  width: 600px;
  height: 600px;
  position: relative;
  border: 1px solid black;
`;

const PieceStyled = styled.img<{ isDragging: boolean }>`
  width: 100px;
  height: 100px;
  position: absolute;
  opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
`;

interface PuzzlePieceProps {
  src: string;
  id: number;
}

function createImagePieces(image: HTMLImageElement): Piece[] {
  const numCols = 6;
  const numRows = 6;
  const pieceWidth = image.width / numCols;
  const pieceHeight = image.height / numRows;
  const pieces: Piece[] = [];

  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      const canvas = document.createElement('canvas');
      canvas.width = pieceWidth;
      canvas.height = pieceHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(
          image,
          x * pieceWidth,
          y * pieceHeight,
          pieceWidth,
          pieceHeight,
          0,
          0,
          pieceWidth,
          pieceHeight,
        );
        const src = canvas.toDataURL('image/png');
        pieces.push({ id: y * numCols + x, src, originalPosition: y * numCols + x });
      }
    }
  }

  return pieces;
}

function PuzzlePiece({ src, id }: PuzzlePieceProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'piece',
    item: { id },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  return <PieceStyled ref={drag} src={src} isDragging={isDragging} />;
}

function PuzzlePage() {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    const image = new Image();
    image.src = '/assets/img/pic/halongbay.jpg'; // 경로 수정
    image.onload = () => setPieces(createImagePieces(image));
    image.onerror = () => console.error('Failed to load the image.');

    return () => {
      // Cleanup function
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  return (
    <Board>
      {pieces.map((piece) => (
        <PuzzlePiece key={piece.id} src={piece.src} id={piece.id} />
      ))}
    </Board>
  );
}

export default PuzzlePage;
