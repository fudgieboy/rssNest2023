import {PB} from "./PieceTypes";

const move = () => {
  return {x:"max", y:"max", constraint: PB.lateral};
};

const Rook = (p) => {
};

Rook.displayName = "Rook";
Rook.move = move;
export default Rook;