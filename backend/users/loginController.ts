import * as helper from "../utils/jwtHelper";
import {config} from "../../apiKeys";
import {e, l, n} from "../utils/misc";
import {ListData} from "../dataAccess/lists";
import {UserData} from "../dataAccess/users";


const dev = (config.curEnv === "development");

const loginController = () =>{



  const getUserInfo = async (req, res) =>{
    // await UserData.comparePassword(loginUser.password, resUser.password);
// await ListData.getListbyUserId(resUser.memberID, (getListError, resList)=>
            
  };
  
  const login = async (req, res) =>{
    
    const loginUser = {
        username: req.body.username,
        password: req.body.password
    };

    UserData.getUserByUsername(loginUser.username, (getUserError, resUser)=>{

      l("User");
      l(resUser);
      
      if(n(getUserError)){
        if(!n(resUser)){
          UserData.comparePassword(loginUser.password, resUser.password, (compareErr, match)=>{
            if(n(compareErr)){
              if(!n(match)){
                if( match !== false ){
                  ListData.getListbyUserId(resUser.memberID, (getListError, resList)=>{ 

                    const list = resList;
                    
                    // const list = JSON.parse(resList.list);

                    if(n(getListError)){
                      const token = helper.getLoginToken(loginUser.username);
                      const expiryTime = Date.now() + (dev?360000:3600000); 
                      
                      res.cookie("expiryTime", 
                        expiryTime, 
                        {expires: new Date(expiryTime),
                          secure: !dev,
                          httpOnly: false,
                        });

                      res.cookie("token", 
                        token, 
                        {expires: new Date(expiryTime),
                          secure: !dev,
                          httpOnly: true,
                        });

                      res.cookie("loggedIn", 
                        true, 
                        {expires: new Date(expiryTime),
                          secure: !dev,
                          httpOnly: false,
                        });

                      if(n(resList)){
                        res.status(200).send({data: "List not found."});
                      } else {
                        res.status(200).send({data: list});
                      }
                    } else {
                      l("getListError Error");
                      l(getListError);
                    }
                  });
                } else {
                  l("Login Failed: Incorrect Password");
                  res.status("404").send({data:"User not found"});
                }
              } else {
                l("comparePassword: Error comparing passwords");
                res.status("500").send({data:"Login Failed"});
              } 
            } else {
              l("compareErr Error");
              res.status("500").send({data:"Error"}); 
            }
          });
        } else {
          l("getUserError Error, user not found");
          res.status("404").send({data:"User not found"}); 
        }
      } else {
        l("getUserError Error");
        res.status("500").send({data:"Error searching for user"});
      }
    });
  };
  
  const logout = async (req, res) =>{
    res.clearCookie("token", "", {expires: Date.now()});
    res.send({data: "logout"});
  };

  return {
    login,
    logout,
    getUserInfo
  };
};

export default loginController();
