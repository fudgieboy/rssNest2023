import {PB} from "./PieceTypes";

const move = () => {
  return {x:3, y:1, constraint: PB.horsey};
};

const Knight = (p) => {
};

Knight.displayName = "Knight";
Knight.move = move;
export default Knight;
