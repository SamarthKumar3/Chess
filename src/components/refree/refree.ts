import { PieceType, TeamType } from "../Chessboard";

export default class Refree {
    isValidMove(px: number, py: number, x: number, y: number, type: PieceType, team: TeamType) {
        console.log("Checking if the move is valid");
        console.log(`From ${px},${py} to ${x},${y} for ${type} and team ${team}`);

        if (type == PieceType.PAWN) {
            if (team == TeamType.PLAYER) {
                if (py == 6) {
                    if (px == x && (py - y == 1 || py - y == 2)) {
                        console.log("Valid move for pawn");
                        return true;
                    }
                } else if (px == x && py - y == 1) {
                    console.log("Valid move for pawn");
                    return true;
                }
            }
        }
        return false;

    }
}