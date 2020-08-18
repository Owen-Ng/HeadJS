"use strict"; 

function examples() {
	const head = new Head([200,500], 100, "/img.JPG",100, true, "iconimg /cloud.JPG 10");
	
	 head.addclicklist(['Hello', 'how are you', 'OKKKKKK',
	  'link Screen3.html Screen3', 'link Screen2.html Screen2','link Screen1.html Screen1'], 100,20, 'white', 'red');
	 head.addoubleclick(['Screen1.html', 'Screen2.html', 'Screen3.html']);
	  head.addtouchhold({'Screen3.html':['top', 'down', 'right', 'left']}, 'white', 'aqua') 
	
}

examples();

// const newhead = head([200,500], 100, "/img.JPG", true);
// newhead.addclicklist(['Hello', 'how are you', 'OKKKKKK', 'link Screen3.html Screen3', 'link Screen2.html Screen2','link Screen1.html Screen1'], 100,20, 'white', 'red');
// newhead.addoubleclick(['Screen1.html', 'Screen2.html', 'Screen3.html']);
// newhead.addtouchhold({'Screen3.html':['top', 'down', 'right', 'left']}, 'white', 'aqua') 