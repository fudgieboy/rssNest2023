import {config} from "./apiKeys";
import express from "express";
import path from "path";
import colors from "colors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import * as jwtHelper from "./backend/utils/jwtHelper";
import ejs from "ejs";
import {UserData} from "./backend/dataAccess/users";
import {ListData} from "./backend/dataAccess/lists";
import {l, n} from "./backend/utils/misc";
import sanitize from 'mongo-sanitize';

import {connection} from "./backend/dataAccess/dbConnection";

connection(config.dbCreds);

import listRoutes from "./backend/list/listRoutes";
import userRoutes from "./backend/users/userRoutes";


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

  for(let i in req.body){
    req.body[i] = sanitize(req.body[i]);
  }
  
  const encodedToken = req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.cookies.token;

  !n(encodedToken)? req.userToken = jwtHelper.verifyLoginToken(encodedToken):null;
 
  next();
});

console.log("curEnv: " + curEnv);

let dirPrefix = "build/";
if(curEnv == "production"){
  dirPrefix = "";
}

app.get("/", async(req,res) => { 
  if(!n(req.userToken)){
    UserData.getUserByUsername(req.userToken, (getUserError, resUser)=>{
      ListData.getListbyUserId(resUser.memberID, (getListError, resList)=>{

        let actuallyEmpty = false;
        const requests = resUser.friendRequests;
        const requestsArray = [];
        

        
        if(resList == null || resList.list.length === 0){
          actuallyEmpty = true;
          resList = {list: []};
        }

        for(let i in requests){
          requestsArray.push(requests[i]);
        }

        if(resUser.friends.length > 0){
          const friendList = [];
          for(let i = 0; i< resUser.friends.length; i++){
            
            console.log("getting frined array");
            
            UserData.getUserByUsername(resUser.friends[i], (getUserError, resUser2)=>{
              ListData.getListbyUserId(resUser2.memberID, (getListError, resList2)=>{
                if(n(getListError) && !n(resList2)){
                  const newFriend = {friend: resUser2.username, list: resList2.list};
                  friendList.push(newFriend);
                  console.log(friendList);
                }
                if(i == resUser.friends.length-1){
                  res.render(path.resolve(__dirname, dirPrefix + "dist", "index.ejs"), {
                    lastUsedList: JSON.stringify(resList.list),
                    userListActuallyEmpty: actuallyEmpty,
                    friendRequests: JSON.stringify(requestsArray),
                    friendList: JSON.stringify(friendList),
                  });
                }
              });
            });
          }
        } else {

          res.render(path.resolve(__dirname, dirPrefix + "dist", "index.ejs"), {
            lastUsedList: JSON.stringify(resList.list),
            userListActuallyEmpty: actuallyEmpty,
            friendRequests: JSON.stringify(requestsArray),
            friendList: JSON.stringify([]),
          });
        }


      });
    });
  } else {
    l("encodedToken is null");
    res.render(path.resolve(__dirname, dirPrefix + "dist", "index.ejs"), {
      lastUsedList: JSON.stringify([]),
      userListActuallyEmpty: false,
      friendRequests: [],
      friendList: JSON.stringify([]),
    });
  }
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

app.use(listRoutes);
app.use(userRoutes);

console.log("starting app...");

// const address = (config.curEnv == "production")? '3.232.19.78': '127.0.0.1';

app.listen(port, () => {
  console.log(colors.yellow(`Listening to app on ${port} in ${curEnv} mode`));
});

export {};