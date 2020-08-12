"use strict"

// const newhead = head([200,500], 100, "orange", false);
// // newhead.addclicklist(['EX1', 'how are you?', 'OKKKKKK!!', 'link withoutdrag.html withoutdrag1','link withoutdrag1.html withoutdrag2'], 100,20);
// newhead.addoubleclick(['withoutdrag.html', 'withoutdrag1.html']);

// newhead.addtouchhold({'withoutdrag1.html':['top', 'down']}) 

function examples() {
	const head = new Head([200,500], 100, "orange", false);
	
	
	head.addoubleclick(['withoutdrag.html', 'withoutdrag1.html']);
	 head.addtouchhold({'withoutdrag1.html':['top', 'down']}) 
	
}

examples();