define(function(){	
	var that = {};
	var radius = 200;
	var height = 200;
	var interval = 50;
	var alpha = 0;
	var start;
	var tick;
	var tickHeight = 50;
	var jsInSAColour = '255,141,0';
	var jsInSAColourGray = '143,164,186';

	that.setup = function () {
		alpha = 0;
		start = 0;
		tick = 0;
	};		

	that.loop = function(canvas, context, mouseX, mouseY) {
		if (!start) {
			start = Date.now();
		}
		else {
			if (Date.now() - start > interval) {
				start = Date.now();
				if (alpha < 1) {
					alpha += 0.1;
				}
				else {
					tick += 0.1;
				}

			}
		}

		var grd = context.createRadialGradient(2*canvas.width/3 + Math.sin(tick)*tickHeight, 100+2*height/3 + Math.cos(tick)*tickHeight, 0, canvas.width/2, 100+height, radius);
   	    grd.addColorStop(0, 'rgba(' + jsInSAColourGray + ',' + alpha + ')');	
     	grd.addColorStop(1, 'rgba(' + jsInSAColour + ',0)');

		context.fillStyle = grd;
		context.strokeStyle = 'rgba(' + jsInSAColour + ',' + (1-alpha) + ')';

		context.beginPath();
		context.arc(canvas.width/2, 100+height, radius, 0, 2 * Math.PI, false);		
		context.closePath();		
		context.fill();
		context.stroke();
	}		

	return that;
});