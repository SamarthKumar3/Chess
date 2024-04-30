import React, { useRef } from 'react'

import './Chessboard.css';
import Tile from './Tile';

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const reverseVerticalAxis = verticalAxis.reverse();

interface Piece {
    image: string;
    x: number;
    y: number;
}

const Pieces: Piece[] = [];

Pieces.push(
    { image: '/assets/images/White_Rook.png', x: 0, y: 0 },
    { image: '/assets/images/White_Knight.png', x: 1, y: 0 },
    { image: '/assets/images/White_Bishop.png', x: 2, y: 0 },
    { image: '/assets/images/White_Queen.png', x: 3, y: 0 },
    { image: '/assets/images/White_King.png', x: 4, y: 0 },
    { image: '/assets/images/White_Bishop.png', x: 5, y: 0 },
    { image: '/assets/images/White_Knight.png', x: 6, y: 0 },
    { image: '/assets/images/White_Rook.png', x: 7, y: 0 },

);

for (let i = 0; i < 8; i++) {
    Pieces.push({ image: '/assets/images/White_Pawn.png', x: i, y: 1 });
}

Pieces.push(
    { image: '/assets/images/Black_Rook.png', x: 0, y: 7 },
    { image: '/assets/images/Black_Knight.png', x: 1, y: 7 },
    { image: '/assets/images/Black_Bishop.png', x: 2, y: 7 },
    { image: '/assets/images/Black_Queen.png', x: 3, y: 7 },
    { image: '/assets/images/Black_King.png', x: 4, y: 7 },
    { image: '/assets/images/Black_Bishop.png', x: 5, y: 7 },
    { image: '/assets/images/Black_Knight.png', x: 6, y: 7 },
    { image: '/assets/images/Black_Rook.png', x: 7, y: 7 },
);

for (let i = 0; i < 8; i++) {
    Pieces.push({ image: '/assets/images/Black_Pawn.png', x: i, y: 6 });
}

const Chessboard = () => {
    const chessBoardRef = useRef<HTMLDivElement>(null);

    let activeElement: HTMLElement | null = null;

    const grabPiece = (e: React.MouseEvent) => {
        const element = e.target as HTMLElement;
        if (element.classList.contains('chess-piece')) {
            const x = e.clientX;
            const y = e.clientY;
            element.style.position = 'absolute';
            element.style.left = `${x - 40}px`;
            element.style.top = `${y - 40}px`;

            activeElement = element;
        }
    }

    const movePiece = (e: React.MouseEvent) => {
        const chessBoard = chessBoardRef.current;

        if (activeElement && chessBoard) {
            const minX = chessBoard.offsetLeft;
            const minY = chessBoard.offsetTop;
            const maxX = chessBoard.offsetWidth + minX - 80;
            const maxY = chessBoard.offsetHeight + minY - 80;
            const x = e.clientX;
            const y = e.clientY;
            activeElement.style.position = 'absolute';

            // prevent the chess piece from going out of the chessboard
            // in X axis
            if (x < minX) {
                activeElement.style.left = `${minX}px`;
            } else if (x > maxX) {
                activeElement.style.left = `${maxX}px`;
            } else {
                activeElement.style.left = `${x - 40}px`;
            }

            // in Y axis
            if (y < minY) {
                activeElement.style.top = `${minY}px`;
            } else if (y > maxY) {
                activeElement.style.top = `${maxY}px`;
            } else {
                activeElement.style.top = `${y - 40}px`;
            }

        }
    }

    const dropPiece = (e: React.MouseEvent) => {
        console.log(e);
        
        if (activeElement) {
            activeElement = null;
        }
    }


    return (
        <>
            <div className='chessboard' onMouseDown={(e) => grabPiece(e)} onMouseMove={(e) => movePiece(e)} onMouseUp={(e) => dropPiece(e)} ref={chessBoardRef}>
                {reverseVerticalAxis.map((v, i) => {
                    return (
                        <div key={i} className='chessboard-row'>
                            {horizontalAxis.map((h, j) => {
                                const piece = Pieces.find(p => p.x === j && p.y === i);
                                return (
                                    <Tile key={j} number={i + j} image={piece?.image || ''} />
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </>
    )

}

export default Chessboard;