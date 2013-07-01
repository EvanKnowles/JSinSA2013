define(["colour", "jCanvas"], function(make, jCanvas) {
	return function(newX, newY, newR, newColour) {
		var that = {};

		var CHASERS_SIZE = 10;

		var x = newX;
		var y = newY;
		var r = newR;
		var colour = make.createColour(newColour);

		var gradients = [];
		for (var j = 0; j < CHASERS_SIZE; j++) {
		  gradients.push(make.createGradient(colour, j, canvas));
		}

		var getX = function() {
			return x;
		}
		that.getX = getX;

		var getY = function() {
			return y;
		};
		that.getY = getY;

		var getGradient = function(grad) {
			return gradients[grad];
		};
		that.getGradient = getGradient;

		that.count = 0;

		return that;
	}
});