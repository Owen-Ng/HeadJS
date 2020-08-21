"use strict"; 

function examples() {
	const head = new Head([300,1000], 150,"/image/jslogo.JPG",151, true, 'shadowing 0px 0px 30px #0F83A9');
head.addclicklist({'Example1.html':['Example1', 'link example1screen1.html screen1',
		'link example1screen2.html screen2'],'example1screen1.html':['screen1','link example1screen2.html screen2',
		'link Example1.html screen'],
	 'example1screen2.html':['screen2','link example1screen1.html screen1',
		'link Example1.html screen'] },150, 25, "#0F83A9", "coloring red");
head.addanimationbyid("anim", "coloring #0F83A9 red",500);
	head.addanimationbyid("anim1", "coloring #0F83A9 grey",500);
	head.addanimationbyid("anim2", "coloring #0F83A9 red",500);
	head.addanimationbyid("anim3", "coloring red #0F83A9");
	head.addanimationbyid("anim4", "coloring red grey");
	head.addanimationbyid("anim5", "coloring red #0F83A9");
}

examples();