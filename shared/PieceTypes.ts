import Pawn from "./Pawn";
import Rook from "./Rook";
import Bishop from "./Bishop";
import Knight from "./Knight";
import Queen from "./Queen";
import King from "./King";

export enum PT { 
  pawn= 0,
  rook= 1,
  bishop= 2,
  knight= 3,
  queen= 4,
  king= 5
}

export const PN = [ 
  "pawn",
  "rook",
  "bishop",
  "knight",
  "queen",
  "king"
];

export enum PB {
  "forward" = "forward" ,
  "lateral" = "lateral" ,
  "sideways" = "sideways",
  "vertical" = "vertical",
  "diagonal" = "diagonal" ,
  "omnidirectional" = "omnidirectional",
  "horsey" = "horsey"
}

export enum PC { 
  black= 0,
  white= 1,
}

//for fake polymorphism
export const getBehaviorFromType = (type:string)=>{
  if(type == null){
    return null;
  }
  switch(PT[type]){
    case PT.pawn:
      return Pawn;
      break;
    case PT.rook:
      return Rook;
      break;
    case PT.bishop:
      return Bishop;
      break;
    case PT.knight:
      return Knight;
      break;
    case PT.queen:
      return Queen;
      break;
    case PT.king:
      return King;
      break;
  }
};