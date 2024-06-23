import { PieceType, TeamType, Piece } from "../Chessboard";

export default class Refree {
    tileIsOccupied(
        x: number,
        y: number,
        boardState: Piece[]
    ): boolean {
        console.log("Checking if the tile is occupied");
        const piece = boardState.find(p => p.x == x && p.y == y);
        if (piece) {
            console.log("Tile is occupied");
            return true;
        } else {
            console.log("Tile is not occupied");
            return false;
        }

    }

    isValidMove(
        px: number,
        py: number,
        x: number,
        y: number,
        type: PieceType,
        team: TeamType,
        boardState: Piece[]
    ): boolean {
        //check if the piece is ours or not
        if (type == PieceType.PAWN) {
            if (team == TeamType.PLAYER) {
                //first move
                if (py == 6) {
                    if (px == x && py - y == 1) {
                        //move the Pawn only if tile is not occupied & is a straight move
                        if (!this.tileIsOccupied(x, y, boardState)) {
                            return true;
                        }
                    } else if (px == x && py - y == 2) {
                        if (!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y + 1, boardState)) {
                            return true;
                        }
                    }
                }
                //consecutive moves
                else if (px == x && py - y == 1) {
                    if (!this.tileIsOccupied(x, y, boardState)) {
                        return true;
                    }
                }
            }
            else {
                if (py == 1) {
                    if (px == x && y - py == 1 ) {
                        if (!this.tileIsOccupied(x, y, boardState)) {
                            return true;
                        }
                    } else if (px == x && y - py == 2) {
                        if (!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y - 1, boardState)) {
                            return true;
                        }
                    }
                } else if (px == x && y - py == 1) {
                    if (!this.tileIsOccupied(x, y, boardState)) {
                        return true;
                    }
                }
            }
        }
        return false;

    }
}