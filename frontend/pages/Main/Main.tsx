import React, {ReactElement, Component, useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from "react-router-dom";
import LocalStore from "../../stores/LocalStore";
import Chessboard from "../../globalComponents/Chessboard"; 

const Main: React.FC = () : ReactElement => {
  const [loggedIn, setLoggedIn] = useState<boolean>(LocalStore.store.getLoggedIn());
  const [unmountLoginForms, setUnmountLoginForms] = useState<boolean>(LocalStore.store.getLoggedIn());
                 
  // const updateLoggedInStatus = (loggedIn:boolean):void=>{
  //   setLoggedIn(loggedIn);
  // };

  // const updateMountStatus = (mount:boolean):void =>{
  //   setUnmountLoginForms(mount);
  // };

  // const revealLoginForms = (delay:number):void => { 
  //   setTimeout(()=>{
  //     updateLoggedInStatus(false);
  //     updateMountStatus(false);
  //   }, delay);
  // };

  // const hideLoginForms = (showDelayTime:number):void=>{
  //   updateLoggedInStatus(true);

  //   setTimeout(()=>{
  //     updateMountStatus(true);
  //   }, 1000); //1000 is the scss animation time

  //   revealLoginForms(showDelayTime);
  // };

  // useEffect(()=>{
  //   if(LocalStore.store.getLoggedIn()){
  //     revealLoginForms(LocalStore.store.getLoginExpiryTime());
  //   }
  // }, []);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     document.title = `Time is: ${new Date()}`;
  //   }, 1000);
 
  //   return () => {
  //     document.title = "Time stopped.";
  //     clearInterval(intervalId);
  //   };
  // }, []);

  // var loginInnerContainerClasses = ( loggedIn ?"hidden": "") + " anim";

  return (
    // <Router>
      <div id = "main">
          <div id = "header">
            <h1>Chess</h1>
            <ul >
              {/* <li><Link to = "/blog">Interactive Body Map</Link></li> */}
              {/* <li><Link to = "/projects">Schedule Appointment</Link></li> */}
              {/* <li><Link to = "/projects">Contact</Link></li> */}
              {/* <li><Link to = "/apps">Location</Link></li> */}
            </ul>
          </div>  
            <Chessboard />
          {/* <div id = "loginFormsContainer">
            <div className = {loginInnerContainerClasses} >
              {!unmountLoginForms ? <Register hideSelf = {hideLoginForms} showSelf = {revealLoginForms} /> :null}
              {!unmountLoginForms ? <Login  hideSelf = {hideLoginForms} showSelf = {revealLoginForms}/> :null}
            </div>
          </div>  */}
      </div>
    // </Router>
  );
};

Main.displayName = "Main";

export default Main;