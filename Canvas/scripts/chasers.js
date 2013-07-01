define(["colour"], function(make) {
	return function(newX, newY, newR, newAcc, canvas) {
		var that = {};
		var x = newX;
		var y = newY;
		var r = newR;
		var acc = newAcc;
		var xVel = 0, yVel = 0;
		var canvas = canvas;

		var MAX_VEL = 8;

		var chase = function(point) {
		  if (point.getX() > x && xVel < MAX_VEL)
		    xVel += acc;
		  else if (point.getX() < x && xVel > -MAX_VEL)
		    xVel -= acc;
			
		  if (point.getY() > y && yVel < MAX_VEL)
		    yVel += acc;
		  else if (point.getY() < y && yVel > -MAX_VEL)
		    yVel -= acc;
		    
		  x += xVel;
		  y += yVel;
		};
		that.chase = chase;

		var draw = function(gradient, context) {
			make.gradCircle(x, y, r, gradient, context);
		}
		that.draw = draw;

		var setAcc = function(newAcc) {
			acc = newAcc;
		}
		that.setAcc = setAcc;

		var allowed = function(point, fixed, total) {
			var fair = total / fixed + 1;
			return point.count < fair;
		};

		var findPoint = function(fixedPoints, total) {
		  var closest = 0;
		  var dist = distance(fixedPoints[0]);		  
		  var tempDist;
		  
		  for (var i = 1; i < fixedPoints.length; i++) {
		    tempDist = distance(fixedPoints[i]);
			if (tempDist < dist && allowed(fixedPoints[i], fixedPoints.length, total)) {
			  closest = i;			  
			  dist = tempDist;
			}
		  }

		  if (closest === 0 && !allowed(fixedPoints[0],fixedPoints.length, total)) {
		  	closest = Math.floor(Math.random() * fixedPoints.length);
		  }		  	
		  
		  return fixedPoints[closest];
		}
		that.findPoint = findPoint;

		var loop = function(fixedPoints, context, total) {
			var chased = findPoint(fixedPoints, total);
			chased.count++;
			chase(chased);
			draw(chased.getGradient(r), context);
		};
		that.loop = loop;

		var distance = function(obj) {
			return Math.sqrt(Math.pow(x - obj.getX(), 2) + Math.pow(y - obj.getY(), 2));
		};

		return that;
	}
});