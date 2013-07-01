define(function() {
	var that = {}

	var createLetters = function(newX, newY, newLetters) {
		var that = {};
		var x = newX;
		var y = newY;
		var letters = newLetters;
		var fontSize = 60;
		var maxLength = 30;
		var gradient;
		var canvasWidth;
		var canvasHeight;

		var getGradient = function(canvas, context) {
			if (!gradient) {
				gradient = context.createLinearGradient(0,0,canvas.width,canvas.height);
				gradient.addColorStop(0, "black");
				gradient.addColorStop(1, "white");
			}
			return gradient;
		};

		var drawLetters = function(letters, context, mouseX, mouseY) {		
			var letterWidth = context.measureText(letters).width;		

			var offsetX = x - (letterWidth / 2);
			var offsetY = y - (fontSize / 2);

			for(var c in letters)
			{
				var drawX = offsetX;
				var drawY = offsetY;

				var midX = offsetX + (context.measureText(letters[c]).width / 2);	
				var midY = offsetY + (fontSize / 2); 

				var vecX = mouseX - midX ;
				var vecY = mouseY - midY ;			
				
				var length = Math.sqrt(vecX*vecX + vecY*vecY);
				
				var diff = 0.0;
				if (length < maxLength)
				{
					diff = Math.abs(length - maxLength);
					
					drawX -= diff*vecX/3;
					drawY -= diff*vecY/3;
				}
				
				context.font = "bold 60px 'Times New Roman', Times, serif";
				context.fillText(letters[c], drawX, drawY);
				context.font = "bold 61px 'Times New Roman', Times, serif";
				context.strokeText(letters[c], drawX, drawY);	
				offsetX += 1.1 * context.measureText(letters[c]).width;			
			}
		}
		var setupContext = function(context, gradient) {
			context.textAlign = "left";
			context.fillStyle = gradient;
			context.strokeStyle = "black";
			context.textBaseline = "hanging";
			context.lineWidth = 1;
			context.font = "bold 60px 'Times New Roman', Times, serif";
		};

		var draw = function(mouseX, mouseY, canvas, context) {			
			canvasWidth = canvas.width;
			canvasHeight = canvas.height;

			x = canvasWidth / 2;
			var gradient = getGradient(canvas, context);
			setupContext(context, gradient);
			drawLetters(letters, context, mouseX, mouseY);
		}
		that.draw = draw;

		return that;
	};

	that.createLetters = createLetters;
	return that;
});