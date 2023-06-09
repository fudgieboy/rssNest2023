import React, { ReactElement, useEffect, useState} from "react";
import LocalStore from "../stores/LocalStore";
import Login from "./partials/login";
import Register from "./partials/register";
import Account from "./partials/account";
import RSSStore from "../stores/RSSStore";

interface RSSFunctionality {
  getCenterPosition: ()=> void;
  getGlobalSize: ()=> void;
  getSideVisibility: ()=> void;
}

// interface LoginData {
//   getCenterPosition: ()=> void;
//   getGlobalSize: ()=> void;
//   getSideVisibility: ()=> void;
// }

const Rightbar: React.FC<RSSFunctionality> = (props: RSSFunctionality): ReactElement => {
  const [loggedIn, setLoggedIn] = useState(LocalStore.store.getLoggedIn());
  const [unmountLoginForms, setUnmountLoginForms] = useState(LocalStore.store.getLoggedIn());
  const [rssList, setRssList] = useState(retrieveLoginList());

  useEffect(()=>{
    const newList = RSSStore.store.on("update_rsslist", retrieveLoginList);
    setRssList(newList);
  },[]);
 
  // const getGlobalSize = () =>{
  //   return props.getGlobalSize();
  // };  
  
  function retrieveLoginList(){
    return RSSStore.store.getRSSList();
  }

  const updateLoggedInStatus = (loggedIn)=>{
    setLoggedIn(loggedIn);
  };

  const updateMountStatus = (mount)=>{
    setUnmountLoginForms(mount);
  };

  const [currentFormOffset, setCurrentForm] = useState("0px");
 
  
  const switchToForm = (delay, formName) => { 
    if(formName == "register"){
      setCurrentForm("0px");
    } else if (formName == "login"){
      setCurrentForm("-300px");
    } else if (formName == "account"){
      setCurrentForm("-600px");
    }
    
    setTimeout(()=>{
      updateLoggedInStatus(false);
      updateMountStatus(false);
    }, delay);
  };

  // const hideLoginForms = (showDelayTime:number)=>{
  //   updateLoggedInStatus(true);

  //   setTimeout(()=>{
  //     updateMountStatus(true);
  //   }, 1000); //1000 is the scss animation time

  //   revealLoginForms(showDelayTime);
  // };

  useEffect(()=>{ 
    if(LocalStore.store.getLoggedIn()){
      switchToForm(0, "account");
    }
  }, []);

  // const loginInnerContainerClasses = ( loggedIn ?"hidden": "") + " anim";
  
  return (
    <div id = "rightBar" className = "sidebar">
      <div className = "container">
        <div id = "accounts">
          <h2>RSS Nest</h2>
          <h5>Account</h5>
          <div id = "membershipStatus"> 
          <div id = "noAuth" ng-controller = "rightBar">
            <div id = "loginContainer" style = {{left: currentFormOffset}} className = "anim" >
              {!unmountLoginForms ? <Register showSide = {switchToForm} updateLoggedInStatus = {updateLoggedInStatus} /> :null}
              {!unmountLoginForms ? <Login showSide = {switchToForm} updateLoggedInStatus = {updateLoggedInStatus}/> :null}
              {!unmountLoginForms ? <Account showSide = {switchToForm} updateLoggedInStatus = {updateLoggedInStatus}/> :null}
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
Rightbar.displayName = "Rightbar";
