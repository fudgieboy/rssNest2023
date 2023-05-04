import React, { ReactElement, useEffect, useState, useRef} from "react";
import $ from 'jquery';
		

interface RSSFunctionality {
  setSaveResponse: () => void;
  setResults: () => void;
  setSavedFeed: (feed) => void;
  exposeSide:(side:string)=>void;
  setGlobalSize:()=>void; 
  getCenterPosition: ()=> void;
  getGlobalSize: ()=> void;
  getSideVisibility: ()=> void;
}

const RSSList: React.FC<RSSFunctionality> = (props: RSSFunctionality): ReactElement => {
  const [newFeed, setNewFeed] = React.useState('https://stackoverflow.com/feeds/tag?tagnames=javascript&sort=newest');
  const [searchText, setSearchText] = React.useState("");
  const exposeSide = props.exposeSide;
  const setGlobalSize = props.setGlobalSize;

  const centerContainer = useRef(null); 
  const lbOpen = useRef(null);
  const rbOpen = useRef(null);


  
  
  useEffect(() => {  
    // const interval = setInterval(() => {
    //   rotateEl.current.style.transform = 'rotate('+degree+'deg)'; 
    //   degree +=5;
    //   setDegree(degree);
    // }, 50);
    // return () => clearInterval(interval);
  }, []);

  let startAnimating  = false;
  let recenter = false;
  let lVisible = false;
  let rVisible  = false;
 
  const barWidth = 300;																

  const sizes = [];   																               
  let resizing = false; 

	 	//sizes and their respective values and view setting functions
	 	sizes['smallSize'] 		= {};  														//main
	 	sizes['midSmallSize']	= {}; 														//main
	 	sizes['midSize']		= {};  														//main
	 	sizes['midLargeSize']	= {}; 														//main
	 	sizes['largeMinus']		= {};  														//main
	 	sizes['largeSize']		= {};  														//main
			
	 	//values			
	 	sizes['smallSize'].val = 479;														//main
	 	sizes['midSmallSize'].val = 720;													//main
	 	sizes['midSize'].val = 800;															//main
	 	sizes['midLargeSize'].val = 944;													//main
	 	sizes['largeMinus'].val = 1244;														//main
	 	sizes['largeSize'].val = 1544;														//main
	 	
	 	sizes['smallSize'].release = function(){											//main
			// rBar.current.style.width = barWidth + 'px';	
			// lBar.current.style.width = barWidth + 'px';
	 	};	
			
	 	sizes['midSmallSize'].release = function(){};										//main
	 	sizes['midSize'].release = function(){};											//main
	 	sizes['midLargeSize'].release = function(){};										//main
	 	sizes['largeMinus'].release = function(){};											//main
	 	sizes['largeSize'].release = function(){};


	 	sizes['smallSize'].view = ()=>{};														//main
	 	sizes['midSmallSize'].view = ()=>{};													//main
	 	sizes['midSize'].view = ()=>{};															//main
	 	sizes['midLargeSize'].view = ()=>{};													//main
	 	sizes['largeMinus'].view = ()=>{};														//main
	 	sizes['largeSize'].view = ()=>{};	

	const [barOpacity, setActivateBarOpactiy] = useState(0);

	useEffect(() => {

		lbOpen.current.style.opacity = '.5';
		rbOpen.current.style.opacity = '.5';

	}, [barOpacity]);

	function adjustLeft(){																	//main
			// lBar.current.style.marginLeft = 0 + 'px';
			// lBar.current.style.visibility = 'visible';

			centerContainer.current.style.marginLeft = '0vw';
			centerContainer.current.style.transform = 'translateX(0%)';
			centerContainer.current.style.left = '300px';

			rbOpen.current.style.visibility = "hidden"; 
			lbOpen.current.style.float = 'left';
			lbOpen.current.style.position = 'fixed';
			lbOpen.current.style.opacity = '.5';
			lbOpen.current.style.top = "0";
			lbOpen.current.style.height = 100 + 'vh';

	 		if(!resizing){
		 		rbOpen.current.style.opacity = '0';
		 		lbOpen.current.style.opacity = '0';

				setActivateBarOpactiy(barOpacity + 1);
			}
	 	} 

	 	function adjustRight(){											//main
			// rBar.current.style.marginRight = 0 + 'px';
			// rBar.current.style.visibility = 'visible';
			lbOpen.current.style.visibility = "hidden";
			rbOpen.current.style.top = "0";
			rbOpen.current.style.height = 100 + 'vh';
			
			centerContainer.current.style.marginLeft = '100vw';
			centerContainer.current.style.transform = 'translateX(-100%)';
			centerContainer.current.style.left = '-300px';

			rbOpen.current.style.float = 'right';
			rbOpen.current.style.position = 'fixed';

	 		if(!resizing){
	 			rbOpen.current.style.opacity = '0';
	 			lbOpen.current.style.opacity = '0';

				setActivateBarOpactiy(barOpacity + 1);
			}
	 	} 
		
		//  useEffect(() => {  
		// 	const interval = setInterval(() => {
		// 	  rotateEl.current.style.transform = 'rotate('+degree+'deg)'; 
		// 	  degree +=5;
		// 	  setDegree(degree);
		// 	}, 50);
		// 	return () => clearInterval(interval);
		//   }, []);
		
	 	function genericView(){										//main
	    	if(lVisible){ 
	    		if(recenter){
	    			recenterContainer();
	    		} else {
	    			adjustLeft();
	    		}
			} else if(rVisible){
	    		if(recenter){
	    			recenterContainer();
	    		} else {
	    			adjustRight();
	    		}
			} else {
			}
	 	}

	 	function maskSides(){										//main
	 		// if(lVisible)
			// 	rBar.current.style.visibility = 'hidden';

			// if(rVisible)
			// 	lBar.current.style.visibility = 'hidden';
	 	}

	 	function revealSides(){										//main
	 		// if(lVisible)
			// 	rBar.current.style.visibility = 'visible';

			// if(rVisible)
			// 	lBar.current.style.visibility = 'visible';
	 	} 

		function getContainerWidth(){										//main
			return window.getComputedStyle(document.getElementById('main'))['width'];
		} 

		useEffect(() => {
			function handleResize() {
				resizing = true;
				checkSize();
			}
		
			window.addEventListener('resize', handleResize);

			//functions
			sizes['smallSize'].view = function(){										//main
				maskSides();
				genericView();
			};

			sizes['midSmallSize'].view = function(){										//main
				maskSides();
				genericView();
			};

			sizes['midSize'].view = function(){										//main
			// rBar.current.style.visibility = 'visible';
			// lBar.current.style.visibility = 'visible';
				genericView();
			};

			sizes['largeMinus'].view = function(){										//main
			revealSides();
				genericView();
			};

			sizes['largeSize'].view = function(){										//main
			revealSides();
			recenterContainer(); 
			if(lVisible){
			} else if(rVisible){
			} else {
			}
			};

		});

		function getCenter(){
	 		let conWidth = getContainerWidth();
	 		const winWidth = $(window).width();

	 		if(rVisible && (winWidth <= 944)){
	 			conWidth /= 2;
	 		}
			return (winWidth - (conWidth))/2;
		}

		

	 	function recenterContainer(){
			console.trace();
			
			lVisible = false;
			rVisible = false;

			centerContainer.current.style.marginLeft = '50vw';
			centerContainer.current.style.transform = 'translateX(-50%)';
			centerContainer.current.style.left = '-0px';

			lbOpen.current.style.visibility = 'visible';
			lbOpen.current.style.position = 'absolute';
			lbOpen.current.style.float = 'left';
			lbOpen.current.style.height = 100 + '%';

			rbOpen.current.style.visibility = 'visible';
			rbOpen.current.style.position = 'absolute';
			rbOpen.current.style.float = 'right';
			rbOpen.current.style.height = 100 + '%';

	 		rbOpen.current.style.opacity = '0';
	 		lbOpen.current.style.opacity = '0';
			
			setActivateBarOpactiy(barOpacity + 1);
			recenter = false;
			getCenter();
	 	}

	 	let curSize;
	 	checkSize();
		function checkSize(){														//main
			const oldSize = curSize;

			function canSet(size){
		    	if(curSize != size || startAnimating == true){
		    		curSize = size;
		    		return true;
		    	} else {
					return false;    		
		    	}
			}

		    if (window.innerWidth <= sizes['smallSize'].val){
		    	if(canSet(sizes['smallSize'].val)){
			    	sizes['smallSize'].view();
		    	}
		    } else if (window.innerWidth < sizes['midSmallSize'].val ){
		    	if(canSet(sizes['midSmallSize'].val)){
			    	sizes['midSmallSize'].view();
		    	}
		    } else if (window.innerWidth >= sizes['midSmallSize'].val && window.innerWidth < sizes['largeMinus'].val) { 
			    if(canSet(sizes['midSize'].val)){
			   		sizes['midSize'].view();
			    }
		    } else if (window.innerWidth >= sizes['largeMinus'].val && window.innerWidth < sizes['largeSize'].val) { // main container + 1 sidebar
			    if(canSet(sizes['largeMinus'].val)){
			    	sizes['largeMinus'].view();
			    }
		    } else if (window.innerWidth >= sizes['largeSize'].val) { // main container + 2 sidebars
			    if(canSet(sizes['largeSize'].val)){
			    	sizes['largeSize'].view();
			    }
		    }

	    	if(oldSize != curSize){//just if a style was set for a particular size and for no other ones. Saves repetition
	    		if(oldSize != undefined){
		    		if(typeof sizes['smallSize'].release == 'function'){
						if(oldSize == sizes['smallSize'].val){
					    	sizes['smallSize'].release();
			    		}
		    		}
		    	} 
			}

			resizing = false;
		}

		const checkLeft = function(){						//main
			if(lVisible){
				recenter = true;
				startAnimating = true;
				checkSize();
			} else {
				lVisible = true;
				startAnimating = true;
				checkSize();
			}
		};

		const checkRight = function(){						//main
			if(rVisible){
				recenter = true;
				startAnimating = true;
				checkSize();
			} else {
				rVisible = true;
				startAnimating = true;
				checkSize();
			}
		};


  const retractHelp = function(e){	
    e.target.classList.remove('expandedHelp');
  };

  const expandHelp = function(e){	
    e.target.classList.add('expandedHelp');
  };
  

  const clearAllOptions =()=>{
  };
  
  const createNewFeed =()=>{
  }; 
  
  const startTutorial =()=>{
    // tutorial.init(true); 
  };
 
  const saveToFolder = () => {
    props.setSavedFeed(newFeed);
  };

  const filterUpdate = (ev) => {
    setSearchText(ev.target.value);
  };
  const updateNewFeedText = (ev) => {
    setNewFeed(ev.target.value);
  };
  
  return (
    <div id = "main" ref={centerContainer}>
      <div ng-controller = "maskController" id = "centerClickMask" className = "clearOptionsMask" onClick = {()=>{clearAllOptions();}}> </div>
      <div id = "inputNewFeed">
        <div>
          <input id = "filterFeed" className = "feedField button" maxLength = {100} type = "text" placeholder = "[Filter Feed]" onChange = {(e)=>{filterUpdate(e);}}/>
          <input id = "saveFeedButton" className = "button" type = "button" value = "[save]" onClick = {()=> {saveToFolder();}}/>
        </div>
        <div>
          <input id = "newFeedField" className = "feedField button" maxLength = {200} type = "text" placeholder = "[New Feed]"  onChange = {(e)=> {updateNewFeedText(e);}} />
          <input id = "searchButton" className = "button"  type = "button" value = "[search]" onClick = {()=>{createNewFeed();}}/>
        </div>
      </div>  
      <div id = "leftBarOpen" className = "openTab" onClick = {()=>{checkLeft();}} ref = {lbOpen}>
      </div>
      <div id = "rightBarOpen" className = "openTab" onClick = {()=>{checkRight();}} ref = {rbOpen}> 
      </div>
      <div id = "stream" className = "container">
        <div>
          <ul id ="feedList">
            {/* <li className = "feedItem anim" ng-repeat="article in outPut|orderBy:'title'|filter:filterSearch track by $index" rel="noopener noreferrer"> 
              <a href = "{{article.link}}" target="_blank">{{article.title}}</a>
            </li> */}
          </ul>
        </div> 

      </div> 
      <div id = "helpBar" className = "help anim expand" onMouseLeave = {(e)=> {  retractHelp(e);}} onMouseOver = {(e)=>{ expandHelp(e); } } onFocus = {()=>{}} onClick = {()=>{startTutorial();}}>
        <p className = "anim" >Start Tutorial</p>
      </div>
    </div>
  );
};

export default RSSList;
RSSList.displayName = "RSSList";
