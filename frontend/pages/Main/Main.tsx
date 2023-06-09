import React, {ReactElement, useEffect, useState, useRef} from "react";
import RSSList from "../../globalComponents/RSSList"; 
import Leftbar from "../../globalComponents/Leftbar"; 
import Rightbar from "../../globalComponents/Rightbar"; 

const Main: React.FC = () : ReactElement => {
  
  //add leftbar scope.watches as useEffects
  // useEffect(() => { 
    
  // }, []);

  const checkLoginStatus = () => {
  };  

  const deleteStorage = () => {
    checkLoginStatus();
  };  

  // const updateFromStorage = () => {
  //   if(allowLocalStorage){
  //     this.setFolders(angular.fromJson(localStorage.rssNESTFolders))
  //   }
  // };
  

  const updateFromStorage = () => {
    // if(allowLocalStorage){
    //   this.setFolders(angular.fromJson(localStorage.rssNESTFolders))
    // }
  };
  
  const updateSaveOption = () => {
    // allowLocalStorage = value;
    // localStorage.allowLocalStorage = allowLocalStorage;
  };
  

  const clearRenamingAll =  () => {
  };
  
  const getFolders =  () => {

  };
  
  const getSelectedFolder =  () => {
  };

  const setSelectedFolder =  () => {
  };

  const setSelectedSub =  () => {

  };

  const updateFeed =  () => {
  };

  const addFolder =  () => {
  };


  const setSaveResponse =  () => {
  };


  const setResults =  () => {
  };



  let [position, setCenterPosition] = useState(null);
  let [sideVisibility, setSideVisibility] = useState(null);
  let [size, setSize] = useState(null);
  let [currentFeed, setCurrentFeed] = useState({feed: "", counter: 0});
  let [currentSearch, initiateSearch] = useState({name: "", feed: [], counter: 0});

  const exposeSide = (side) => {
    setCenterPosition(side);
  };

  const getCenterPosition = () => {
    return position;
  };

  const getGlobalSize = () => {
    return size;
  };

  const getSideVisibility = () => {
    return sideVisibility;
  };

  const setSavedFeed =  (newFeed) => {
    const newCounter = currentFeed.counter;
    setCurrentFeed({feed: newFeed, counter: newCounter+1});
  };

  const searchSubscriptionList = (folderName, subs)=>{
    const newCounter = currentSearch.counter;
    initiateSearch({name: folderName, feed: subs, counter: newCounter+1});
  };

  const setCurrentFolder =  () => {
  };

  return (
      <div id = "maincontainer">
          <div id = "header">
            <h1>RssNest</h1>
          </div>

          <Leftbar 
            search = {searchSubscriptionList}
            updateSaveOption = {updateSaveOption}
            deleteStorage = {deleteStorage}
            updateFromStorage = {updateFromStorage}
            clearRenamingAll = {clearRenamingAll}
            getFolders = {getFolders}
            getSelectedFolder = {getSelectedFolder}
            setSelectedSub = {setSelectedSub}
            updateFeed = {updateFeed}
            addFolder = {addFolder}
            checkLoginStatus = {checkLoginStatus}
            setCurrentFolder = {setCurrentFolder}
            getCenterPosition = {getCenterPosition()}
            getGlobalSize = {getGlobalSize()}
            getSideVisibility = {getSideVisibility()}
            currentFeed = {currentFeed}
          />
          
          <RSSList
            currentSearch = {currentSearch}
            setSaveResponse = {setSaveResponse}
            setResults = {setResults}
            setSavedFeed = {setSavedFeed}
            exposeSide = {exposeSide}
            getCenterPosition = {getCenterPosition()}
            getGlobalSize = {getGlobalSize()}
            getSideVisibility = {getSideVisibility()}
          />

          <Rightbar 
            getCenterPosition = {getCenterPosition()}
            getGlobalSize = {getGlobalSize()}
            getSideVisibility = {getSideVisibility()}
           />
          <div id = "background"> </div>
      </div>
  );
};

Main.displayName = "Main";
export default Main;