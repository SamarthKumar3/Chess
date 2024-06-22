import { PieceType, TeamType } from "../Chessboard";

export default class Refree {
    isValidMove(px: number, py: number, x: number, y: number, type: PieceType, team: TeamType) {
        console.log("Checking if the move is valid");
        console.log(`From ${px},${py} to ${x},${y} for ${type} and team ${team}`);
        return true;
    }
}