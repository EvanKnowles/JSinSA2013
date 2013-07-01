define(function(){	
	var that = {};
	var width = 200;

	that.setup = function () {};		

	that.loop = function(canvas, context, mouseX, mouseY) {
		
		context.strokeStyle = "rgba(255,141,0,1)";
		context.beginPath();
		context.moveTo(canvas.width/2 - width, 100);
		context.lineTo(canvas.width/2 + width, 100);
		context.stroke();
	}		

	return that;
});