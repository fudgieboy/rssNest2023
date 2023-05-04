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

  const setCurrentFolder =  () => {
  };

  const addFolder =  () => {
  };


  const setSaveResponse =  () => {
  };


  const setResults =  () => {
  };


  const setSavedFeed =  (newFeed) => {
    console.log("newFeed");
    console.log(newFeed);
  };

  let [position, setCenterPosition] = useState(null);
  let [sideVisibility, setSideVisibility] = useState(null);
  let [size, setSize] = useState(null);
 
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

  return (
      <div id = "maincontainer">
          <div id = "header">
            <h1>RssNest</h1>
          </div>
          <Leftbar 
            updateSaveOption = {updateSaveOption}
            deleteStorage = {deleteStorage}
            updateFromStorage = {updateFromStorage}
            clearRenamingAll = {clearRenamingAll}
            getFolders = {getFolders}
            getSelectedFolder = {getSelectedFolder}
            setSelectedFolder = {setSelectedFolder}
            setSelectedSub = {setSelectedSub}
            updateFeed = {updateFeed}
            addFolder = {addFolder}
            checkLoginStatus = {checkLoginStatus}
            setCurrentFolder = {setCurrentFolder}
            
            getCenterPosition = {getCenterPosition()}
            getGlobalSize = {getGlobalSize()}
            getSideVisibility = {getSideVisibility()}
          />
          
          <RSSList
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
      </div>
  );
};

Main.displayName = "Main";
export default Main;