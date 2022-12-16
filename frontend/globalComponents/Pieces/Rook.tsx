import React, { ReactElement, Component, useEffect, useState } from "react";
import {PB} from "./PieceTypes";

const move = () => {
  return {x:"max", y:"max", constraint: PB.lateral};
};

const Rook: React.FC = (p): ReactElement => {
  return (
    <div className= "rook specific">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" preserveAspectRatio="none" 
            viewBox="0 0 45 45">
        <g stroke={p.outline} fill={p.color} transform="translate(0,0.3)">
          <path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "/>
          <path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "/>
          <path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"/>
          <path d="M 34,14 L 31,17 L 14,17 L 11,14"/>
          <path d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"/>
          <path d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5"/>
          <path d="M 11,14 L 34,14"/>
        </g>
      </svg>
    </div>
  );
};

export default Rook;

Rook.displayName = "Rook";

Rook.move = move;
