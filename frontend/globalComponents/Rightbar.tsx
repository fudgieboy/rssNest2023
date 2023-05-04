import React, { ReactElement} from "react";
import $ from 'jquery';

interface RSSFunctionality {
  getCenterPosition: ()=> void;
  getGlobalSize: ()=> void;
  getSideVisibility: ()=> void;
}

const Rightbar: React.FC<RSSFunctionality> = (props: RSSFunctionality): ReactElement => {

  const getGlobalSize = () =>{
    return props.getGlobalSize();
  };

  
  return (
    <div id = "rightBar" className = "sidebar">
      <div className = "container">
        <div id = "accounts">
          <h2>RSS Nest</h2>
          <h5>Account</h5>
          <div id = "membershipStatus"> 
          <div id = "noAuth" ng-controller = "rightBar">
            <div ng-model = "destroyCotroller">
                <div ng-start-up = 'destroyController'>
                {/* <h2 class="page-header">Checking: <accountname>:</h2> */}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
Rightbar.displayName = "Rightbar";
