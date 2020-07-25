"use strict"

const newhead = head([200,500], 100, "img.JPG", true);
newhead.addclicklist(['Hello', 'how are you', 'OKKKKKK', 'link Screen3.html Screen3', 'link Screen2.html Screen2','link Screen1.html Screen1'], 100,20);
newhead.addoubleclick(['Screen1.html', 'Screen2.html', 'Screen3.html']);
newhead.addtouchhold({'Screen1.html': ['top', 'down'], 'Screen2.html':['top', 'down'], 'Screen3.html':['top', 'down']}) 