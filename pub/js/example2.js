"use strict"; 

function examples() {
	const head = new Head([300,1000], 150,"/image/jslogo.JPG",151, true, "iconimg /image/rainbowi.png 75 100");
	head.addoubleclick(['Example2.html','example2screen1.html', 'example2screen2.html']);
	head.addclicklist({'Example2.html':['Example2', 'link example2screen1.html screen1',
		'link example2screen2.html screen2'],'example2screen1.html':['screen1','link example2screen2.html screen2',
		'link Example2.html screen'],
	 'example2screen2.html':['screen2','link example2screen1.html screen1',
		'link Example2.html screen'] },150, 25, "#0F83A9", "coloring red");
	head.addanimationbyid("anim", "coloring #0F83A9 red",500);
	head.addanimationbyid("anim1", "coloring #0F83A9 grey",500);
	head.addanimationbyid("anim2", "coloring #0F83A9 red",500);
	head.addanimationbyid("anim3", "coloring red #0F83A9");
	head.addanimationbyid("anim4", "coloring red grey");
	head.addanimationbyid("anim5", "coloring red #0F83A9");
}

examples();