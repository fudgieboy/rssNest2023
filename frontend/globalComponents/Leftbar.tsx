import React, { ReactElement, useState, ReactNode} from "react";
import $ from 'jquery';

interface FolderFunctionality {
  updateSaveOption: () => void;
  deleteStorage: () => void;
  updateFromStorage: () => void;
  clearRenamingAll: () => void;
  getFolders: () => void;
  getSelectedFolder: () => void;
  setSelectedFolder: () => void;
  addFolder: () => void;
  setSelectedSub: () => void;
  checkLoginStatus: () => void;
  updateFeed: () => void;
  setCurrentFolder: () => void;
  getCenterPosition: () => void;
  getGlobalSize: () => void;
  getSideVisibility: () => void;
}

interface Subscription{
  renaming: boolean;
  name: string
}

interface Folder {
  subscriptions: Array<Subscription>;
  renaming: boolean;
}

const Leftbar: React.FC<FolderFunctionality> = (props: FolderFunctionality): ReactElement => {
  const [folder, modifyFolder]= useState<Folder>();

  const clickLeftBar = ()=>{
  };

  const addFolder = ()=>{
  };

  const retractOptions = (bool:boolean)=>{
  };

  const finishFolderRename = (folder: Folder)=>{
  };

  const finishSubRename = (sub)=>{
  };

  const deleteLocalFolders = ()=>{
    props.deleteStorage();
  };

  const expandOptions = ()=>{
  };

  const selectFolder = (folder: Folder)=>{
  };

  const pinOptions = (folder: Folder)=>{
  };


  const updateSaveOption = ()=>{
    props.updateSaveOption();
  }; 
 
  const finishRenamingAll = () => {
    props.clearRenamingAll();
  };


  const getFolders = () => {
    props.getFolders();
  };

 
  const getSubList = (): ReactNode => {
    const sub = {
      name: "nameTest",
      renaming: "renamingTest"
    };
    
    return <li ng-repeat="sub in folder.subscriptions">
              <input className = "folderSubButton button" ng-if="!sub.renaming" type = "button" value ={sub.name} onChange = {()=>{}} onClick={()=>{ selectSub(folder); }}/>
              <form ng-if ="sub.renaming"  onSubmit={()=>{finishSubRename(folder);}}>
                <input maxLength = {19} className = "folderSubButton renameButton" id = "subButton"  ng-model = "sub.name" type = "text" value ={sub.name} onChange = {()=>{}} onClick={()=>{selectSub(folder);}}/>
              </form>
            </li>;
  };

  const getFolderList = (): ReactNode => {
    return <li ng-repeat="folder in folders track by $index" className = 'anim'>
            <input className = "button folderButton" maxLength = {19} ng-if ="!folder.renaming" type = "button" value ="{{folder.name}}" onChange = {()=>{}} onClick={()=>{selectFolder(folder);}}/>
              <form ng-if ="folder.renaming" onSubmit={()=>{finishFolderRename(folder);}}>
                <input maxLength = {19} className = "folderButton renameButton" ng-model = "folder.name" type = "text" value ="{{folder.name}}" onChange = {()=>{}} onClick={()=>{selectFolder(folder);}}/>
              </form>
              <ul className = "subList">
              {getSubList()}
            </ul>
          </li>;
  };

  return (
    <div id = "leftBar" className = "sidebar">
      <div className = "container">
        <div className = "innerContainer">
          <h2>RSS Nest</h2>
          <h5>Subscriptions</h5>
          <div ng-controller = "leftBar" onClick={()=>{clickLeftBar();}}>
            <div id = "leftOptsMask" className = "optionsMask" onClick={()=>{retractOptions(true);}} ></div>
            <div className = "subTitle"><span>Folders</span><button className = "button" id = "addFolder" type="button" name="newfolder" onClick={()=>{addFolder();}}>[new]</button></div>
            <ul ng-model="folders" className="folderList">
                {getFolderList()} 
            </ul>
            <div id = "leftOptions" className ="hideOpts options leftOpts anim" onClick={()=>{pinOptions(folder)}} onMouseEnter={()=>{expandOptions()}} onMouseLeave={()=>{retractOptions()}}>
              <div className = "optionsHeader"><h4>Options</h4></div>
              <div className = "optionsContainer">
                <span><input className = "button" type="checkbox" ng-model="saveFoldersOpt"
                  onChange = {()=>{updateSaveOption();}
                }/>Save Folders Locally</span>
                <button className = "button" onClick={deleteLocalFolders()}>Delete Local Folders</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
Leftbar.displayName = "Leftbar";
