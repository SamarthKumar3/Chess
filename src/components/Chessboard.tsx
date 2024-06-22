import React, { useRef, useState } from 'react'

import './Chessboard.css';
import Tile from './Tile';

import Refree from './refree/refree';

const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const reverseVerticalAxis = verticalAxis.reverse();

interface Piece {
    image: string;
    x: number;
    y: number;
    type: PieceType;
    team: TeamType;
}

export enum PieceType {
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING
}

export enum TeamType {
    OPPONENT,
    PLAYER
}

const initialBoardState: Piece[] = [];

initialBoardState.push(
    { image: '/assets/images/White_Rook.png', x: 0, y: 0, type: PieceType.ROOK, team: TeamType.OPPONENT },
    { image: '/assets/images/White_Knight.png', x: 1, y: 0, type: PieceType.KNIGHT, team: TeamType.OPPONENT },
    { image: '/assets/images/White_Bishop.png', x: 2, y: 0, type: PieceType.BISHOP, team: TeamType.OPPONENT },

    { image: '/assets/images/White_Queen.png', x: 3, y: 0, type: PieceType.QUEEN, team: TeamType.OPPONENT },
    { image: '/assets/images/White_King.png', x: 4, y: 0, type: PieceType.KING, team: TeamType.OPPONENT },
    { image: '/assets/images/White_Bishop.png', x: 5, y: 0, type: PieceType.BISHOP, team: TeamType.OPPONENT },
    { image: '/assets/images/White_Knight.png', x: 6, y: 0, type: PieceType.KNIGHT, team: TeamType.OPPONENT },
    { image: '/assets/images/White_Rook.png', x: 7, y: 0, type: PieceType.ROOK, team: TeamType.OPPONENT },

);

for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: '/assets/images/White_Pawn.png', x: i, y: 1, type: PieceType.PAWN, team: TeamType.OPPONENT });
}

initialBoardState.push(
    { image: '/assets/images/Black_Rook.png', x: 0, y: 7, type: PieceType.ROOK, team: TeamType.PLAYER },
    { image: '/assets/images/Black_Knight.png', x: 1, y: 7, type: PieceType.KNIGHT, team: TeamType.PLAYER },
    { image: '/assets/images/Black_Bishop.png', x: 2, y: 7, type: PieceType.BISHOP, team: TeamType.PLAYER },
    { image: '/assets/images/Black_Queen.png', x: 3, y: 7, type: PieceType.QUEEN, team: TeamType.PLAYER },
    { image: '/assets/images/Black_King.png', x: 4, y: 7, type: PieceType.KING, team: TeamType.PLAYER },
    { image: '/assets/images/Black_Bishop.png', x: 5, y: 7, type: PieceType.BISHOP, team: TeamType.PLAYER },
    { image: '/assets/images/Black_Knight.png', x: 6, y: 7, type: PieceType.KNIGHT, team: TeamType.PLAYER },
    { image: '/assets/images/Black_Rook.png', x: 7, y: 7, type: PieceType.ROOK, team: TeamType.PLAYER },
);

for (let i = 0; i < 8; i++) {
    initialBoardState.push({ image: '/assets/images/Black_Pawn.png', x: i, y: 6, type: PieceType.PAWN, team: TeamType.PLAYER });
}

const Chessboard = () => {
    const chessBoardRef = useRef<HTMLDivElement>(null);
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const [gridX, setGridX] = useState<number>(0);
    const [gridY, setGridY] = useState<number>(0);
    const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);

    const refree = new Refree();

    const grabPiece = (e: React.MouseEvent) => {
        const element = e.target as HTMLElement;
        const chessBoard = chessBoardRef.current;
        if (element.classList.contains('chess-piece') && chessBoard) {
            setGridX(Math.floor((e.clientX - chessBoard.offsetLeft) / 80));
            setGridY(Math.floor((e.clientY - chessBoard.offsetTop) / 80));

            const x = e.clientX;
            const y = e.clientY;
            element.style.position = 'absolute';
            element.style.left = `${x - 40}px`;
            element.style.top = `${y - 40}px`;

            setActiveElement(element);

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
        const chessBoard = chessBoardRef.current;
        if (activeElement && chessBoard) {
            const x = Math.floor((e.clientX - chessBoard.offsetLeft) / 80);
            const y = Math.floor((e.clientY - chessBoard.offsetTop) / 80);

            setPieces(value => {
                const pieces = value.map((p) => {
                    if (p.x === gridX && p.y === gridY) {
                        refree.isValidMove(gridX, gridY, x, y, p.type, p.team);
                        p.x = x;
                        p.y = y;
                    }
                    return p;
                })
                return pieces;
            })
            setActiveElement(null);
        }
    }

    return (
        <>
            <div className='chessboard' onMouseDown={(e) => grabPiece(e)} onMouseMove={(e) => movePiece(e)} onMouseUp={(e) => dropPiece(e)} ref={chessBoardRef}>
                {reverseVerticalAxis.map((v, i) => {
                    return (
                        <div key={i} className='chessboard-row'>
                            {horizontalAxis.map((h, j) => {
                                const piece = pieces.find(p => p.x === j && p.y === i);
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