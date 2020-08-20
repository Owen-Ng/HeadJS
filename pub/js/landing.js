"use strict"; 

function examples() {
	const head = new Head([150,900], 200, "/image/jslogo.JPG",202, true, "duplicating ");
	
	 head.addanimationbyid("anim", "coloring red #0F83A9");
	 head.addanimationbyid("anim1", "coloring red grey");
	  head.addanimationbyid("anim2", "coloring red #0F83A9");
}

examples();