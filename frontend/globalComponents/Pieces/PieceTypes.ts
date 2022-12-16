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
  "forward" ,
  "lateral" ,
  "sideways" ,
  "vertical" ,
  "diagonal" ,
  "omnidirectional",
  "horsey"
}

export enum PC { 
  black= 0,
  white= 1,
}
class PieceType{
  constructor(type:string, color: string){
    if(type!= undefined ){
      type = type.toLowerCase();
      if(PT[type] == undefined){
        console.log("invalid piece type");
      }  else{
        this.type = type;
      }
    } else {
      console.log("type is undefined");
    }

    if(color!= undefined ){
      color = color.toLowerCase();
      if(PC[color] == undefined){
        console.log("invalid piece color");
      }  else{
        this.color = color;
      }
    } else {
      console.log("color is undefined");
    }
  } 
 type:string;
 color:string;
}

export const getPieceFromType = (type:string, color:string):React.ElementType=>{
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
  };
  return Pawn;
};