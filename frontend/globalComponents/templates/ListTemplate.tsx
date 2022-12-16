// // import {PropTypes} from "prop-types";
// import React, {ReactElement, Component, useEffect, useState} from "react";
// // import PostItem from "./Postitem";
// // import {v4} from "uuid";
// // import blogAPI from "../API/blogAPI";
// // import Upload from "./Upload";
// // import TodoListStore from "../stores/TodoListStore";
// // import LocalStore from "../stores/LocalStore";

// var lastUsedList = TodoListStore.store.getLastUsed();

// const List:React.FC = (): ReactElement => {
//   // const [forumPosts, setForumPosts] = useState<Object[]>();
//   // let [newPost, setNewPost] = useState<string>("");
//   // const maxPostLength = 4000;
 
//   let list:Array<string> = [];
//   let textList: Array<string>;
//   let listDefaultLength = 10;
//   let listMaxLength = 20;
//   let activeListItem = 0;

//   if(typeof(lastUsedList) !== "string" && lastUsedList !== undefined && lastUsedList !== null && lastUsedList.length > 0){
//     list = lastUsedList;
//   } else {
//     if(globalThis.actuallyEmpty === true){
//       list = [];
//     } else {
//       // console.log("localList");
      
//       list = [
//         "do thing a",
//         "do thing b",
//         "do thing c",
//         "do thing d",
//         "do thing e",
//         "do thing f",
//         "do thing g",
//       ];
//     }
//   }

//   textList = list; 
  
//   useEffect(() => {
//     LocalStore.store.on("update_login_status", retrieveLoginList);
//   }); //is this the proper replacement for componentDidMount?

//   const buildTodoList = (todoList : Array<string>) : PostItem[] => {
//     let renderedList: Array<PostItem> = [];

//     for(var i = 0; i < todoList.length; i++){
//       renderedList.push(
//         // <PostItem key = {v4()}
//         //           index = {i}
//         //           active = {i === activeListItem?true:false} 
//         //           setToActive = {setToActive} 
//         //           delete = {deleteListItem} 
//         //           task = {todoList[i]}
//         //           placeholder = "enter new task here"
//         //           updateParent = {updateCompleteList}/>
//       );
//     }

//     return renderedList;
//   }

//   const retrieveLoginList = () => {
//     // textList = LocalStore.store.getLoginList().data;
//     // TodoListStore.store.setListFromLogin(textList);
//     // updateConstructedList();
//   }
  
//   const updateConstructedList =()=>{

//     const [constructedList, setTodoList] = useState<[Array<string>]>();

//     // this.setState( state => {
//     //   return{
//     //     constructedList: buildTodoList(textList),
//     //   };
//     // });
//   }

//   const addListItem = () => {
//     textList.push("");

//     console.log(textList);
    
//     // const loggedIn = LocalStore.store.getLoggedIn();
//     // if(loggedIn){
//     //   // Api.setList(textList,
//     //   //   (err)=>{
//     //   //     updateConstructedList();
//     //   //   },
//     //   //   (errMsg)=>{ console.log(errMsg);});
//     // } else {
//     //   updateConstructedList();
//     //   console.log(constructedList);
//     //   TodoListStore.store.saveListToLocalStorage(constructedList);
//     // }
//   }

//   const deleteListItem = (index) => {
//     textList = textList.filter((item, i)=>{
//       return i !== index;
//     });
    
//     const loggedIn = LocalStore.store.getLoggedIn();
//     if(loggedIn){
//       // Api.setList(textList,
//       //   (err)=>{
//       //     updateConstructedList();
//       //   },
//       //   (errMsg)=>{ console.log(errMsg);});
//     } else {
//       updateConstructedList();

//       console.log(constructedList);
      
//       TodoListStore.store.saveListToLocalStorage(constructedList);
//     }
//   };

//   const clearList = () => {
//     textList.length = 0;
//     updateConstructedList();
//   }

//   const setToActive=(index)=>{
//     activeListItem = index;
//   }
  
//   const updateCompleteList = (newVal, index) => {  
//     textList[index] = newVal;
//   } 

//   const [constructedList, setTodoList] = useState<[Array<PostItem>]>([buildTodoList(textList)]);
//   return (
//     <div id = "todolist">
//       <button className = "getlist" onClick = {()=>getList()}>Save List</button>
//       <button className = "additem" onClick = {()=>addListItem()} >Add Item</button>
//       {constructedList}
//     </div>
//   );
// };

// export default List;

// List.displayName = "List";
