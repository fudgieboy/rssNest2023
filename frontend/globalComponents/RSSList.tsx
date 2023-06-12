import React, { ReactElement, useEffect, useState, useRef} from "react";
import $ from 'jquery';
import globalAPI from "../API/globalAPI";
import RSSStore from "../stores/RSSStore";
import ExampleList from "./ExampleList";

interface RSSFunctionality {
  setSaveResponse: () => void;
  setResults: () => void;
  setSavedFeed: (feed) => void;
  exposeSide:(side:string)=>void;
  setGlobalSize:()=>void; 
  getCenterPosition: ()=> void;
  getGlobalSize: ()=> void;
  getSideVisibility: ()=> void;
  currentFolder: string;
  currentSearch: Array;
}


//https://blog.feedspot.com/world_news_rss_feeds/

const RSSList: React.FC<RSSFunctionality> = (props: RSSFunctionality): ReactElement => {
  const [newFeed, setNewFeed] = React.useState('https://stackoverflow.com/feeds/tag?tagnames=javascript&sort=newest');
  const [searchText, setSearchText] = React.useState("");
  const exposeSide = props.exposeSide;
  const setGlobalSize = props.setGlobalSize;

  const centerContainer = useRef(null); 
  const lbOpen = useRef(null);
  const rbOpen = useRef(null);

  let startAnimating  = false;
  let recenter = false;
  let lVisible = false;
  let rVisible  = false;
 
  const barWidth = 300;	

  const [barOpacity, setActivateBarOpactiy] = useState(0);

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
			};

		}, []);

		function getCenter(){
	 		let conWidth = getContainerWidth();
	 		const winWidth = $(window).width();

	 		if(rVisible && (winWidth <= 944)){
	 			conWidth /= 2;
	 		}
			return (winWidth - (conWidth))/2;
		}

		

	 	function recenterContainer(){
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

		let [position, setPosition] = useState("center"); 

  		const prevCountRef = useRef();
		
		useEffect(() => {
			if(position == "center"){
				recenterContainer();
			} else if(position == "left"){
				if(prevCountRef.current == "left"){
					recenterContainer();
					prevCountRef.current = "center";
				} else{
					adjustLeft();
				}
			} else if(position == "right"){
				if(prevCountRef.current == "right"){
					recenterContainer();
					prevCountRef.current = "center";
				} else{
					adjustRight();
				}
			}
			prevCountRef.current = position;
		}, [position]);
		
		const checkPosition = (newPos) => { 

			if(newPos == prevCountRef.current){
				setPosition("center");
			} else {
				setPosition(newPos);
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
	// username: "test",
	// password: "password",
	// email: "test@test.com"
	
	globalAPI.getList({list: [newFeed]}, 
		(value)=>{
			// console.log(value);
		},
		(err)=>{
		if(err){
			console.log(err);
		}
	});
  }; 

  let textList = [];
//   let textList = ExampleList.list;



useEffect(()=>{
	globalAPI.getList({list: props.currentSearch.feed}, 
		(value)=>{
			console.log(value);
		},
		(err)=>{
			if(err){
				console.log(err);
			}
	});
  }, [props.currentSearch.counter]);

  useEffect(() => {
  	RSSStore.store.on("update_rsslist", updateRSSFeed);
  }, []);

  const constructRSSFeed = (filteredFeed?) => {

	let list = textList;

	if(filteredFeed!= undefined && filteredFeed.length > 0 && filteredFeed!= null){ 
		list = filteredFeed;
	}

	const feedItems = [];
    for(let i = 0; i < list.length; i ++){
		feedItems.push(
			<li key = {i} className = "feedItem anim">
				<a href = {list[i].link} target="_blank" rel = "noopener noreferrer">{list[i].title}</a>
			</li>
		);
	}

	const constructed = 
		<ul id = "feedList">
			{feedItems} 
		</ul>;

	return constructed;
  };

  const [constructedFeed, setConstructedFeed ] = useState(constructRSSFeed());
  
  useEffect(() => {
	let elements = document.querySelectorAll(".feedItem");

	for(let i = 0; i < elements.length; i ++){
		elements[i].classList.add("noOffset");
	}
  }, [constructedFeed]);

  
  const updateRSSFeed = () => {
	const feed = RSSStore.store.getRSSList();
	textList = feed;

	console.log("updateRSSFeed");
	console.log(feed);
	
	setConstructedFeed(constructRSSFeed());
  };
  
  const startTutorial =()=>{
    // tutorial.init(true); 
  };
 
  const saveToFolder = () => {
    props.setSavedFeed(newFeed);
  };

  const filterUpdate = (ev) => {
	const newList = textList.filter( (item) => { return item.title.indexOf(ev.target.value) > -1;});
	setConstructedFeed(constructRSSFeed(newList));
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
          <input id = "newFeedField" className = "feedField button" maxLength = {200} type = "text" placeholder = "[New Feed]" value = {newFeed}  onChange = {(e)=> {updateNewFeedText(e);}} />
          <input id = "searchButton" className = "button"  type = "button" value = "[search]" onClick = {()=>{createNewFeed();}}/>
        </div>
      </div>  
      <div id = "leftBarOpen" className = "openTab" onClick = {()=>{checkPosition("left");}} ref = {lbOpen}>
      </div>
      <div id = "rightBarOpen" className = "openTab" onClick = {()=>{checkPosition("right");}} ref = {rbOpen}> 
      </div>
      <div id = "stream" className = "container">
        <div>
			{constructedFeed}
        </div> 

      </div>  
    </div>
  );
};

export default RSSList;
RSSList.displayName = "RSSList";
