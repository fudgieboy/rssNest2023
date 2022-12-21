import React, { ReactElement, useState } from "react";
import { v4 } from "uuid";
import Chesspiece from "./Pieces/Piece";
import TodoListStore from "../stores/TodoListStore";
import LocalStore from "../stores/LocalStore";
import {getPieceFromType, PB} from "./Pieces/PieceTypes";
import Gamelogic from "../../shared/gamelogic";
//https://www.npmjs.com/package/react-chess-pieces

console.log(Gamelogic());
class Axes{
  constructor(a, n) {
    this.alpha = a;
    this.numeric = n;
  }
  alpha: any
  numeric: any
}

enum orientation {
  black= "down",
  white= "up"
}

const Chessboard: React.FC = (): ReactElement => {
  // const whiteInCheck= false;
  // const blackInCheck= false; 
  const GRIDWIDTH = 8;

  const xAxis = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h"
  ];

  const axes = new Axes({
    "a": 0,
    "b": 1,
    "c": 2,
    "d": 3,
    "e": 4,
    "f": 5,
    "g": 6,
    "h": 7
  },{
    "1": 0,
    "2": 1,
    "3": 2,
    "4": 3,
    "5": 4,
    "6": 5,
    "7": 6,
    "8": 7,
  }); 
  
  const currentPositions: Array<string[]> = [
    ["rook black", "knight black", "bishop black", "queen black", "king black", "bishop black", "knight black", "rook black"],
    ["pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black", "pawn black"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white", "pawn white"],
    ["rook white", "knight white", "bishop white", "queen white", "king white", "bishop white", "knight white", "rook white"]
  ];

  let currentHighlightedSpaces = [];

  const clearHighlightedSquares = () => {
    currentHighlightedSpaces.forEach((i)=>{
      let el = document.getElementById(i.x  + " " + i.y );
      el.classList.remove("moveglow");
    });
  };
  
  const createPositions = ():Array<ReactElement[]> => {
    const constructedPositions: Array<ReactElement[]> = [];
    for(const k in axes.numeric){
      const arr:ReactElement[] = [];
      const even:string = ((axes.numeric[k]%2) ==0? "even":"odd");
      const classes:string = "gridPosition " + even;
      for(const i in axes.alpha){
        const position = currentPositions[axes.numeric[k]][axes.alpha[i]];
          const split = position.split(" ");
          const piece = position.length != 0? 
            <Chesspiece boardPosition = {i + " " + k} pieceType = {split[0]} pieceColor = {split[1]} /> : <div className = "emptySquare"/>;
          
          arr.push(
          <div className = {classes}
            id = {i +" " + k}
            onDragEnter ={(e)=>{
              clearHighlightedSquares();
              e.currentTarget.classList.add("glow");
              const movingPiece = e.dataTransfer.getData("movingpiece");
              const validMoves = checkMoveValidity(movingPiece, e.currentTarget.id);
              currentHighlightedSpaces = validMoves;

              validMoves.forEach((i)=>{
                const el = document.getElementById( i.x  + " " + i.y );

                console.log(el);
                
                el.classList.add("moveglow");
              });
            }}
            onDragOver ={(e)=>{
              e.preventDefault();
              const movingPiece = e.dataTransfer.getData("movingpiece");
            }}
            onDragLeave ={(e)=>{
              e.currentTarget.classList.remove("glow");
            }}
            onDrop = {(e)=>{
              clearHighlightedSquares();
              e.preventDefault();
              e.currentTarget.classList.remove("glow");
              const movingPiece = e.dataTransfer.getData("movingpiece");

              // if(checkMoveValidity(movingPiece, e.currentTarget.id)){
              //   movePiece(movingPiece, e.currentTarget.id);
              // }
            }}
            key={i + " " + k}><div className = "pieceContainer">
                              {piece}
                            </div></div>);
      }
      constructedPositions.push(arr);
    }
    return constructedPositions;
  };

  let constructedPositions = createPositions();

  const checkMoveValidity = (currentLocation, targetLocation) => {
    const current = {x:0, y:0};
    const target = {x:0, y:0};
    current.x = currentLocation.split()[0][0];
    current.y = currentLocation.split()[0][2];
    target.x = targetLocation.split()[0][0];
    target.y = currentLocation.split()[0][2];

    let currentPiece = currentPositions[axes.numeric[current.y]][axes.alpha[current.x]];
    let targetPiece = currentPositions[axes.numeric[target.y]][axes.alpha[target.x]];

    let currentType = "";
    let currentColor = "";
    let targetType = "";
    let targetColor = "";
    const maxDistance = {x:0, y:0};
    
    if(currentPiece.length !== 0){
      currentType = currentPiece.split(" ")[0];
      currentColor = currentPiece.split(" ")[1];
    }
    
    if(targetPiece.length !== 0){
      targetType = targetPiece.split(" ")[0];
      targetColor = targetPiece.split(" ")[1];
    }

    currentPiece = getPieceFromType(currentType);
    targetPiece = getPieceFromType(currentType);

    let range = currentPiece.move();

    if(range.x == "max"){
      maxDistance.x = currentPositions[0].length;
    } else {
      maxDistance.x = range.x;
    }

    if(range.y == "max"){
      maxDistance.y = currentPositions.length;
    } else {
      maxDistance.y = range.y;
    }
    
    let validPositions:object[] = [];

    const getValidLaterals = (positions, range):object[]=>{
      let maxRange = 2;
      if(range.x === range.y){
        if(range.x == "max"){
          maxRange = GRIDWIDTH;
        } else {
          maxRange = range.x;
        }
      } else {
          maxRange = range.x;
      }

      let forwardHit, backwardHit, rightWardHit, leftWardHit;
      forwardHit = backwardHit = rightWardHit = leftWardHit = false;
      let i, j, k, l;
      i = j = axes.numeric[current.y];
      k = l = axes.alpha[current.x];
      let fpos, bpos, kpos, lpos;

      
      while(!forwardHit || !backwardHit || !rightWardHit || !leftWardHit){
        const maxY = Math.abs(i) - axes.numeric[current.y];
        const maxX = Math.abs(i) - axes.alpha[current.x];
        // console.log(maxX);
        // console.log(maxY);
        
        if(maxX < maxRange && i != axes.numeric[current.y]  && !forwardHit){ 
          fpos = currentPositions[i][axes.alpha[current.x]]; 
          if(fpos.length){
            forwardHit = true;
          }
          validPositions.push({ x:current.x,  y:i+1 });
        }
        i = i+1;

        if(maxX < maxRange && j != axes.numeric[current.y] && !backwardHit){
          bpos = currentPositions[j][axes.alpha[current.x]]; 
          if(bpos.length){
            backwardHit = true;
          }
          validPositions.push({ x:current.x,  y:j+1 });
        }
        j = j-1;

        if(maxY < maxRange && k != axes.alpha[current.x] && !rightWardHit){
          kpos = currentPositions[axes.numeric[current.y]][k]; 
          if(kpos.length){
            rightWardHit = true;
          }
          console.log(kpos);
          validPositions.push({ x: xAxis[k], y:current.y });
        }
        k = k+1;

        if(maxY < maxRange  && l != axes.alpha[current.x] && !leftWardHit){
          lpos = currentPositions[axes.numeric[current.y]][l]; 
          if(lpos.length){
            leftWardHit = true;
          }
          validPositions.push({ x: xAxis[l], y:current.y });
        }
        l = l-1;

        if(i == GRIDWIDTH){
          forwardHit = true;
        }
        if(j == -1){
          backwardHit = true;
        }
        if(k == GRIDWIDTH){
          rightWardHit = true;
        }
        if(l == -1){
          leftWardHit = true;
        }
      } 
      return positions;
    };
    
    const getHorseyMoves = (positions):object[]=>{
      const x = axes.alpha[current.x];
      const y = axes.numeric[current.y];
      if( x+1 < GRIDWIDTH && y +3 < GRIDWIDTH){
        positions.push({ x: xAxis[x+1],  y: y + 1 + 2 });
      }

      if( x-1 >= 0 && y+3 < GRIDWIDTH){
        positions.push({ x: xAxis[x-1],  y: y + 1 + 2 });
      }

      if( x+1 < GRIDWIDTH && y-1 >= 0){
        positions.push({ x: xAxis[x+1],  y: y-1 });
      }

      if( x-1 >= 0 && y-1 >= 0){
        positions.push({ x: xAxis[x-1],  y: y-1 });
      }

      if( x-2 >= 0 && y-1 >= 0){
        positions.push({ x: xAxis[x-2],  y: y});
      }

      if( x+2 < GRIDWIDTH && y+1 < GRIDWIDTH ){
        positions.push({ x: xAxis[x+2],  y: y+1+1});
      }

      if( x-2 >=0 && y +1 < GRIDWIDTH){
        positions.push({ x: xAxis[x-2],  y: y+1+1 });
      }

      if( x+2 < GRIDWIDTH && y -1 >= 0){
        positions.push({ x: xAxis[x+2],  y: y });
      }

      return positions;
    };

    const getPawnMoves = (positions):object[]=>{
      const x = axes.alpha[current.x];
      const y = axes.numeric[current.y];

      if(orientation[currentColor] == "down"){
        if(y == 1 ){
          positions.push({ x: xAxis[x],  y: y + 1 + 2 });
        } else {
          positions.push({ x: xAxis[x],  y: y + 1 + 1 });
        }
        return positions;
      } else if (orientation[currentColor] == "up") {
        if(y == 6 ){
          positions.push({ x: xAxis[x],  y: y - 1  });
        } else {
          positions.push({ x: xAxis[x],  y: y + 1 - 1  }); //to make it clear this is on purpose i added and subtracted 1
        }
        return positions;
      }
    };    
    
    const getValidDiagonals = (positions, range):object[]=>{
      for(let z = 0; z < 2; z++){
        const x = axes.alpha[current.x];
        const y = axes.numeric[current.y];
        // let xOffs = GRIDWIDTH - x;
        // let yOffs = GRIDWIDTH - y;
        let maxRange = 2;

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
              const pos = currentPositions[y+i][x+i]; 
              if(pos.length){
                br = true;
              }
              positions.push({ x:xAxis[x+i],  y:y+i + 1 });
            }
            if( x+i < GRIDWIDTH && y-i >=0 && !tr){
              const pos = currentPositions[y-i][x+i]; 
              if(pos.length){
                tr = true;
              }
              positions.push({ x:xAxis[x+i],  y:y-i + 1 });
            }
            if(y+i < GRIDWIDTH && x-i >= 0 && !bl){
              const pos = currentPositions[y+i][x-i]; 
              if(pos.length){
                bl = true;
              }
              positions.push({ x:xAxis[x-i],  y:y+i + 1 });
            }
            if(x-i >= 0 && y-i >= 0 && !tl){
              const pos = currentPositions[y-i][x-i]; 
              if(pos.length){
                tl = true;
              }
              positions.push({ x:xAxis[x-i],  y:y-i+1 });
            }
          }
        }
      }
      return positions;
    };

    const infinite = false;
    if(range.constraint === PB.omnidirectional && infinite == false){
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

  const getConstructedGrid = () => {
    return constructedPositions;
  };

  const [constructedBoard, setConstructedBoard] = useState<Array<ReactElement[]>>(
    getConstructedGrid()
  );
  
  const movePiece = (piecePos, targetLoc) =>{
    const current = piecePos.split()[0];
    const target = targetLoc.split()[0];
    if(piecePos != targetLoc){
      currentPositions[axes.alpha[target[0]]][axes.numeric[target[2]]] = currentPositions[axes.alpha[current[0]]][axes.numeric[current[2]]];
      currentPositions[axes.alpha[current[0]]][axes.numeric[current[2]]] = "";
      setConstructedBoard(createPositions());
    }
  };


  return (
    <div id = "board">
        <div id ="innercontainer">
          {constructedBoard}
        </div>
    </div>
  );
};

export default Chessboard;

Chessboard.displayName = "Chessboard";
