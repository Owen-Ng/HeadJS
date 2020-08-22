# Head.js


The landingpage: (https://headjs.herokuapp.com/landingpage.html) 

## Getting Started 

### Step 1.

You will need to click on "Download"(Top right). If on Github, click on (https://headjs.herokuapp.com/js/head.js).

### Step 2.

Then place it somewhere where it will be easily accessible for your html files. You will need 3 files, the downloaded files, a js file to manipulate the jslibrary and your html file.

### Step 3.

The following will be enough to get you started

main.js (manipulate the library):

```

	"use strict"; 

	function examples() {
		const head =new Head([150,900], 200, "/image/jslogo.JPG",202, true, "duplicating ");
		 //where you instantiate or start the library
			
		 head.addanimationbyid("anim", "coloring #0F83A9 red",500); //additional method that you can use
		 head.addanimationbyid("anim1", "coloring #0F83A9 grey",500);//additional method that you can use
		 head.addanimationbyid("anim2", "coloring #0F83A9 red",500);//additional method that you can use
	}

	examples();
	//The path "/image/jslogo.JPG" may not be exactly the same as yours. The path depends on where you placed the file so 
	//treat it as a regular file path
	//This example is from the landing page
```
html file: (Make sure that the jsfile that will manipulate the head.js run after the library). 
```
	<head>
		<script defer type="text/javascript" src='/js/head.js'></script>
		<script defer type="text/javascript" src='/js/api.js'></script>
		</head>
		//The path "/js/head.js"or "/js/api.js"  may not be exactly the same as yours. The path depends on 
		//where you placed the file so treat it as a regular file path
		//head.js - is the library
		//api.js - is the one that manipulate the library. 
```
For more information on how to use the library, please find the documentation at (https://headjs.herokuapp.com/api.html)