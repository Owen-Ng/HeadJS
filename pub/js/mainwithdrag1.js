"use strict"

const newhead = head([200,500], 100, "orange", true);
// newhead.addclicklist(['EX1', 'how are you?', 'OKKKKKK!!', 'link withdrag.html withdrag1','link withdrag1.html withdrag2'], 100,20);
newhead.addoubleclick(['withdrag.html', 'withdrag1.html']);

newhead.addtouchhold({'withdrag1.html':['top', 'down']}) 