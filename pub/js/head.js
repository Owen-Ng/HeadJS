"use strict"
const log = console.log;

(function(global){

	function Head(startcoord,diameter, backimg,backimgsize, draggable, animation){

	this._self = {};
	this._self.coord = startcoord;
	this._self.diameter = diameter;
	this._self.backimg = backimg;
	this._self.draggable = draggable;
	this._self.clickonoff = false;
	this._self.mousedown = false;
	this._self.currentpage = null;
	this._self.holdnavigation = null;
	this._self.dragging = null;
	this._self.animation = animation;

	const body = document.querySelector('body');

	const head = document.createElement('span');
	const style = document.createElement('style');

	const dochead = document.querySelector('head');


 	if (this._self.backimg.charAt(0) === "/"){
 			style.innerHTML = `	#head {display:block;position: fixed;z-index:1;	 border-radius: 50%;
 				padding:0px; margin:0px;background-image: url(${this._self.backimg}) ;background-size:${backimgsize}px;}
 				#headclone {display:block;position: fixed;z-index:0;	 border-radius: 50%;
 				padding:0px; margin:0px;background-image: url(${this._self.backimg});background-size:${backimgsize}px;}`
 	}else{
 			style.innerHTML = `	#head {display:block;position: fixed;z-index:1;	 border-radius: 50%;
 				padding:0px; margin:0px; background-color: ${this._self.backimg};background-size:${backimgsize}px;};
 				#headclone {display:block;position: fixed;z-index:0;	 border-radius: 50%;
 				padding:0px; margin:0px; background-color: ${this._self.backimg};background-size:${backimgsize}px;};`
 	}
	dochead.append(style);
	head.className = 'customhead'
	head.id = 'head';

	head.style = `top: ${this._self.coord[0]}px;left: ${this._self.coord[1]}px;width: ${this._self.diameter}px; height: ${this._self.diameter}px;`
	
	//Animation method dupplicating
	function duplicating(body){
		const head1 = document.querySelector('#head');
		const headclone = head1.cloneNode(true);
		headclone.id = 'headclone'
		body.append(headclone);

		setTimeout(function(){
			
			const node = document.getElementById("headclone")
			
			node.parentNode.removeChild(node);
		},70)
	}
	//animation methid icon image
	function iconimg(body, img){
		const head1 = document.querySelector('#head');
		const headclone = head1.cloneNode(true);
		headclone.id = 'headclone';
		
		headclone.style.backgroundImage = `url(${img[1]})`
		headclone.style.backgroundSize = img[2] + 'px';
		body.append(headclone);

		setTimeout(function(){
			
			const node = document.getElementById("headclone")
			
			node.parentNode.removeChild(node);
		},70)
	}
	//Start dragging the element
	function ondrag(event){

			if ( this._self.clickonoff){
				event.preventDefault();
			}else{
			
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
  		this._self.dragging = null;

	}
	//While dragging the element
	function ondragmove(e) {
		e.preventDefault();
		e.stopPropagation()
		
		if (!this._self.dragging) { return; }
			if(this._self.animation === undefined){

			}
			else if (this._self.animation === "duplicating"){
				duplicating(body)
			}
			else if (this._self.animation.includes("iconimg")){
				iconimg(body, this._self.animation.split(" "));
			}else if( this._self.animation.includes("shadowing")){
				head.style.boxShadow = this._self.animation.split(" ").slice(1).join(' ');
			}
			
		
			this._self.clickonoff = true;
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
		addclicklist: function(listarray, W, L, backgroundcolor, onmousecolor){
			const ulist = document.createElement('ul');
			const selected = window.location.href.replace(( window.location.origin + '/') , '');
			const linkText = listarray[selected];
			for (let i = 0; i < linkText.length ; i++){
				let element = linkText[i];
				if (element.split(' ')[0] === 'link'){
					const list = document.createElement('li');
					const link = document.createElement('a');
					link.href = element.split(' ')[1];
					link.style = `text-decoration: none; color:black`
					// _self.linklist.push(link.href);
					link.innerHTML = element.split(' ').slice(2).join(' ');
					list.draggable = 'false';
					list.style = `width: ${W}px; height: ${L}px; border: 1px solid black;
					 margin: 2px; text-align: center; border-radius:20px;transition: all 1s ease-in-out;background-color: ${backgroundcolor} `
					list.append(link);
					if (onmousecolor){
						list.addEventListener('mouseenter',function(e){
						list.style.backgroundColor = onmousecolor;
					})
					list.addEventListener('mouseleave', function(e){
						list.style.backgroundColor = backgroundcolor;
					})
					}
					
					ulist.append(list);



				}else{
					const list = document.createElement('li');
					list.innerHTML = element;
					list.draggable = 'false'
					list.style = `width: ${W}px; height: ${L}px;
					 border: 1px solid black; margin: 2px;text-align: center; border-radius:20px;background-color: ${backgroundcolor}`
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
					const listcorners = [[left  - W ,top  -this._self.diameter/2- L*linkText.length],[left - W, top + this._self.diameter],
					[left + this._self.diameter , top - this._self.diameter/2 - L*linkText.length],[left + this._self.diameter, top+this._self.diameter - L]]
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
	//method added on mouse listener to display buttons that will navigate between screens
	addtouchhold: function(listarray, backcolor, onmousecolor){
		const leftcenter = parseFloat(this._self.head.style.left, 10) + this._self.diameter/2 -20;
		const topcenter = parseFloat(this._self.head.style.top, 10) + this._self.diameter/2 -10;
		const selected = window.location.href.replace(( window.location.origin + '/') , '');
		const selectedlink = listarray[selected];
		if (selectedlink ){
			this._self.holdnavigation = document.createElement('div');
			
				for (let i = 0; i< selectedlink.length ; i++ ){
					const button = document.createElement('button');
					const abutton = document.createElement('a');
					abutton.href = `#${selectedlink[i]}`;
					abutton.innerHTML = selectedlink[i];
					abutton.style = `text-decoration: none; color: black; `
					// button.innerHTML = selectedlink[i];
					button.append(abutton);
					if(onmousecolor){
						button.addEventListener('mouseenter',function(e){
							button.style.backgroundColor = onmousecolor;
						})
						button.addEventListener('mouseleave', function(e){
							button.style.backgroundColor = backcolor;
						})
					}
					if(i === 0){
						const top = topcenter-this._self.diameter
						button.id = 'b0';
						button.style = `left:${leftcenter}px;top: ${top}px;position:fixed; 
						border-radius:20px; background-color: ${backcolor};transition: all 0.5s ease-in-out;`
					}
					else if (i ===1){
						const top = topcenter+this._self.diameter
						button.id = 'b1'
						button.style = `position:fixed;left:${leftcenter}px ;top: ${top}px;border-radius:20px;
						background-color: ${backcolor};transition: all 0.5s ease-in-out;`
					}
					else if (i === 2 ){
						const left = leftcenter - this._self.diameter;
						button.id = 'b2'
						button.style = `position:fixed;left:${left}px; ;top: ${topcenter}px ;border-radius:20px;
						background-color: ${backcolor};transition: all 0.5s ease-in-out;`
					}else if(i ===3){
						const left = leftcenter + this._self.diameter;
						button.id = 'b3'
						button.style = `position:fixed;left:${left}px;top: ${topcenter}px;border-radius:20px;
						background-color: ${backcolor}; transition: all 0.5s ease-in-out; `
					}
					this._self.holdnavigation.append(button);
					this._self.holdnavigation.style = 'display:none;'
					
				}
				this._self.body.append(this._self.holdnavigation);

				head.addEventListener('mouseenter', function(e){
					const leftcenter = parseFloat(this._self.head.style.left, 10) + this._self.diameter/2 -20;
					const topcenter = parseFloat(this._self.head.style.top, 10) + this._self.diameter/2 -10; 
					for (let i = 0; i< selectedlink.length ; i++ ){
						const ids = document.getElementById('b' + i);
						if ( i === 0){
							const top = topcenter-this._self.diameter
							ids.style.left = leftcenter + 'px';
							ids.style.top = top + 'px';
						}else if(i === 1){
							const top = topcenter+this._self.diameter
							ids.style.left = leftcenter + 'px';
							ids.style.top = top + 'px';
						}else if(i === 2){
							const left = leftcenter -this._self.diameter;
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
					}.bind(this), 1000)
					
				}.bind(this))
		} //Solely to prevent from looking for something that does not exist
	}

	}
	global.Head = global.Head || Head
})(window);