import {UserData} from"../dataAccess/users";
import {ListData} from "../dataAccess/lists";
import {l, n} from "../utils/misc";
import Parser from "rss-parser";

const listController = ()=> {
  const getList = (req, res) => {
    console.log("getList");
    const urls = req.body.list;
    const parser = new Parser();

    const getFeed =  async () => {
      const newFeed = [];
      let feed;
      
      for(let i = 0; i < urls.length; i++){

        if(urls[i].length == 0){
          continue;
        }
        
        feed = await parser.parseURL(urls[i]);
        feed.items.forEach(item => { 
          const newFeedItem = {
            title: item.title,
            link: item.link,
            pubDate: item.pubDate
          };
          newFeed.push(newFeedItem);
        });
      }

      // console.log(newFeed);

      res.send(newFeed);
      
    };

    getFeed();
  };


  const setList = (req, res) => {
    const username = req.userToken;
    
    l("Decoded username: " + username);

    if(!n(username)){
      UserData.getUserByUsername(username, (getUserError, resUser)=>{
        if(n(getUserError)){
          if(!n(resUser)){
            l(resUser); 
            
            const newList = {
              creationDate: new Date().getTime(),
              memberID: resUser.memberID,
              name: "",
              list: req.body.list
            };

            ListData.updateList(resUser.memberID, newList, (saveListErr, savedList)=>{
              if(n(saveListErr)){ 
                if(!n(savedList)){
                  l("savedList");
                  l(savedList);
                  const {list, creationDate} = savedList;
                  res.status("200").send({list, creationDate});
                } else {
                  res.status("204").send({data: "List not saved"});
                }
              } else {
                res.status("500").send({data: "Error creating new list"});
              }
            });
          } else { 
            res.status("404").send({data: "No user found"});
          }
        } else {
          res.status("500").send({data: "Error"});
        }
      });
    } else {
      l("User not logged in");
      res.status("204").send({data: "User not logged in"});
    }
  };

  return {
    getList,
    setList
  };
};

export default listController();