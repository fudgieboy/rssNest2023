import {config} from "./apiKeys";
import express from "express";
import path from "path";
import colors from "colors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
// import stackTrace from "stack-trace";
import * as jwtHelper from "./backend/utils/jwtHelper";
import UserData from "./backend/dataAccess/users";
import ListData from "./backend/dataAccess/lists";
import * as utils from "./backend/utils/misc";
import {connection} from "./backend/dataAccess/dbConnection";
import ejs from "ejs";

require("@babel/register")({extensions: [".js", ".ts"]});

const app = express();

const port = process.env.PORT || 8080;
const curEnv = config.curEnv;
const dev = (curEnv === "development");
require("pretty-error").start();

connection(config.dbCreds);

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

let dirPrefix = "";
// if((process.env.HEROKU === "true" && curEnv === "production") || (__dirname.indexOf("build")!= -1)){//shouldn't need this anymore
//   dirPrefix = "build/";
// }

console.log("process.env.HEROKU" + " " + process.env.HEROKU);
console.log("curEnv" + " " + curEnv);
console.log("__dirname" + " " + __dirname);

app.get("/", (req,res) => {
  res.render(path.resolve(__dirname, "build/dist", "index.ejs"));
});

app.use(require("./backend/list/listRoutes"));
app.use(require("./backend/users/userRoutes"));

// app.get("/login/", function (req, res) {
//   res.header("Content-Type", "text/html");
//   res.sendFile(path.resolve(__dirname, "dist", "index.html"));
// });

// app.get("/register/", function (req, res) {
//   res.header("Content-Type", "text/html");
//   res.sendFile(path.resolve(__dirname, "dist", "index.html"));
// });

console.log("starting app...");

app.listen(port, () => {
  console.log(colors.yellow(`Listening to app on server port ${port} in ${curEnv} mode`));
});

export {};