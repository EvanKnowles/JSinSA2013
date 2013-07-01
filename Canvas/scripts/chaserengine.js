define(["chasers", "fixed", "jCanvas"], function(makeChaser, makeFixed, jCanvas) {	  

	var random = function(max) {
		return Math.random() * max;
	};

	var convertFromPolar = function(r, a) {
		var x = Math.cos(a) * r;
		var y = Math.sin(a) * r;
		return {'x':x, 'y':y};
	};

	return function(speed, maxChasers, maxSize, width, height, radius) {
		var canvas = jCanvas.getContext();
		var that = {};
  		var fixedPoints = [];
  		var chasers = [];
  		var colours = [];
  		var pointIndex = 0;
  
   		for (var i = 0; i < maxChasers; i++) {
   			if (!radius) {
				var x = random(width);	
				var y = random(height);
				var r =  Math.floor(random(maxSize)) + 1;
			}
			else {
				var angle = random(2*Math.PI);
				var dist = random(radius);
				var point = convertFromPolar(dist, angle);

				var x = point.x + width;
				var y = point.y + height;
				var r = Math.floor(random(maxSize)) + 1;
			}
			chasers.push(makeChaser(x, y, r, speed));
		}

		var addPoint = function(x, y, r, colour) {
			fixedPoints.push(makeFixed(x, y, r, colour, canvas));
		};
		that.addPoint = addPoint;

		var setAcc = function(newAcc) {
			for (var i in chasers) {
				chasers[i].setAcc(newAcc);
			}
		};
		that.setAcc = setAcc;

		var resetPoints = function() {
			for (var i in fixedPoints) {
				fixedPoints[i].count = 0;
			}
		};

		var loop = function(context) {
			for (var i in chasers) {
				chasers[i].loop(fixedPoints, context, chasers.length);
			}

			resetPoints();
		};
		that.loop = loop;

		return that;
	};
});