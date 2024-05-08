export const sliceImage = async (imageSrc: string, numCols: number, numRows: number) => {
  return new Promise<HTMLCanvasElement[]>((resolve, reject) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const pieceWidth = img.width / numCols;
      const pieceHeight = img.height / numRows;
      const canvasPieces: HTMLCanvasElement[] = [];

      for (let x = 0; x < numCols; x++) {
        for (let y = 0; y < numRows; y++) {
          const canvas = document.createElement('canvas');
          canvas.width = pieceWidth;
          canvas.height = pieceHeight;
          const context = canvas.getContext('2d');
          context?.drawImage(
            img,
            x * pieceWidth,
            y * pieceHeight,
            pieceWidth,
            pieceHeight,
            0,
            0,
            pieceWidth,
            pieceHeight,
          );
          canvasPieces.push(canvas);
        }
      }
      resolve(canvasPieces);
    };
    img.onerror = reject;
  });
};
