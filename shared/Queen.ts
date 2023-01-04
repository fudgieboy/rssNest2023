import {PB} from "./PieceTypes";

const move = () => {
  return {x:"max", y:"max", constraint: PB.omnidirectional};
};

const Queen = (p) => {
};

Queen.displayName = "Queen";
Queen.move = move;
export default Queen;