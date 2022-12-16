import todoListStore from "../stores/TodoListStore";

const setList = (list, callback, fail) => {
    let body = {    
        list: list
    };
    
    body = JSON.stringify(body);
   
    fetch("/list/setList", {
        method: "POST", 
        headers:{
            "Content-Type": "application/json"
        },
        body: body })
        .then((response)=>{
            console.log(response);
            if(response.status === 200){
                const reader = response.body.getReader();
                reader.read().then((res)=>{
                    
                    let s = String.fromCharCode.apply(null, res.value);
                    const data = JSON.parse(s);

                    todoListStore.actions.updateTodoList(data.list, callback, fail);
                });
            } else {
                console.log("error response");
                todoListStore.actions.updateLocalStorageList(list, callback, fail);
            }
        });
};
 
const getList = () => {
    fetch("/list/getList", {
        method: "GET", 
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
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
    getList,
    setList
};