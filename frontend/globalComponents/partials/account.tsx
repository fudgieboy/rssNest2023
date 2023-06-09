import React, { ReactElement } from "react";
import LoginAPI from "../../API/loginAPI";

interface AccountFunctionality {
    showSide: (delay:number, side: string) => void;
    updateLoggedInStatus: (delay:number) => void;
  }

const Account: React.FC<AccountFunctionality> = (props:AccountFunctionality): ReactElement => {
    
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
  </div>
  );
};

export default Account;