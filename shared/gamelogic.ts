import { v4 } from "uuid";
import {getBehaviorFromType, PB} from "./PieceTypes";

//rules
//castling
// you can only castle with your initial rooks and king
//en passant
//pawn promotion
//check
//check
//cant castle out of check or through check
// cant move into check
//pinning
//stalemate
//draw by repetition
//draw by insufficient material
//draw by 50 move rule
//draw by agreement
//draw by time
//draw by forfeit
//draw by resignation
//draw by adjudication
//draw by insufficient mating material
//can't move kings near each other
//pinning pieces to king
//double check

enum orientation{
  black = "down",
  white = "up"
}

interface Range{
  x: string|number;
  y: string|number;
}
interface Coords{
  x: string|number;
  y: string|number;
}

class Chesspiece{
  constructor(properties, n, a){
    const piece = properties.length != 0? properties.split(" "): [null, null];
      
    this.boardPosition = [n, a];
    this.pieceType =  piece[0];
    this.pieceColor = piece[1];
    this.move = getBehaviorFromType(this.pieceType);
  }

  public getBoardPosition=()=>{
    return this.boardPosition;
  }

  public getBoardPositionClassID=()=>{
    return this.boardPosition[0] + " " + this.boardPosition[1];
  }

  public getPieceBehavior=()=>{
    return this.move;
  }

  public setNeverMoved=()=>{
    return this.neverMoved;
  }

  public getNeverMoved=()=>{
    return this.neverMoved;
  }

  private neverMoved: boolean;
  public pieceType: string;
  public pieceColor: string;
  private move;
  private boardPosition: Array<number>;
  private id: string = v4();
}

