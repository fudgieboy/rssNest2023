import React, { ReactElement, useState, ReactNode, useEffect, useRef} from "react";
import RSSStore from "../stores/RSSStore";
import LocalStore from "../stores/LocalStore";
import {Folder} from "./FolderComponents";
import { FolderFactory, SubFactory} from '../../shared/types';
import GlobalAPI from "../API/globalAPI";
import v4 from "uuid/v4";
interface FolderFunctionality {
  updateSaveOption: () => void;
  deleteStorage: () => void;
  updateFromStorage: () => void;
  clearRenamingAll: () => void;
  getFolders: () => void;
  getSelectedFolder: () => void;
  setSelectedSub: () => void;
  checkLoginStatus: () => void;
  updateFeed: () => void;
  setCurrentFolder: () => void;
  getCenterPosition: () => void;
  getGlobalSize: () => void;
  getSideVisibility: () => void;
  currentFeed: {feed: string, counter: number};
  updateFeedCounter: number;
  search: (folderName: string, subs: []) => void;
}

const Leftbar: React.FC<FolderFunctionality> = (props: FolderFunctionality): ReactElement => {
  let list = [];
  if(RSSStore.store.getLastUsed() == undefined || RSSStore.store.getLastUsed() == null || RSSStore.store.getLastUsed().length == 0){
    list = RSSStore.store.getRSSList();
  } else {
    list = RSSStore.store.getLastUsed();
  }

  //would be nice to have the option to save a modified list that was modified while logged out.

  let [selectedFolder, setSelectedFolder] = useState(0); 
  let foldersObject = useRef(list); //taken from the lastUsedList in index.ejs file on the server.ts "/" route
  const [renaming, setRenaming] = useState(false);
  const [folders, modifyFolders] = useState<ReactElement[]>(constructFolders());

  const receiveSubscriptionUpdate = (index, name)=>{
    foldersObject.current[selectedFolder].subscriptions[index].name = name;
    saveUpdatedFolders();
  };  
  
  const receiveFolderNameUpdate = (index, newName) => {
    foldersObject.current[index].name = newName;
    saveUpdatedFolders(); //update the object but do not re-render until a folder is deleted or added
  };
  
  const receiveUpdateFromFolder = (index, subscriptions) => {
    foldersObject.current[index].subscriptions = subscriptions;
    saveUpdatedFolders(); //update the object but do not re-render until a folder is deleted or added
  };

  function updateLoginFolders() {
    foldersObject.current = LocalStore.store.getLoginList();

    console.log("updateLoginFolders");
    console.log(foldersObject.current);
    
    modifyFolders(constructFolders());
  }

  const saveUpdatedFolders = () => {
    const loggedIn = LocalStore.store.getLoggedIn();

    if(loggedIn == true){
      GlobalAPI.setList(foldersObject.current,
        (res)=>{ console.log(res);},
        (errMsg)=>{ 
          console.log(errMsg);
        });
    }
    RSSStore.store.saveListToLocalStorage(foldersObject.current);
  };

  const addFolder = ()=>{
    const newFolder = FolderFactory();

    if(foldersObject.current == null || foldersObject.current.length == 0){
      foldersObject.current = [newFolder];
    } else {
      foldersObject.current.push(newFolder);
    }
    saveUpdatedFolders();
    modifyFolders(constructFolders());
  };

  const deleteFolder = () => {
    if(foldersObject.current.length == 1){
      return;
    }

    console.log(foldersObject.current);

    foldersObject.current.splice(selectedFolder, 1);
    
    saveUpdatedFolders(); 
    modifyFolders(constructFolders());
    setSelectedFolder(0);
  };

  function constructFolders (): ReactElement[] {
    if( foldersObject == undefined ||foldersObject == null || (foldersObject!=null && foldersObject.current==null) ){ //this is a big bug
        return [];
    } 

    const renderFolders = [];
    for(let i = 0; i  < foldersObject.current.length ; i++){

      const folder = <Folder dateAdded = {foldersObject.current[i].dateAdded}
              description = { foldersObject.current[i].description }
              subscriptions = { foldersObject.current[i].subscriptions }
              name = { foldersObject.current[i].name }
              index = {i}
              key = { v4() }
              updateSubOnFolderObject = {(index, name)=>{ receiveSubscriptionUpdate(index, name); }}
              updateFolderObjectName = {(index, subscriptions)=>{
                receiveFolderNameUpdate(index, subscriptions);
              }}
              updateFolderObject = {(index, subscriptions)=>{
                receiveUpdateFromFolder(index, subscriptions);
              }}
              selectFolder = {(i)=>{ setSelectedFolder(i);}}
            />;
      
      renderFolders.push( 
        folder          
      );
    }
    
    return renderFolders;
  }

  const activateFolderRename=()=>{
    setRenaming(!renaming);
  };

  useEffect(() => {
    LocalStore.store.on("update_login_status", updateLoginFolders); 
  }, []);
    
  const actions = {
    Search:{
      name: "Search",
      active: true, 
      behavior: ()=>{
        props.search(foldersObject.current[selectedFolder].name, foldersObject.current[selectedFolder].subscriptions.map(x => x.name));
      }
    },
    Rename:{
      name: "Rename",
      active: true,
      behavior: ()=>{
        activateFolderRename();
      }
    },
    Delete:{
      name: "Delete",
      active: true,
      behavior: ()=>{
        deleteFolder(selectedFolder);
      }
    }
  };
  
  function getFolderOpts(){
    if(folders.length == 0 || selectedFolder == null){
      return <ul></ul>;
    }
    const renderOpts = [];

    for(let i in foldersObject.current[selectedFolder].actions){

      foldersObject.current[selectedFolder].actions[i] == true ? renderOpts.push(
          <li key={ v4() } >
            <button className = "button" onClick = {()=>{ actions[i].behavior(); }}>
              {i}
            </button>
          </li>
        ): null;
    }   
    return <ul id = "folderOpts">{renderOpts}</ul>;
  }

  const retractOptions = (bool:boolean)=>{
      bool;
  };

  // const deleteLocalFolders = ()=>{
  //   props.deleteStorage();
  // };

  // const expandOptions = ()=>{
  // };

  // const pinOptions = (folder: Folder)=>{
  // };

  // const updateSaveOption = ()=>{
  //   props.updateSaveOption();
  // }; 
 
  // const finishRenamingAll = () => {
  //   props.clearRenamingAll();
  // };

  return (
    <div id = "leftBar" className = "sidebar">
      <div className = "container">
        <div className = "innerContainer">
          <h2>RSS Nest</h2>
          <h5>Subscriptions</h5>
          <div>
            <div id = "leftOptsMask" className = "optionsMask" onClick={()=>{retractOptions(true);}} ></div>
            <div className = "subTitle"><span>Folders</span><button className = "button" id = "addFolder" type="button" name="newfolder" onClick={()=>{addFolder();}}>[new]</button></div>
            <ul className="folderList">
              {folders} 
            </ul>
            {getFolderOpts()} 

            {/* <div id = "leftOptions" className ="hideOpts options leftOpts anim" onClick={()=>{pinOptions(folder)}} onMouseEnter={()=>{expandOptions()}} onMouseLeave={()=>{retractOptions()}}>
              <div className = "optionsHeader"><h4>Options</h4></div>
              <div className = "optionsContainer">
                <span><input className = "button" type="checkbox" ng-model="saveFoldersOpt"
                  onChange = {()=>{updateSaveOption();}
                }/>Save Folders Locally</span>
                <button className = "button" onClick={deleteLocalFolders()}>Delete Local Folders</button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
Leftbar.displayName = "Leftbar";
