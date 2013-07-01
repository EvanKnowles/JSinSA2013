define(["note"], function Tones() {
	var that = {};

	var getTone = function(newNote, newDuration, newAmplitude) {
		var that = {};

		var note = newNote;
		var duration = newDuration;
		var amplitude = 1.0;
		var startTime;

		if (note.isRest())
		{
			amplitude = 0.0;
		}
		else if (typeof newAmplitude !== 'undefined') {
			amplitude = newAmplitude;
		}

		var start = function() {
			startTime = new Date();
		};
		that.start = start;

		var done = function() {
			var now = new Date();
			return now - startTime > duration;
		};
		that.done = done;

		var getProgress = function() {
			var now = new Date();
			return (now - startTime) / duration;
		};
		that.getProgress = getProgress;

		var getNote = function() {
			return note;
		};
		that.getNote = getNote;

		var getAmplitude = function() {
			return amplitude;
		};
		that.getAmplitude = getAmplitude;

		return that;
	};
	that.getTone = getTone;
	
	var getTones = function(notes, duration, amplitude) {
		var tones = [];
		for (var i = 0; i < notes.length; i++) {
			tones.push(getTone(notes[i], duration, amplitude));
		}
		return tones;
	};
	that.getTones = getTones;
	return that;
});