define(function(){	
	var that = {};
	var width = 200;
	var height = 200;	

	that.setup = function () {};		

	that.loop = function(canvas, context, mouseX, mouseY) {
		context.strokeStyle = "rgba(255,141,0,1)";
		context.beginPath();
		context.rect(canvas.width/2 - width, 100, width*2, height*2);		
		context.closePath();
		context.stroke();
	}		

	return that;
});