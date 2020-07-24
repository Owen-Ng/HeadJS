'use strict'
const log = console.log

function head(startcoord,radius, backimg, draggable, holdclick, doubleclick){
	const _self = {};
	_self.coord = startcoord;
	_self.radius = radius;
	_self.backimg = backimg;
	_self.draggable = draggable;
	_self.holdclick = holdclick;
	_self.doubleclick = doubleclick;
	// log(`${_self.doubleclick}`)
	_self.clickonoff = false;
	_self.mousedown = false;
	_self.linklist = [];
	_self.currentpage = null;
	_self.dragging = false;

	const body = document.querySelector('body');

	// let clickonoff= false; 
	const head = document.createElement('span');
	const style = document.createElement('style');

	const dochead = document.querySelector('head');
	style.innerHTML = `	#head {display:block;position: fixed;z-index:1;
	 border-radius: 50%;padding:0px; margin:0px; background-color: ${_self.backimg};} `
	dochead.append(style);

	head.id = 'head';
	log(_self.coord)
	head.style = `top: ${_self.coord[0]}px;left: ${_self.coord[1]}px;width: ${_self.radius}px; height: ${_self.radius}px;`
	// `top: 0;left: 0;width: 60px; height: 60px;`
	


	_self.addoubleclick  = function(link){
		head.addEventListener('dblclick', function(e){
			const select = window.location.href.replace(( window.location.origin + '/') , '');
			log(select);
			_self.currentpage = link.indexOf(select);
			// log(indexselect)
			log(_self.currentpage)
			if (_self.currentpage >= link.length - 1){
					_self.currentpage = 0;

				}else{
					_self.currentpage ++;
			}
			 

			if(_self.clickonoff){
				e.preventDefault();
			}else{
			e.preventDefault();
			window.location.href = window.location.protocol + "/" + link[_self.currentpage];
			}
		})

	}	


	_self.addclicklist= function(linkText, W, L){//if the element of list contain "link" this element is a link by default it is a text
		const ulist = document.createElement('ul');

		for (let i = 0; i < linkText.length ; i++){
			let element = linkText[i];
			if (element.split(' ')[0] === 'link'){
				const list = document.createElement('li');
				const link = document.createElement('a');
				link.href = element.split(' ')[1];
				// _self.linklist.push(link.href);
				link.innerHTML = element.split(' ').slice(2).join(' ');
				list.draggable = 'false';
				list.style = `width: ${W}px; height: ${L}px; border: 1px solid black;
				 margin: 2px; text-align: center; border-radius:20px`
				list.append(link);
				ulist.append(list);
				log('daww')



			}else{
				const list = document.createElement('li');
				list.innerHTML = element;
				list.draggable = 'false'
				list.style = `width: ${W}px; height: ${L}px; border: 1px solid black; margin: 2px;text-align: center; border-radius:20px`
				ulist.append(list);


			}


		}
		 ulist.style = `display:none`;
		head.addEventListener('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			_self.clickonoff = !_self.clickonoff;
			setTimeout(function(){
			if (_self.clickonoff && !_self.mousedown){
				_self.mousedown= false;
				const left = parseFloat(head.style.left, 10);
				const top = parseFloat(head.style.top, 10);
				const listcorners = [[left  - W ,top  -_self.radius/2- L*linkText.length],[left - W, top + _self.radius],
				[left + _self.radius , top - _self.radius/2 - L*linkText.length],[left + _self.radius, top+_self.radius - L]]
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

				ulist.style = `display:block; list-style: none;position: absolute;padding:0;
				 left: ${defaultcorner[0]}px;top: ${defaultcorner[1]}px ;`
			}else{
				ulist.style = `display: none`;
			
			}

			}, 200)

			
		})
		body.append(ulist);

	}//end of selfclick


	_self.addholdclick = function(listarray){
		const leftcenter = parseFloat(head.style.left, 10) + _self.radius/2;
			const topcenter = parseFloat(head.style.top, 10) + _self.radius/2;
			const selected = window.location.href.replace(( window.location.origin + '/') , '');
			const selectedlink = listarray[selected];
			log(selected)
			const divselector = document.createElement('div');
			for (let i = 0; i< selectedlink.length ; i++ ){
				const button = document.createElement('button');
				button.innerHTML = selectedlink[i];
				button.onclick = "href = " + selectedlink[i];
				log(i)
				if(i === 0){
					const top = topcenter-_self.radius
					button.style = `left:${leftcenter}px;top: ${top}px;position:absolute; `
				}
				else if (i ===1){
					const top = topcenter+_self.radius
					button.style = `position:absolute;left:${leftcenter}px ;top: ${top}px; `
				}
				else if (i === 2 ){
					const left = leftcenter - _self.radius;
					button.style = `position:absolute;left:${left}px; ;top: ${topcenter}px `
				}else if(i ===3){
					const left = leftcenter + _self.radius;
					button.style = `position:absolute;left:${left}px;top: ${topcenter}px  `
				}
				divselector.append(button);
				divselector.style = 'display:none;'
				
			}
			body.append(divselector);

		head.addEventListener('mousedown', function(e){
		
			_self.mousedown = true;
			setTimeout(function(){
				if(_self.mousedown){
					divselector.style.display = 'block';

				}
			},1000)

		})
		head.addEventListener('mouseup', function(e){
			_self.mousedown= false;
			setTimeout(function(){
			
			divselector.style.display = 'none'}, 1000)
			
		})
		
	}
	if (_self.draggable ){

		head.draggable = true;
		
		head.addEventListener('dragstart', function(event){
			if(_self.clickonoff){
				event.preventDefault();
			}else{
			const style = window.getComputedStyle(event.target, null);

			// head.style.width = (10 + parseFloat(style.getPropertyValue("width"),10)) + 'px' ;
			// head.style.height = (10 + parseFloat(style.getPropertyValue("height"),10)) + 'px' ; 


		    event.dataTransfer.setData("text/plain",
		    (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + 
		    (parseInt(style.getPropertyValue("top"),10) - event.clientY));
			}
		},true);




		document.documentElement.addEventListener('dragover', function(event){
			event.preventDefault(); 
			head.style.display = 'none';
			// ulist.style = `left: ${head.style.left}px;right: ${head.style.right}px ;`
			log(head.style.left + head.style.top)

			
   
		}, true);


		document.documentElement.addEventListener('drop', function(event){
			event.preventDefault();
			head.style.display = 'block';
			// head.style.width = ( parseFloat(head.style.width,10) - 10 ) + 'px' ;
			// head.style.height = ( parseFloat(head.style.height,10) - 10) + 'px' ; 
			const offset = event.dataTransfer.getData("text/plain").split(',');
		   
		    head.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
		    head.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
	
    		
		}, false);
		
	}//For draggable
	


	
	body.append(head);
	
	return _self;



}