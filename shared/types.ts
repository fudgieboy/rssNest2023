export interface FolderInterface {
  dateAdded: string;
  subscriptions: Array<SubscriptionInterface>;
  shared: boolean,
  name: string;
  description: string;
  
  actions:{
    Search: boolean,
    Rename: boolean,
    Delete: boolean,
  }
}

export interface SubscriptionInterface {
  name: string;
  value: string;
  dateAdded: string;
  description: string;
  
  actions:{
    Search: boolean,
    Rename: boolean,
    Delete: boolean,
  }
}


export const FolderFactory = (data?):FolderInterface=>{
  if(data){
    return {
      name: data.name,
      subscriptions: data.subscriptions,
      description: data.description,
      dateAdded: data.dateAdded,
      shared: false,
      actions: {
        Search: true,
        Rename: true,
        Delete: true,
      }
    };
          
  }
  return {
    name: "New Folder",
    description: "New Folder Type",
    subscriptions: [],
    dateAdded: new Date().toString(),
    shared: false,
    actions: {
      Search: true,
      Rename: true,
      Delete: true,
    }
    };
};

export const SubFactory = (data?):SubscriptionInterface=>{
  if(data){
    return {
      name: data.name,
      description: data.description,
      dateAdded: data.dateAdded,
      value: data.value,
      actions: {
        Search: true,
        Rename: true,
        Delete: true,
      }
    };
  }
  return {
    name: "New Subscription",
    description: "New Sub Type",
    dateAdded: new Date().toString(),
    value: "",
      actions: {
        Search: true,
        Rename: true,
        Delete: true,
      }
    };
};
