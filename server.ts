import {config} from "./apiKeys";
import express from "express";
import path from "path";
import colors from "colors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import * as jwtHelper from "./backend/utils/jwtHelper";
import ejs from "ejs";
const winston = require('winston');
const port = 8080;

const logConfiguration = {
  'transports': [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: 'logs/mainLog.txt'
      })
  ]
};

const logger = winston.createLogger(logConfiguration);

const app = express();

require("@babel/register")({extensions: [".js", ".ts"]});

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

  // !utils.n(encodedToken)? req.userToken = jwtHelper.verifyLoginToken(encodedToken):null;
 
  next();
});

console.log("curEnv: " + curEnv);

let dirPrefix = "build/";
if(curEnv == "production"){
  dirPrefix = "";
}

app.get("/", (req,res) => {
  res.render(path.resolve(__dirname, dirPrefix + "dist", "index.ejs"), {
    socketPort: 5000
  });
});

app.get("/test", (req,res) => {

  logger.log({
    message: "testing test route",
    level: 'info'
  });
  
  res.render(path.resolve(__dirname, dirPrefix + "dist", "index.ejs"), {
    socketPort: 5000
  });
});

app.use(require("./backend/list/listRoutes"));
app.use(require("./backend/users/userRoutes"));

console.log("starting app...");

// const address = (config.curEnv == "production")? '3.232.19.78': '127.0.0.1';

app.listen(port, () => {
  console.log(colors.yellow(`Listening to app on ${port} in ${curEnv} mode`));
});

export {};