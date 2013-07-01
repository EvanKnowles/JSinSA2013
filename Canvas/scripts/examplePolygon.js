define(function(){	
	var that = {};
	var width = 200;
	var height = 400;
	var interval = 1000;
	var steps;
	var lastTime;

	that.setup = function () {
		steps = 4;
		lastTime  = 0;
	};		

	var convertFromPolar = function(r, a) {
		var x = Math.cos(a) * r;
		var y = Math.sin(a) * r;
		return {'x':x, 'y':y};
	};

	that.loop = function(canvas, context, mouseX, mouseY) {
		if (!lastTime) {
			lastTime = Date.now();
		}
		else {
			if (Date.now() - lastTime > interval) {
				steps++;
				lastTime = Date.now();
			}
		}

		var stepAngle = 2*Math.PI / steps;
		var heightStep = height * Math.sin(Math.PI / steps);

		context.strokeStyle = "rgba(255,141,0,1)";
		context.beginPath();
		
		context.moveTo(canvas.width / 2 - heightStep/2, 100);
		var angle = 0;
		var currX = canvas.width / 2 - heightStep/2;
		var currY = 100;
		
		for (var i = 0; i < steps; i++) {
			var point = convertFromPolar(heightStep, angle);
			currX += point.x;
			currY += point.y;
			context.lineTo(currX, currY);
			angle += stepAngle;
		}

		context.closePath();
		context.stroke();
	}

	return that;
});