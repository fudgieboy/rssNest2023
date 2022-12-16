import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/global.scss";

if(global.env === "development"){
    require("@babel/register")({extensions: [".js", ".ts", "tsx"]});
} else if(global.env === "production"){
    require("@babel/register")({extensions: [".js", ".ts", "tsx"]});
    console.log = function(){};
}

ReactDOM.render(<App />, document.getElementById("root"));