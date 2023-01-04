import {PB} from "./PieceTypes";

const move = () => {
  return {x: 1, y: 0, constraint: PB.forward };
};

const Pawn = (p) => {
  
};

Pawn.displayName = "Pawn";
Pawn.move = move;
export default Pawn;
