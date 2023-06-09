import EventEmitter from "events";
import dispatcher from "./Dispatcher";

let todoList = [];

class TodoListStore extends EventEmitter {

    lastUsed = window.lastUsedList;
    setTodoList(action){
        this.saveListToLocalStorage(action.payload);
        if(action.payload){
            todoList = action.payload;
        }
        action.payload.callback();
    }

    updateLocalStorageList(action){
        this.saveListToLocalStorage(action.payload);
        if(action.payload){
            todoList = action.payload;
        }
        action.payload.callback();
    }

    saveListToLocalStorage(list){
        console.log("list");
        console.log(JSON.stringify(list));
        localStorage.setItem("localList", JSON.stringify(list));
    }
    
    setListFromLogin(loginList){ todoList = loginList;}

    getTodoList(){ return todoList; }

    getLastUsed(){
        return this.lastUsed;
    }
    
    handleActions = (action) => {
        switch(action.type){          
            case "UPDATE_TODOLIST_STORE":
                this.setTodoList(action);
                this.emit("update_todolist");
                break;
        }
        
        switch(action.type){          
            case "UPDATE_TODOLIST_LOCALSTORE":
                this.updateLocalStorageList(action);
                this.emit("update_todolist");
                break;
        }
    }
}

class TodoListActions {
    updateTodoList(data, callback, error){
        data.callback = callback;
        dispatcher.dispatch({
            type: "UPDATE_TODOLIST_STORE",
            payload: data,
            errors: error,
        });
    }

    updateLocalStorageList(data, callback, error){
        data.callback = callback;
        dispatcher.dispatch({
            type: "UPDATE_TODOLIST_LOCALSTORE",
            payload: data,
            errors: error,
        });
    }
}

const todoListStore = new TodoListStore;
const todoListActions = new TodoListActions;
dispatcher.register(todoListStore.handleActions);

export default {
    store: todoListStore, 
    actions: todoListActions
};