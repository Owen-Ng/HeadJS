"use strict"
const log = console.log

(function(global){

	function head(startcoord,diameter, backimg, draggable){

				this._self = {};
	this._self.coord = startcoord;
	this._self.diameter = diameter;
	this._self.backimg = backimg;
	this._self.draggable = draggable;
	this._self.clickonoff = false;
	this._self.mousedown = false;
	this._self.currentpage = null;
	this._self.holdnavigation = null;
	this._self.dragging = false;

	const body = document.querySelector('body');

	// let clickonoff= false; 
	const head = document.createElement('span');
	const style = document.createElement('style');

	const dochead = document.querySelector('head');


 	if (this._self.backimg.charAt(0) === "/"){
 			style.innerHTML = `	#head {display:block;position: fixed;z-index:1;	 border-radius: 50%;
 				padding:0px; margin:0px;background-image: url(${this._self.backimg}) `
 	}else{
 			style.innerHTML = `	#head {display:block;position: fixed;z-index:1;	 border-radius: 50%;
 				padding:0px; margin:0px; background-color: ${this._self.backimg}; `
 	}
	dochead.append(style);

	head.id = 'head';
	log(this._self.coord)
	head.style = `top: ${this._self.coord[0]}px;left: ${this._self.coord[1]}px;width: ${this._self.diameter}px; height: ${this.self.diameter}px;`
	// `top: 0;left: 0;width: 60px; height: 60px;`
	
	if (_self.draggable ){

		head.draggable = true;
		
		head.addEventListener('dragstart', function(event){
			if(this._self.clickonoff){
				event.preventDefault();
			}else{
			const style = window.getComputedStyle(event.target, null);
			if (this._self.holdnavigation !== null){
				this._self.holdnavigation.style.display = 'none';
			}
			
			// head.style.width = (10 + parseFloat(style.getPropertyValue("width"),10)) + 'px' ;
			// head.style.height = (10 + parseFloat(style.getPropertyValue("height"),10)) + 'px' ; 


		    event.dataTransfer.setData("text/plain",
		    ( parseFloat(style.getPropertyValue("left"),10) - event.clientX) + ',' + 
		    (parseFloat(style.getPropertyValue("top"),10) - event.clientY));
			}
		},false);




		document.documentElement.addEventListener('dragover', function(event){
			event.preventDefault(); 
			head.style.display = 'none';
			// ulist.style = `left: ${head.style.left}px;right: ${head.style.right}px ;`
			log(head.style.left + head.style.top)

			
   
		}, false);


		document.documentElement.addEventListener('drop', function(event){
			event.preventDefault();
			head.style.display = 'block';
			// head.style.width = ( parseFloat(head.style.width,10) - 10 ) + 'px' ;
			// head.style.height = ( parseFloat(head.style.height,10) - 10) + 'px' ; 
			const offset = event.dataTransfer.getData("text/plain").split(',');
		   
		    head.style.left = (event.clientX + parseFloat(offset[0],10)) + 'px';
		    head.style.top = (event.clientY + parseFloat(offset[1],10)) + 'px';
	
    		
		}, false);
		
	}//For draggable
	


	
	body.append(head);
	
	return this._self;



	}
	head.prototype ={
		addoubleclick: function(link){
			head.addEventListener('dblclick', function(e){
			const select = window.location.href.replace(( window.location.origin + '/') , '');
			log(select);
			this._self.currentpage = link.indexOf(select);
			// log(indexselect)
			log(this._self.currentpage)
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
			})

		
		},
		addclicklist: function(linkText, W, L, backgroundcolor, onmousecolor){
			const ulist = document.createElement('ul');

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
				log('daww')



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
		head.addEventListener('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			this._self.clickonoff = !this._self.clickonoff;
			setTimeout(function(){
			if (this._self.clickonoff ){
				if (this._self.holdnavigation !== null){
					this._self.holdnavigation.style.display = 'none';
				}
				
				const left = parseFloat(head.style.left, 10);
				const top = parseFloat(head.style.top, 10);
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
			
			}

			}, 200)

			
		})
		body.append(ulist);
	},
	addtouchhold: function(listarray, backcolor, onmousecolor){
		const leftcenter = parseFloat(head.style.left, 10) + this._self.diameter/2 -20;
			const topcenter = parseFloat(head.style.top, 10) + this._self.diameter/2 -10;
			const selected = window.location.href.replace(( window.location.origin + '/') , '');
			const selectedlink = listarray[selected];
			log(selectedlink)
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
					// log("href =  " + `#${selectedlink[i]}`)
					// button.onclick = "href =  " + `#${selectedlink[i]}`;
					log(i)
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
				body.append(this._self.holdnavigation);

				head.addEventListener('mouseenter', function(e){
					const leftcenter = parseFloat(head.style.left, 10) + this._self.diameter/2 -20;
					const topcenter = parseFloat(head.style.top, 10) + this._self.diameter/2 -10; 
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
					},1000)

				})
				head.addEventListener('mouseleave', function(e){
					
					setTimeout(function(){
					this._self.mousedown= false;
					this._self.holdnavigation.style.display = 'none'}, 1000)
					
				})
		} //Solely to prevent from looking for something that does not exist
	}

	}
	global.head = global.head || head

})(window);