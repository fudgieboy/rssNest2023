import React, { ReactElement, useState } from "react";
import LoginAPI from "../../API/loginAPI";
import FlashMessage from "react-flash-message";
import LocalStore from "../../stores/LocalStore";
interface AccountFunctionality {
    showSide: (delay:number, side: string) => void;
    updateLoggedInStatus: (delay:number) => void;
  }

const Account: React.FC<AccountFunctionality> = (props:AccountFunctionality): ReactElement => {
  let [friendName, setFriendName] = useState("");
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(false);

  const expandOptions = (ev)=>{

  };

  const retractOptions = (ev)=>{

  };

  const clickRightBar = (ev)=>{
    
  };

  const updateLoginOpt = (ev)=>{
    
  };
    
  const pinOptions = (ev)=>{

  };

  const generateFriendRequests = () => {
    const friendRequests = LocalStore.store.getFriendRequests();
    
    if(friendRequests != null && friendRequests != undefined){
      const constructedRequests = [];
    
      for(let i = 0; i<friendRequests.length; i++){
        constructedRequests.push(<li className="friendrequest">{friendRequests[i]} <button onClick = {()=>{ finishAddFriend(friendRequests[i], true);}}>Accept</button> <button onClick = {()=>{ finishAddFriend(friendRequests[i], false);}}>Reject</button></li>);
      }
      
      return constructedRequests;
    } else {
      return <li className="friendrequest"></li>;
    }
  };
  
  const finishAddFriend = (friendName, acceptFriend) => {
    LoginAPI.finishAddFriend( {
      username: friendName,
      friendAccepted: acceptFriend,
    }, 
      (response)=>{
        setMessage(response);
        setStatus(true);
      },
      (errMsg)=>{ 
        setMessage(errMsg);
        setStatus(true);
        console.log(errMsg);
      });

  };

  
  const addFriend = () => {
    LoginAPI.addFriend( {
      username: friendName,
    }, 
      (response)=>{
        console.log(response);
      },
      (errMsg)=>{ console.log(errMsg);});

  };

  const logout = () => {
    LoginAPI.logout( 
      ()=>{
        document.cookie = `loggedIn=false;max-age=12000;`;
        props.showSide(0, "login");
      },
      (errMsg)=>{ console.log(errMsg);});

    props.showSide(0, "login");
  };
    
  return (
  <div id = "accountInfo" style = {{marginLeft: "30px"}} className="innerContainerForm"  onClick = {(ev)=>{clickRightBar(ev);}}>
    <h2 className="">Account:</h2> 
    <div id = "rightOptsMask" className = "optionsMask"  onClick = {()=>{retractOptions(true);}}></div>
    <div ng-model = "destroyCotroller">
      <div ng-start-up = 'destroyController'>
      {/* <h4 className="page-header">Welcome, <%=username%>!</h4>  */}
      <div id = "accountFolders" data-targ = "<%=user%>" data-token = "<%=token%>" data-incomingfolders = "<%=folders%>"></div>
          
      <button  onClick = {()=>{logout();}} style = {{marginTop: "10px"}} className = "button registerButton" id = "actionSelect" data-target="users/logout" >[logout]</button>

    </div>
    </div>

    <div id = "rightOptions" className ="hideOpts options rightOpts anim" onClick = {(ev)=>{pinOptions(ev);}} ng-click="check()" onMouseOver = {(ev)=>{clickRightBar(ev)}} onMouseLeave = {(ev)=>{retractOptions(ev)}}  onFocus = {(ev)=>{retractOptions(ev)}}>
      <div className = "optionsHeader"><h4>Options</h4></div>
      <div className = "optionsContainer">
        <input className = "button" type="checkbox" ng-model="autoLoginOpt" onChange = {(ev)=>{updateLoginOpt(ev)}} ng-click=""/>Automatically Log In
      </div>
    </div>

    

    <div id = "friends">
          <h2>Friends:</h2>

          {/* get info from list controller and login controller. add functionality to add friend based on public id string */}
          <ul id = "friendRequestList" className = "friendList">
            {generateFriendRequests()}
          </ul>


          <FlashMessage duration={5000}>
                <strong>{message}</strong>
          </FlashMessage> 

          <input className="rightField"  onChange = {(ev)=>{setFriendName(ev.target.value);}} placeholder = "[add Friend By Username]"></input>
          <button onClick = {()=>{addFriend();}} className="button registerButton" >[add Friend]</button>
    </div>
  </div>
  );
};

export default Account;