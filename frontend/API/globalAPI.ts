import RSSStore from "../stores/RSSStore";
import exampleList from "../globalComponents/ExampleList";

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

                    RSSStore.actions.updateTodoList(data.list, callback, fail);
                });
            } else {
                console.log("error response");
                RSSStore.actions.updateLocalStorageList(list, callback, fail);
            }
        });
};

const getList = (params, callback, error) => {
    params = JSON.stringify(params);

    fetch("/list/getList", {
        method: "POST",
        body: params,
        headers:{
            "Content-Type": "application/json",
        }}).then((response)=>{
            if(response.status === 200){
                const reader = response.body.getReader();
                reader.read().then((res)=>{
                    let list = String.fromCharCode.apply(null, res.value);
                    list = JSON.parse(list);

                    console.log("RSSLIST");
                    console.log(list);
                    
                    //if there's an error import examplelist for now
                    RSSStore.actions.updateRSSStore(list, callback, error);
                    // RSSStore.actions.updateRSSStore(exampleList, callback, error);

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