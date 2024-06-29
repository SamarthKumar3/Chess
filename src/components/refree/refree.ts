import { PieceType, TeamType, Piece } from "../Chessboard";

export default class Refree {
    tileIsOccupied(
        x: number,
        y: number,
        boardState: Piece[]
    ): boolean {
        const piece = boardState.find(p => p.x == x && p.y == y);
        if (piece) {
            return true;
        } else {
            return false;
        }
    }

    tileIsOccupiedByOpponent(x: number, y: number, team: TeamType, boardState: Piece[]): boolean {
        const piece = boardState.find(p => p.x == x && p.y == y && p.team != team);
        if (piece) {
            return true;
        } else {
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
        if (type == PieceType.PAWN) {
            const splRow = (team == TeamType.PLAYER) ? 6 : 1;
            const pawnDir = (team == TeamType.PLAYER) ? -1 : 1;
            //movement logic
            if (px === x && py === splRow && y - py === 2 * pawnDir) {
                if (!this.tileIsOccupied(x, y, boardState) && !this.tileIsOccupied(x, y - pawnDir, boardState)) {
                    return true;
                }
            }
            else if (px === x && y - py === pawnDir) {
                if (!this.tileIsOccupied(x, y, boardState)) {
                    return true;
                }
            }
            //capture logic
            else if (x - px === -1 && y - py === pawnDir) {
                if (this.tileIsOccupiedByOpponent(x, y, team, boardState)) {
                    console.log("capture upper left");
                    return true;
                }
            }
            else if (x - px === 1 && y - py === pawnDir) {
                if (this.tileIsOccupiedByOpponent(x, y, team, boardState)) {
                    console.log("capture upper right");
                    return true;
                }
            }

            else if(x - px === -1 && y - py === pawnDir){
            }
            else if(x - px === -1 && y - py === pawnDir){

            }
        }
        return false;

    }
}