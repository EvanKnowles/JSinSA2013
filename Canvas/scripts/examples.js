define(["exampleLine", "exampleTriangle", "exampleMovementAndText", "exampleRectangle", "examplePolygon", "exampleCircle"], function(line, triangle, movementAndText, rectangle, polygon, circle) {
	var that = [];

	that.push(line);
	that.push(triangle);
	that.push(rectangle);
	that.push(polygon);
	that.push(circle);

	that.push(movementAndText);


	return that;
});