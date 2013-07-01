define(function() {
	var that = {};
	var canvas, context;

	var initialize = function(canvasId) {
		canvas = $("#" + canvasId)[0];
		context = canvas.getContext("2d");
	};
	that.initialize = initialize;

	var getCanvas = function() {
		return canvas;
	};
	that.getCanvas = getCanvas;

	var getContext = function() {
		return context;
	};
	that.getContext = getContext;

	return that;
});