"use strict"; 

function examples() {
	const head = new Head([300,585], 200, "/image/jslogo.JPG",202, true, "duplicating ");
	head.addanimationbyid("anim", "coloring #0F83A9 red",500);
	head.addanimationbyid("anim1", "coloring #0F83A9 grey",500);
	head.addanimationbyid("anim2", "coloring #0F83A9 red",500);
	head.addanimationbyid("anim3", "coloring red #0F83A9");
	head.addanimationbyid("anim4", "coloring red grey");
	head.addanimationbyid("anim5", "coloring red #0F83A9");
}

examples();