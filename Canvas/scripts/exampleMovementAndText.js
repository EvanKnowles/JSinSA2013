define(["letters", "entelect", "chaserengine"], function(letters, logo, chaserEngine) {
		var that = {};
		var letterArray;
		var letters;
		var height = 200;
		var radius = 200;
		var engine;
		var logo;
		var scale = 1.1;
		var start, interval=500;
		var acc = 0.2;
		var imageObj ;
		var imageReady = false;
		var imageX = canvas.width;

		var setup = function (canvas, context) {
			imageX = canvas.width;
			imageReady = false;
			acc = 0.02;
			engine = chaserEngine(acc, 2000, 5, canvas.width/2, 100+height);
			start = 0;
			for (var i in logo) {
		        engine.addPoint(logo[i].x, logo[i].y*scale+100, logo[i].r, logo[i].colour);
		    }

			letterArray = [];
		    letterArray.push(letters.createLetters(canvas.width / 2, 450, "<jsinsa> 2013", 60));
		    letterArray.push(letters.createLetters(canvas.width / 2, 550, "Canvas Flash", 60));

		    imageObj = new Image();

		    imageObj.onload = function() {
		       imageReady = true;
		    };
      		imageObj.src = 'http://localhost:8080/clippy.png';
		};
		that.setup = setup;

		var loop = function(canvas, context, mouseX, mouseY) {
			if (!start) {
				start = Date.now();
			}
			else {
				if (acc < 4 && Date.now() - start > interval) {
					start = Date.now();
					acc *= 1.5;
					engine.setAcc(acc);
				}
				if (acc > 4) {
					if (imageX > 2*canvas.width/3)
						imageX--;
				}
			}

			engine.loop(context);
			for (var i in letterArray) {
	            letterArray[i].draw(mouseX, mouseY, canvas, context);
	        }

	        if (acc > 4) {
	        	context.drawImage(imageObj, imageX, 350);
	        }
		}
		that.loop = loop;

		return that;
	});