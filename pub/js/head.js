"use strict"
const log = console.log;

(function(global){
	/**
	* Initialize the js object library. Creating a widget with functionalities
	* that you intend to make. 
	* @param {Array of Numbers of size 2} startcoor - initialize where you want the widget to start
	* @param {Number} diameter - The size of the widget
	* @param {String} backimg - The path of the image
	* @param {Number} backimgsize - The size of the backimg
	* @param {Boolean} draggable - Do you want the widget to be draggable?
	* @param {String} animation:
	*What animation do you want?
	* "Duplicating {Number}" When moved, there will be the backimg what will duplicate itself.
	*						{Number}optional the higher the number the longer will be the animation.
	* "Iconimg {String} {Number}" when moved, the {String} image path will be used to duplicate itself.
	*						{Number}optional the higher the number the longer will be the animation.
	* "Shadowing {String}" When moved and clicked, there will a shadow depending on how you implement it.
	*					 For more reference on how to use Shadowing "https://www.w3schools.com/cssref/css3_pr_box-shadow.asp"
	*/
	function Head(startcoord,diameter, backimg,backimgsize, draggable=false, animation){

	this._self = {};
	this._self.coord = startcoord;
	this._self.diameter = diameter;
	this._self.backimg = backimg;
	this._self.draggable = draggable;
	this._self.clickonoff = null;
	this._self.mousedown = false;
	this._self.currentpage = null;
	this._self.holdnavigation = null;
	this._self.dragging = null;
	this._self.animation = animation;

	const body = document.querySelector('body');

	const head = document.createElement('span');
	const style = document.createElement('style');

	const dochead = document.querySelector('head');

	if(this._self.backimg){
 	if (this._self.backimg.charAt(0) === "/"){
 			style.innerHTML = `	#head {display:block;position: fixed;z-index:10;	 border-radius: 50%;
 				padding:0px; margin:0px;background-image: url(${this._self.backimg}) ;background-size:${backimgsize}px;}
 				#headclone {display:block;position: fixed;z-index:9;	 border-radius: 50%;
 				padding:0px; margin:0px;background-image: url(${this._self.backimg});background-size:${backimgsize}px;}`
 	}else{
 			style.innerHTML = `	#head {display:block;position: fixed;z-index:10;	 border-radius: 50%;
 				padding:0px; margin:0px; background-color: ${this._self.backimg};background-size:${backimgsize}px;};
 				#headclone {display:block;position: fixed;z-index:9;	 border-radius: 50%;
 				padding:0px; margin:0px; background-color: ${this._self.backimg};background-size:${backimgsize}px;};`
 	}
 }
	dochead.append(style);
	head.id = 'head';

	head.style = `top: ${this._self.coord[0]}px;left: ${this._self.coord[1]}px;width: ${this._self.diameter}px; height: ${this._self.diameter}px;`
	
	//Animation method dupplicating
	function duplicating(body, img){
		const head1 = document.querySelector('#head');
		const headclone = head1.cloneNode(true);
		headclone.id = 'headclone'
		body.append(headclone);

		setTimeout(function(){
			
			const node = document.getElementById("headclone")
			
			node.parentNode.removeChild(node);
		},img[1]? img[1]: 70)
	}
	//animation methid icon image
	function iconimg(body, img){
		const head1 = document.querySelector('#head');
		const headclone = head1.cloneNode(true);
		headclone.id = 'headclone';
		
		headclone.style.backgroundImage = `url(${img[1]})`
		headclone.style.backgroundSize = img[2] + 'px';
		const trantime = (img[3]) ? (img[3]) : 70;
		body.append(headclone);

		setTimeout(function(){
			
			const node = document.getElementById("headclone")
			
			node.parentNode.removeChild(node);
		},trantime)
	}
	//Start dragging the element
	function ondrag(event){
		event.stopPropagation()
			if ( this._self.clickonoff){
				event.preventDefault();
			}else{
				// this._self.clickonoff = false;
				this._self.dragging ={
				element: event.target,
				speed: { x: 0, y: 0 },
				oldPos: { x: event.offsetX, y: event.offsetY },
	    		offset: { x: event.offsetX, y: event.offsetY },
	    		
	    		
			}
		}
	}
	//Method When stop dragging the element
	function dragdrop(){
		if (!this._self.dragging){return;}

		

		const _dragging = this._self.dragging;
		if (_dragging.speed.x !== 0 && _dragging.speed.y !== 0){
		const updatePos = () => {
			const pos ={
				x: _dragging.oldPos.x + _dragging.speed.x,
				y: _dragging.oldPos.y + _dragging.speed.y
			};
		
		_dragging.speed.x *= 0.9;
      	_dragging.speed.y *= 0.9;
      	_dragging.oldPos = pos;
      	applyPos(_dragging.element, pos);
      	if (Math.abs(Math.max(_dragging.speed.x, _dragging.speed.y)) > 0.1) {
      		requestAnimationFrame(updatePos);
      	}
    	}
    	requestAnimationFrame(updatePos);
 		}
 		if (this._self.animation === undefined){}
 		else if( this._self.animation.includes("shadowing")){
 			head.style.boxShadow = "";
 		}
 		//this._self.clickonoff = false;
  		this._self.dragging = null;

	}
	//While dragging the element
	function ondragmove(e) {
		e.preventDefault();
		e.stopPropagation()
		
		if (!this._self.dragging) { return; }

			if(this._self.animation === undefined){

			}
			else if (this._self.animation.includes("duplicating")){
				duplicating(body, this._self.animation.split(" "))
			}
			else if (this._self.animation.includes("iconimg")){
				iconimg(body, this._self.animation.split(" "));
			}else if( this._self.animation.includes("shadowing")){
				head.style.boxShadow = this._self.animation.split(" ").slice(1).join(' ');
			}
			if (this._self.clickonoff !== null){
				this._self.clickonoff = true;
			}
			
			if (this._self.holdnavigation !== null){
				this._self.holdnavigation.style.display = 'none';
			}
			
		  	const pos = {
		  	x: e.clientX - this._self.dragging.offset.x,
		    y: e.clientY - this._self.dragging.offset.y,
		  	};
		  	this._self.dragging.speed.x = pos.x - this._self.dragging.oldPos.x;
		  	this._self.dragging.speed.y = pos.y - this._self.dragging.oldPos.y;
		  	this._self.dragging.oldPos = pos;
		  	applyPos(this._self.dragging.element, pos);
		  
		}
		//Apply change to the position
	function applyPos(element, pos) {
		element.style.top = `${Math.max(0, Math.min(pos.y.toFixed(3), window.innerHeight - parseFloat(element.style.height)))}px`;
		element.style.left = `${Math.max(0, Math.min(pos.x.toFixed(3), window.innerWidth - parseFloat(element.style.height)))}px`;
	}

	//Checking if dragging is allowed
	if (this._self.draggable){
		head.draggable = true;
		head.addEventListener('mousedown', ondrag.bind(this))
		document.addEventListener('mouseup', dragdrop.bind(this))
		document.addEventListener('mouseleave', dragdrop.bind(this))
		document.addEventListener('mousemove', ondragmove.bind(this));
	}

	
	body.append(head);
	this._self.head = head;
	this._self.body = body;

	}
	Head.prototype ={
		//Method to implement double click navigation between different screens set by the user
		/**
		Double click will navigate to the next page set by the user.
		@param {Array} consisting of String. The string are the html name. 
		Make sure all html pages are on the same folder 
		*/
		addoubleclick: function(link){
			this._self.head.addEventListener('dblclick', function(e){
			const select = window.location.href.replace(( window.location.origin + '/') , '');
			this._self.currentpage = link.indexOf(select);
			log(this._self.currentpage);
				if (this._self.currentpage >= link.length - 1){
						this._self.currentpage = 0;

					}else{
						this._self.currentpage ++;
				}
				 

				if(this._self.clickonoff){
					e.preventDefault();
				}else{
					e.preventDefault();
					window.location.href = window.location.protocol + "/" + link[this._self.currentpage];
				}
			}.bind(this));

		
		},
		//Method to implement a click event that will display a list when clicked
		/**
		A list will appear when clicked. The list will adjust itself depending on the length and width provided.
		If an Shadowing was added as animation in the initialize object of Head(), The shadow will show up around 
		the widget when clicked.
		@param {Objects of Array} listarray - Provide which html pages should have a specific list. If you just want 
		to display a message, you can have just a simple string as the element. e.g 'anything do not start with 'link' If you want to navigate between other screens,
		start the string with a link, then the html file and then the name of the element. e.g 'link Screen.html page 1'
		e.g {'Screen.html':['hello', 'link Screen1.html page1'], 'Screen1.html': ['Yes','link Screen page' ]} 
		@param {Number} W - width of the list 
		@param {Number} L - length of the list
		@param {String} backgroundcolor - The color of the list. You can use HEX color
		@param {String} onmouseanimation - Choose between 'highlighting' and 'coloring'. For coloring, 'coloring {String}'
		The {String} is the color you choose can either be a color of an hex code.
		@param {Number} animationtime - The time it takes in millisecond for the animation trnasition. Default 1000
		*/
		addclicklist: function(listarray, W, L, backgroundcolor, onmouseanimation, animationtime =1000){
			this._self.clickonoff = false;
			const ulist = document.createElement('ul');
			const selected = window.location.href.replace(( window.location.origin + '/') , '');
			const linkText = listarray[selected];
			for (let i = 0; i < linkText.length ; i++){
				let element = linkText[i];
				if (element.split(' ')[0] === 'link'){
					const list = document.createElement('li');
					const link = document.createElement('a');
					link.href = element.split(' ')[1];

					link.style = `display: block;text-decoration: none; color:black;background-size:auto; width:100%;height:100%;`
					// _self.linklist.push(link.href);
					link.innerHTML = element.split(' ').slice(2).join(' ');
					list.draggable = 'false';
					list.style = ` border: 1px solid black; width: ${W}px; height: ${L}px; 
					 margin: 2px; text-align: center; border-radius:20px;transition: all ${animationtime}ms ease-in-out;background-color: ${backgroundcolor} `
					list.append(link);
					list.className = 'l'+ i;
					if (onmouseanimation){
						list.addEventListener('mouseenter',function(e){
							if(onmouseanimation.includes('coloring')){
								list.style.backgroundColor = onmouseanimation.split(' ')[1];
							}else if (onmouseanimation === 'highlighting'){
								list.style.textDecoration = 'underline';
							}
						
						})
						list.addEventListener('mouseleave', function(e){
							if(onmouseanimation.includes('coloring')){
								list.style.backgroundColor = backgroundcolor;
							}else if (onmouseanimation === 'highlighting'){
								list.style.textDecoration = 'none';
							}
						})
					}
			
					
					ulist.append(list);



				}else{
					const list = document.createElement('li');
					list.innerHTML = element;
					list.draggable = 'false'
					list.style = `width: ${W}px; height: ${L}px;
					 border: 1px solid black; margin: 2px;text-align: center; border-radius:20px;background-color: ${backgroundcolor}`
					list.className = 'l'+ i;
					ulist.append(list);


				}


			}
			ulist.style = `display:none;position:fixed;`;
			document.addEventListener('click', function(e){
				ulist.style = `display: none`
				this._self.clickonoff = false;
			}.bind(this));
			this._self.head.addEventListener('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				
				
				
					this._self.clickonoff = !this._self.clickonoff;
				
				setTimeout(function(){
				if (this._self.clickonoff ){
					if (this._self.holdnavigation !== null){
						this._self.holdnavigation.style.display = 'none';
					}
					if (this._self.animation === undefined){}
			 		else if( this._self.animation.includes("shadowing")){
			 			head.style.boxShadow = this._self.animation.split(" ").slice(1).join(' ');
			 		}

					
					const left = parseFloat(this._self.head.style.left, 10);
					const top = parseFloat(this._self.head.style.top, 10);
					const listcorners = [[left  - W ,top  - L*linkText.length],[left - W, top + this._self.diameter],
					[left + this._self.diameter , top - L*linkText.length],[left + this._self.diameter, top+this._self.diameter - L]]
					//[top left], [down left],[]
					let defaultcorner = listcorners[3];
					if ((listcorners[3][0] < window.innerWidth - W) && (listcorners[3][1] < window.innerHeight - L*linkText.length)){
						//down right
						log((listcorners[3][1] < screen.height - L))
						log(listcorners[3][1])
						log('dr')
					}else if ((listcorners[0][0] > W) && (listcorners[0][1] > L)){
						//top left
						log('tl')
						defaultcorner = listcorners[0]
					}else if ((listcorners[1][0] > W) && (listcorners[1][1] < window.innerHeight- L)){
						//down left
						log('dl')
						defaultcorner = listcorners[1]
					}else if((listcorners[2][0] < window.innerWidth- W) && (listcorners[2][1] > L)){
						//top right 
						log('tr')
						defaultcorner = listcorners[2]
					}

					ulist.style = `display:block; list-style: none;position: fixed;padding:0;
					 left: ${defaultcorner[0]}px;top: ${defaultcorner[1]}px ;`
				}else{
					ulist.style = `display: none`;
					if (this._self.animation === undefined){}
					else if( this._self.animation.includes("shadowing")){
	 					head.style.boxShadow = "";
	 				}
				
				}

				}.bind(this), 200)

				
			}.bind(this))
		
			this._self.body.append(ulist);
		},
		/*
		A seperate functiion to animate text outside of the widget given an id and animation type.
		@param {String} id -  The id of the element you want to animate.
		@param {String} animation - Type of animation 'coloring' and 'highlighting'. For coloring, 'coloring {String}' the {String}
		is the color can be an HEX code or a color name
		@param {Number} transitiontime - The transition time for the animation.
		*/
		addanimationbyid: function(id, animation, transitiontime=1000){
			const element = document.getElementById(id);
			if (animation){
				element.style.transition = `all ${transitiontime}ms ease-in-out`;
			element.addEventListener('mouseenter',function(e){
					if(animation.includes('coloring')){
						element.style.backgroundColor = animation.split(' ')[2];
					}else if (animation === 'highlighting'){
						element.style.textDecoration = 'underline';
					}else if (animation.includes('shadowing')){
						element.style.boxShadow = animation.split(" ").slice(1).join(' ');
					}
				
				})
				element.addEventListener('mouseleave', function(e){
					if(animation.includes('coloring')){
						element.style.backgroundColor =animation.split(' ')[1];
					}else if (animation === 'highlighting'){
						element.style.textDecoration = 'none';
					}else if (animation.includes('shadowing')){
						element.style.boxShadow = "";
					}
				})
			}
		},
	//method added on mouse listener to display buttons that will navigate between screens
	/*
	Mininmum of 1 and a maximum of 4 buttons can be created. When your mouse is on hold on the widget, 
	The buttons that is been listen will show up. This method is used to navigate within the page.
	@param {Object of array} listarray -  The objects are the html pages and the list are the link to those button.
	e.g {'Screen1': ['top', 'bottom'], 'Screen4.html': ['top',  'bottom','left', 'right']}
	@param {String} backcolor -the background color.
	@param {Number} width - width of the button.
	@param {Number} height - height of the button.
	@param {String} onmouseanimation -  Type of animation 'coloring' and 'highlighting'. For coloring, 'coloring {String}' the {String}
	is the color can be an HEX code or a color name
	@param {Number} mouseleavetime - The time in millisecond for the button to disappear. Default 1000.
	@param {Number} transtime - The time it took for the button animation. Default 500.
	*/
	addtouchhold: function(listarray, backcolor,width, height, onmouseanimation, mouseleavetime =1000, transtime = 500){
		const leftcenter = parseFloat(this._self.head.style.left, 10) + this._self.diameter/2 ;
		const topcenter = parseFloat(this._self.head.style.top, 10) + this._self.diameter/2 ;
		const selected = window.location.href.replace(( window.location.origin + '/') , '');
		const selectedlink = listarray[selected];
		if (selectedlink ){
			this._self.holdnavigation = document.createElement('div');
			
				for (let i = 0; i< selectedlink.length ; i++ ){
					const button = document.createElement('button');
					const abutton = document.createElement('a');
					abutton.href = `#${selectedlink[i]}`;
					abutton.innerHTML = selectedlink[i];
					abutton.style = `display: block; width: 100%; height:100%;text-decoration: none; color: black; `
					// button.innerHTML = selectedlink[i];
					button.append(abutton);
					if (onmouseanimation){
						button.addEventListener('mouseenter',function(e){
							if(onmouseanimation.includes('coloring')){
								button.style.backgroundColor = onmouseanimation.split(' ')[1];
							}else if (onmouseanimation === 'highlighting'){
								button.style.textDecoration = 'underline';
							}
						
						})
						button.addEventListener('mouseleave', function(e){
							if(onmouseanimation.includes('coloring')){
								button.style.backgroundColor = backcolor;
							}else if (onmouseanimation === 'highlighting'){
								button.style.textDecoration = 'none';
							}
						})
					}
			

					if(i === 0){
						const top = topcenter-this._self.diameter;
						button.id = 'b0';
						button.style = `left:${leftcenter}px;top: ${top}px;position:fixed; width: ${width}px;height: ${height}px;
						border-radius:20px; background-color: ${backcolor};transition: all ${transtime}ms ease-in-out;`
					}
					else if (i ===1){
						const top = topcenter+this._self.diameter ;
						button.id = 'b1'
						button.style = `position:fixed;left:${leftcenter }px ;top: ${top}px;border-radius:20px;width: ${width}px;height: ${height}px;
						background-color: ${backcolor};transition: all ${transtime}ms ease-in-out;`
					}
					else if (i === 2 ){
						const left = leftcenter - this._self.diameter ;
						button.id = 'b2'
						button.style = `position:fixed;left:${left}px; ;top: ${topcenter}px ;border-radius:20px;width: ${width}px;height: ${height}px;
						background-color: ${backcolor};transition: all ${transtime}ms ease-in-out;`
					}else if(i ===3){
						const left = leftcenter + this._self.diameter ;
						button.id = 'b3'
						button.style = `position:fixed;left:${left}px;top: ${topcenter}px;border-radius:20px;width: ${width}px;height: ${height}px;
						background-color: ${backcolor}; transition: all ${transtime}ms ease-in-out; `
					}
					this._self.holdnavigation.append(button);
					this._self.holdnavigation.style = 'display:none;'
					
				}
				this._self.body.append(this._self.holdnavigation);

				head.addEventListener('mouseenter', function(e){
					const leftcenter = parseFloat(this._self.head.style.left, 10) + this._self.diameter/2 -15;
					const topcenter = parseFloat(this._self.head.style.top, 10) + this._self.diameter/2 -10; 

					for (let i = 0; i< selectedlink.length ; i++ ){
						const ids = document.getElementById('b' + i);
						const numofletter = selectedlink[i].length;
						if ( i === 0){
							const top = topcenter-this._self.diameter
							ids.style.left = (leftcenter - numofletter - 4 - width/4)+ 'px';
							ids.style.top = top + 'px';
						}else if(i === 1){
							const top = topcenter+this._self.diameter
							ids.style.left = (leftcenter- numofletter- 4 - width/4) + 'px';
							ids.style.top = top + 'px';
						}else if(i === 2){
							const left = leftcenter -numofletter*2 - 4 - width/2 -this._self.diameter;
							ids.style.left = left + 'px';
							ids.style.top = topcenter + 'px'; 
						}else if (i === 3){
							const left = leftcenter + this._self.diameter;
							ids.style.left = left + 'px';
							ids.style.top = topcenter + 'px';
						}
						
					}
						if (this._self.clickonoff){
						this._self.mousedown = false;
					}else{
						this._self.mousedown = true;

					}
					
					setTimeout(function(){
						if (this._self.clickonoff){
						this._self.mousedown = false;
					}else{
						this._self.mousedown = true;

					}
					if(this._self.mousedown){
							this._self.holdnavigation.style.display = 'block';

						}
					}.bind(this),1100)

				}.bind(this))
				head.addEventListener('mouseleave', function(e){
					
					setTimeout(function(){
					this._self.mousedown= false;
					this._self.holdnavigation.style.display = 'none'
					}.bind(this), mouseleavetime)
					
				}.bind(this))
		} //Solely to prevent from looking for something that does not exist
	}

	}
	global.Head = global.Head || Head
})(window);