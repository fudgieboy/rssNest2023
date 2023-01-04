import {config} from "./apiKeys";
import express from "express";
import path from "path";
import colors from "colors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import * as jwtHelper from "./backend/utils/jwtHelper";
import * as utils from "./backend/utils/misc";
import ejs from "ejs";
import Gamelogic from './shared/gamelogic';
import {createServer} from 'http';
import WebSocket, {WebSocketServer} from 'ws';
//https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket
const app = express();
const server = createServer();
const wss = new WebSocketServer({ port: 8081 });

require("@babel/register")({extensions: [".js", ".ts"]});

const port = process.env.PORT || 8080;
const curEnv = config.curEnv;
const dev = (curEnv === "development");
require("pretty-error").start();

// connection(config.dbCreds);

app.use(cookieParser(config.cookieSecret, { httpOnly: true })); 
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

ejs.delimiter = "?";
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "build/dist"))); //don't remove this, needed fir /dist files
app.use(express.static("build/dist"));

app.use(function(req, res, next) {
  if(dev){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  } 
  
  // res.header("Content-Type", "text/javascript");
  next();
}); 

app.use(function(req, res, next) {
  const encodedToken = req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;

  !utils.n(encodedToken)? req.userToken = jwtHelper.verifyLoginToken(encodedToken):null;
 
  next();
});

let dirPrefix = "build/";
if((process.env.HEROKU === "true" && curEnv === "production") || (__dirname.indexOf("build")!= -1)){//shouldn't need this anymore
  dirPrefix = ""; //if we are on heroku its starting from inside build folder already
}

console.log("process.env.HEROKU" + " " + process.env.HEROKU);
console.log("curEnv" + " " + curEnv);
console.log("__dirname" + " " + __dirname);

app.get("/", (req,res) => {
  res.render(path.resolve(__dirname, dirPrefix + "dist", "index.ejs"), {});
});

// app.use(require("./backend/list/listRoutes"));
// app.use(require("./backend/users/userRoutes"));

console.log("starting app...");

app.listen(port, () => {
  console.log(colors.yellow(`Listening to app on server port ${port} in ${curEnv} mode`));
});

const gamelogic = Gamelogic();

wss.on('connection', function connection(ws) {
  
  ws.binaryType = 'arraybuffer';

  ws.on('message', function message(data) {
    
    const inputCommands = JSON.parse(data.toString());

    if(inputCommands.command == "getValidMoves"){
      const moves = gamelogic.getValidMoves(inputCommands.location);
      ws.send(JSON.stringify({command: "receiveMoves", movelist: moves}));
    }
    
    if(inputCommands.command == "movePiece"){
      console.log("movePiece");
      const moves = gamelogic.movePiece(inputCommands.location, inputCommands.target);
      ws.send(JSON.stringify({command: "finishMove", completedMove: moves}));
      
      console.log(wss.clients);

      wss.clients.forEach( (client) => {
        console.log("finishMove");
          client.send(JSON.stringify({command: "finishMove", completedForeignMove: moves}));
      });
    }
    // ws.on('message', function message(data, isBinary) {
    // });
  });

  ws.send('connection initialized');
});


export {};