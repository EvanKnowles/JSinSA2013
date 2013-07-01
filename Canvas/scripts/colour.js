define(["jCanvas"], function(canvas)
{
	var that = {};

	var createColour = function(c) {
		var that = {};
		that.c1 = 'rgba(' + c + ',1)';
		that.c2 = 'rgba(' + c + ',0)';	
		return that;
	}
	that.createColour = createColour;

	var createGradient = function(c, r) {
		var context = canvas.getContext();
	   var grad = context.createRadialGradient(0, 0, 0, 0, 0, r);   
	   grad.addColorStop(0, c.c1);
	   grad.addColorStop(1, c.c2);
	   return grad;
	};
	that.createGradient = createGradient;

	var gradCircle = function(x, y, r, gradient) {
		var context = canvas.getContext();
	  context.fillStyle = gradient;
	  context.save();
	  context.translate(x,y);
	  context.beginPath();
	  context.arc(0, 0, r, 0, 2*Math.PI, true);
	  context.closePath();
	  context.fill();
	  context.restore();
	};
	that.gradCircle = gradCircle;

	return that;
});