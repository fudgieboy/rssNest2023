import React, { ReactElement} from "react";
import LoginAPI from "../../API/loginAPI"; 

interface LoginFunctionality {
  showSide: (delay:number, side: string) => void;
  updateLoggedInStatus: (delay:number) => void;
}



const Login: React.FC<LoginFunctionality> = (props:LoginFunctionality): ReactElement => {
  const [username, setUsername] = React.useState(""); 
  const [password, setPassword] = React.useState(""); 
 
	const updateUsername = (ev) => {
    setUsername(ev.target.value);
  };

  const updatePassword = (ev) => {
    setPassword(ev.target.value);
  };
 
	const login = (ev) => {
    ev.preventDefault();
    LoginAPI.login({
        username: "test",
        password: "password"
      }, 
      (loadedList)=>{
        //set the appropriate delay here based on the cookie age from the server


        props.showSide(0, "account");
      },
      (errMsg)=>{ console.log(errMsg);});
  };
    
  const getRegisterPage = () => {
    return props.showSide(0, "register");
  };
	
  return (
    <div id = "loginForm" style = {{marginLeft: "30px"}}  className="innerContainerForm">
      <div ng-model = "destroyCotroller">
        <div ng-start-up = 'destroyController'>
          <h2 className="page-header">Login:</h2>
          <div id = "registerquery"><div className = "question">Not registered?</div> <button onClick = {()=>getRegisterPage()} type="submit" style = {{marginTop: '10px'}} className = "button registerButton" id = "actionSelect">[register]</button></div>
          <form id="submitForm" onSubmit = {(ev)=>{login(ev);}}>
            <div className="">
              <input maxLength={16} id = "username" type="text" className="rightField" name="username" placeholder="[username]" onChange = {(ev)=>{updateUsername(ev);}}/>
            </div>
            <div className="">
              <input maxLength={32} id = "password" type="password" className="rightField" name="password" placeholder="[password]" onChange = {(ev)=>{updatePassword(ev);}} />
            </div>
            <button type="submit" className="button">[submit]</button>
          </form>
        </div>
      </div>
    </div>
	);
};

export default Login;