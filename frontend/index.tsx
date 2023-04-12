import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/global.scss";
import { BrowserRouter } from 'react-router-dom';

if(global.env === "development"){
    require("@babel/register")({extensions: [".js", ".ts", "tsx"]});
} else if(global.env === "production"){
    require("@babel/register")({extensions: [".js", ".ts", "tsx"]});
    console.log = function(){};
}

ReactDOM.render(
<BrowserRouter>
    <App />
</BrowserRouter>
, document.getElementById("root"));