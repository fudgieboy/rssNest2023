import {PB} from "./PieceTypes";

const move = () => {
  return {x:"max", y:"max", constraint: PB.diagonal};
};

const Bishop = (p)=> {
};

Bishop.displayName = "Bishop";
Bishop.move = move;
export default Bishop;