import React, { ReactElement, useState, ReactNode, useEffect} from "react";
import v4 from "uuid/v4";
import {SubscriptionInterface, SubFactory } from "../../shared/types";

interface ISubscription {
  dateAdded: string;
  name: string;
  description: string;
  index: number;
  value: string;
  updateSubscriptionObjectName: (index: number, name: string)=>void;
  selectSub: (index: number)=>void;
}

const Subscription: React.FC<ISubscription> = (props: ISubscription): ReactElement => {
  let [renaming, setRenaming] = useState(false);
  let [name, setName] = useState(props.name);
  
  const updateSubName = (newSubName)=>{
    setName(newSubName);
    props.updateSubscriptionObjectName(props.index, newSubName);
  };
  
  const finishSubRename = (): void => {
    setRenaming(false);
  };  

  return(
    <li id = { props.index + ""} className = "subContainer" >
          <input className = "button folderButton" onChange = {(ev)=>{updateSubName(ev.target.value)}} type = "text" value ={name} onClick = {()=>{props.selectSub(props.index);}}/>
    </li>
  );
  
  // return( <li className = "subscriptionItem" value = {props.name} description = {props.description}></li> );
};

interface FolderP{
  dateAdded: string;
  subscriptions: SubscriptionInterface[];
  name: string;
  description: string;
  index: number;
  updateSubOnFolderObject:(index: number, newName: string) => void;
  updateFolderObjectName: (index: number, newName: string) => void;
  updateFolderObject: (index: number, subscriptions: SubscriptionInterface[]) => void;
  selectFolder: (index: number)=>void;
}

const Folder: React.FC<FolderP> = (props:FolderP): ReactElement => {
    let [subscriptions, modifySubscriptions] = useState<ReactElement[]>(constructSubscriptions());
    let [selectedSub, setSelectedSub] = useState(0);
    let [name, setName] = useState(props.name);
    // let [renaming, setRenaming] = useState(false);
    
    const updateFolderName = (newName)=>{
      setName(newName);
      props.updateFolderObjectName(props.index, newName);
    };
    
    const addSub = ()=>{
      const newSub = SubFactory();

      props.subscriptions.push(newSub);

      props.updateFolderObject(props.index, props.subscriptions); //update parent unrendered object but don't trigger re-render
       
      modifySubscriptions([...subscriptions, 
        <Subscription 
            dateAdded = {newSub.dateAdded}
            description = { newSub.description }
            value={ newSub.value }
            key = { v4() }
            updateSubscriptionObjectName = {(i, newName)=>{
              props.updateSubOnFolderObject(i, newName);
            }}
            index = { subscriptions.length }
            name = { "New Subscription" }
            selectSub = {(index)=>{ console.log(index); setSelectedSub(index);}}
          />]);
    };
  
    function constructSubscriptions ():ReactElement[]{
      if(props.subscriptions == undefined || props.subscriptions.length == 0){
          return [];
      }
      
      const renderSubs = [];
      for(let i = 0; i  < props.subscriptions.length; i++){

        renderSubs.push(<Subscription 
          dateAdded= {props.subscriptions[i].dateAdded}
          description= {props.subscriptions[i].description}
          value=  {props.subscriptions[i].value}
          name= {props.subscriptions[i].name}
          index = {i}
          key = { v4() }
          updateSubscriptionObjectName = {(i, newName)=>{
            props.updateSubOnFolderObject(i, newName);
          }}
          selectSub = {(i)=>{
            setSelectedSub(i);
          }}
        />
      );

      }

      return renderSubs;
    }

    return( 
      <div id = { props.index + ""} className = "foldercontainer" >
        {
          <span className = "" >
            <input className = "button folderButton" onChange = {(ev)=>{updateFolderName(ev.target.value);}} type = "text" value ={name} onClick = {()=>{props.selectFolder(props.index);}}/><div className = "addFolderButton" onClick = {(ev)=>{addSub();}}>+</div>
          </span>
        }
        <ul id = "subscriptionsList">
          {subscriptions}
        </ul> 
      </div> 
      
      );

};

export {Subscription, Folder};