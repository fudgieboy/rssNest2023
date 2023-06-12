import LocalStore from "../stores/LocalStore";
import RSSStore from "../stores/RSSStore";

const login = (params, callback, fail) => {


    fetch("/users/login", { 
        method: "POST",
        body: JSON.stringify(params),
        headers:{
            "Content-Type": "application/json",
        }}).then((response)=>{
            if(response.status === 200){
                const reader = response.body.getReader();
                reader.read().then((res)=>{
                    let token = String.fromCharCode.apply(null, res.value);
                    token = JSON.parse(token); 

                    console.log("login");
                    console.log(token.data.list);
                    
                    LocalStore.actions.loginUser(token.data.list, callback, fail);
                    RSSStore.actions.updateRSSStore(token.data.list, callback, fail);
                });
            } else {
                console.log(response);
            }
        });
};

const logout = (callback, fail) => {
    fetch("/users/logout", {
        method: "GET",
        headers:{
            // "Content-Type": "application/x-www-form-urlencoded",
        }}).then((response)=>{
            if(response.status === 200){
                const reader = response.body.getReader();
                reader.read().then((res)=>{
                    let token = String.fromCharCode.apply(null, res.value);
                    LocalStore.actions.logoutUser(token, callback, fail);
                });
            } else {
                console.log(response);
            }
        });
};



const register = (params) => {
    fetch("/users/register", {
        method: "POST",
        body: JSON.stringify(params),
        headers:{
            "Content-Type": "application/json",
        }}).then((response)=>{
            if(response.status === 200){
                const reader = response.body.getReader();
                reader.read().then((res)=>{
                    let s = String.fromCharCode.apply(null, res.value);
                    console.log(JSON.parse(s));
                });
            } else {
                console.log(response);
            }
        });
};

export default {
    register,
    login,
    logout
};