const Gamelogic = () => {
  let whiteInCheck= false;
  let blackInCheck= false; 

  const boardID = v4();
  
  const GRIDWIDTH = 8;

  let basicPositions: Array<string[]> = [
    ["rook black", "knight black", "bishop black", "queen black" , "king black", "bishop black", "knight black", "rook black"],
    ["pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "queen black"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white"],
    ["rook white", "knight white", "bishop white", "queen white", "king white", "bishop white", "knight white", "rook white"]
  ];
  
  const initialPositions = JSON.parse(JSON.stringify(basicPositions));

  const resetGame = () => {
    whiteInCheck= false;
    blackInCheck= false;
    basicPositions = JSON.parse(JSON.stringify(initialPositions));
    constructedPositions = constructPositions();
};

  const constructPositions = () => {
    const positionGrid: Array<Array<Chesspiece>> = [];
    for(let i = 0; i < GRIDWIDTH; i ++){
      const arr:Array<Chesspiece> = [];
      for(let k = 0; k < GRIDWIDTH; k++){
        const position = basicPositions[i][k]; 
        let piece: Chesspiece;
        position.length ? piece = new Chesspiece(position, i, k) : piece = null;
        arr.push(piece);
      }
      positionGrid.push(arr);
    }
    return positionGrid;
  };

  let constructedPositions = constructPositions();

  const logConstructedPositions = () => {
    for(let i = 0; i < GRIDWIDTH; i ++){
      for(let k = 0; k < GRIDWIDTH; k++){
        const pos = constructedPositions[i][k];

        if(pos != null){
          console.log(pos.getBoardPosition() + " " + (pos.pieceType));
        } else {
          console.log("empty");
        }
      }
    }
  };
 
  const getPieceByCoords = (targetPos:Coords) : Chesspiece=>{
    return constructedPositions[targetPos.x][targetPos.y];
  };

  const idToCoords = (targetID:string)=>{
    return {x: targetID[0], y:targetID[2]};
  };

  const getPieceByID = (targetID:string) : Chesspiece=>{
    return constructedPositions[targetID[0]][targetID[2]];
  };

  const setPieceByCoords = (targetPos:Coords, val : Chesspiece|null)=>{
    constructedPositions[targetPos.x][targetPos.y] = val;
  };

  const getConstructedGrid = () => {
    return constructedPositions;
  };

  const getValidMoves = (currentLocation:Coords) : Coords[] => {
    const currentPiece = getPieceByCoords({x: currentLocation.x, y:currentLocation.y});
    if(currentPiece==null){
      return [];
    }

    const maxDistance = {x:0, y:0};
    
    const range = currentPiece.getPieceBehavior().move();
    
    if(range.x == "max"){
      maxDistance.x = basicPositions[0].length;
    } else {
      maxDistance.x = range.x;
    }

    if(range.y == "max"){
      maxDistance.y = basicPositions.length;
    } else {
      maxDistance.y = range.y;
    }

    let validPositions:Coords[] = [];

    const getValidLaterals = (positions:Coords[], range:Range):Coords[]=>{
      let maxRange:string|number = 2;

      if(range.x === range.y){
        if(range.x == "max"){
          maxRange = GRIDWIDTH;
        } else {
          maxRange = range.x;
        }
      } else {
          maxRange = range.x;
      }

      let forwardHit:boolean, backwardHit:boolean, downwardHit:boolean, upwardHit:boolean;
      forwardHit = backwardHit = downwardHit = upwardHit = false;
      let i:number, j:number, k:number, l: number;
      const curPos = currentPiece.getBoardPosition();
      const current = {x:curPos[0], y:curPos[1]};
      
      i = j = current.y;
      k = l = current.x;
      let fpos:string, bpos:string, kpos:string, lpos:string;
      
      while(!forwardHit || !backwardHit || !downwardHit || !upwardHit){
        if(i != current.y  && !forwardHit){ //rightward
          fpos = basicPositions[current.x][i]; 
          if(fpos.length){
            forwardHit = true;
          }
          positions.push({ x:current.x,  y:i});
        }
        i = i+1;

        // maxX causing it to end early
        if(j != current.y && !backwardHit){ //leftward
          bpos = basicPositions[current.x][j]; 
          if(bpos.length){
            backwardHit = true;
          }
          positions.push({ x:current.x,  y:j });
        }
        j = j-1;

        if(k != current.x && !downwardHit){ //downward
          kpos = basicPositions[k][current.y]; 
          if(kpos.length){
            downwardHit = true;
          } 
          positions.push({ x: k, y:current.y });
        }
        k = k+1;

        if(l != current.x && !upwardHit){ // upward
          lpos = basicPositions[l][current.y]; 
          if(lpos.length){
            upwardHit = true;
          }
          positions.push({ x: l, y:current.y });
        }
        l = l-1;

        if(i == GRIDWIDTH){
          forwardHit = true;
        }
        if(j == -1){
          backwardHit = true;
        }
        if(k == GRIDWIDTH){
          downwardHit = true;
        }
        if(l == -1){
          upwardHit = true;
        }
      } 
      return positions;
    };
    
    const getHorseyMoves = (positions:Coords[]):Coords[]=>{
      const curPos = currentPiece.getBoardPosition();
      const current = {x:curPos[0], y:curPos[1]};
      const x = current.x;
      const y = current.y;
      
      if( x+1 < GRIDWIDTH && y + 2 < GRIDWIDTH){
        positions.push({ x: x+1,  y: y+2 });
      }

      if( x-1 >= 0 && y+2 < GRIDWIDTH){
        positions.push({ x: x-1,  y: y+2 });
      }

      if( x+1 < GRIDWIDTH && y-2 >= 0){
        positions.push({ x: x+1,  y: y-2 });
      }

      // if( x-1 >= 0 && y-2 >= 0){
      //   positions.push({ x: x-1,  y: y-2 });
      // }

      if( x-2 >= 0 && y-1 >= 0){
        positions.push({ x: x-2,  y: y-1});
      }

      if( x+2 < GRIDWIDTH && y+1 < GRIDWIDTH ){
        positions.push({ x: x+2,  y: y+1});
      }

      if( x-2 >=0 && y +1 < GRIDWIDTH){
        positions.push({ x: x-2,  y: y+1 });
      }

      if( x+2 < GRIDWIDTH && y -1 >= 0){
        positions.push({ x: x+2,  y: y-1 });
      }

      return positions;
    };

    const getPawnMoves = (positions:Coords[]):Coords[]=>{
      const curPos = currentPiece.getBoardPosition();
      const current = {x:curPos[0], y:curPos[1]};
      const x = current.x;
      const y = current.y;

      if(orientation[currentPiece.pieceColor] == "down"){
        if(x == 1 ){
          positions.push({ y: y,  x: x + 2 });
          positions.push({ y: y,  x: x + 1 });
        } else {
          positions.push({ y: y,  x: x + 1 });
        }
        return positions;
      } else if (orientation[currentPiece.pieceColor] == "up") {
        if(y == 6 ){
          positions.push({ y: y,  x: x - 2  });
          positions.push({ y: y,  x: x - 1 }); 
        } else {
          positions.push({ y: y,  x: x - 1 }); 
        }
        return positions;
      }
      return positions;
    };    
    
    const getValidDiagonals = (positions:Coords[], range:Range):Coords[]=>{
      for(let z = 0; z < 2; z++){
        const curPos = currentPiece.getBoardPosition();
        const current = {x:curPos[0], y:curPos[1]};

        const x = current.x;
        const y = current.y;
        let maxRange:string|number = 2;

        if(range.x === range.y){
          if(range.x == "max"){
            maxRange = GRIDWIDTH;
          } else {
            maxRange = range.x;
          }
        } else {
            maxRange = range.x;
        }

        let tl, tr, bl, br = false;

        for( let i = 0; i < maxRange; i++){ 
          if(i != 0){
            if( x+i < GRIDWIDTH && y+i < GRIDWIDTH && !br){
              const pos = basicPositions[x+i][y+i]; 
              if(pos.length){
                br = true;
              }
              positions.push({ x:x+i,  y:y+i });
            }
            if( x+i < GRIDWIDTH && y-i >=0 && !tr){
              const pos = basicPositions[x+i][y-i]; 
              if(pos.length){
                tr = true;
              }
              positions.push({ x:x+i,  y:y-i});
            }
            if(x-i >= 0 && y-i >= 0 && !tl){
              const pos = basicPositions[x-i][y-i]; 
              if(pos.length){
                tl = true;
              }
              positions.push({ x:x-i,  y:y-i });
            }
            if(x-i >= 0 && y+i < GRIDWIDTH && !bl){
              const pos = basicPositions[x-i][y+i]; 
              
              if(pos.length){
                bl = true;
              }
              positions.push({ x:x-i,  y:y+i});
            }
          }
        }
      }
      return positions;
    };

    if(range.constraint === PB.omnidirectional ){
      validPositions = getValidLaterals(validPositions, range);
      validPositions = getValidDiagonals(validPositions, range);
    } else if (range.constraint === PB.horsey){
      validPositions = getHorseyMoves(validPositions);
    } else if (range.constraint === PB.lateral){
      validPositions = getValidLaterals(validPositions, range);
    } else if (range.constraint === PB.forward){
      validPositions = getPawnMoves(validPositions); //this should be handled in a different way entirely
    } else if (range.constraint === PB.diagonal){
      validPositions = getValidDiagonals(validPositions, range);
    }
    return validPositions;
  };
  
  const movePiece = (moveData):boolean =>{
    const piece = getPieceByID(moveData.location);
    const targetPiece = getPieceByID(moveData.target);

    const pieceCoords = idToCoords(moveData.location);
    const targetCoords = idToCoords(moveData.target);

    if(pieceCoords.x === targetCoords.x && pieceCoords.y === targetCoords.y){
      return false;
    }

    if (piece != null || piece != undefined) {
      if (targetPiece != null || targetPiece != undefined) {
        constructedPositions = null;
        basicPositions[targetCoords.x][targetCoords.y] = basicPositions[pieceCoords.x][pieceCoords.y]; 
        basicPositions[pieceCoords.x][pieceCoords.y] = "";
        constructedPositions = constructPositions();
        // logConstructedPositions();
        return true;
      } else { 
        constructedPositions = null;
        basicPositions[targetCoords.x][targetCoords.y] = basicPositions[pieceCoords.x][pieceCoords.y]; 
        basicPositions[pieceCoords.x][pieceCoords.y] = "";
        constructedPositions = constructPositions();
        // logConstructedPositions();
        return true;
      }
    } else {
      return false;
    }
    return false;
  };

  return {
    constructPositions,
    getConstructedGrid,
    getValidMoves,
    movePiece,
    resetGame,
  };
};

export default Gamelogic;
Gamelogic.displayName = "Gamelogic";
