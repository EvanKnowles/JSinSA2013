function Enum() {
	var that = {};

    for (var i = 0; i < arguments.length; ++i) {
        that[arguments[i]] = i;
        that[i] = arguments[i];
    }

    var getValueAtIndex = function(step) {
		return that[step];
	};
	that.getValueAtIndex = getValueAtIndex;

    return that;
}

var Notes = Enum("C", "Csharp", "D", "Dsharp", "E", "F", "Fsharp", "G", "Gsharp", "A", "Asharp", "B");

function NoteOctave(newNote, newOctave, newRest) {
	var that = {};
	
	var note = newNote;

	var octave = 4;
	if (newOctave) {
		octave = newOctave;
	}	

	var rest = false;
	if (newRest) {
		rest = newRest;
	}

	var getStepsFrom = function(otherNote) {
		var steps = (otherNote.getOctave() - octave) * NoteOctave.SIZE;
		steps += otherNote.getNote() - note;
		return steps;
	};
	that.getStepsFrom = getStepsFrom;

	var addSteps = function(steps) {
		var notePosition = note + steps;
		var newOctave = octave;
		
		var steps = Math.floor(notePosition / 12);
		newOctave += steps;
		notePosition -= 12 * steps;
	
		return NoteOctave(notePosition, newOctave, rest);
	};
	that.addSteps = addSteps;

	var getFrequency = function() {
		if (equals(NoteOctave.BASE_NOTE))
			return NoteOctave.BASE_FREQUENCY;

		var steps = NoteOctave.BASE_NOTE.getStepsFrom(this);
		return NoteOctave.BASE_NOTE.getFrequency() * Math.pow(NoteOctave.A, steps);
	};
	that.getFrequency = getFrequency;

	var toString = function() {
		return rest ? "Rest" : Notes.getValueAtIndex(note) + octave;
	};
	that.toString = toString;

	var equals = function(otherNote) {
		return note == otherNote.getNote() && octave == otherNote.getOctave();
	};
	that.equals = equals;

	var getNote = function() {
		return note;
	};
	that.getNote = getNote;

	var getOctave = function() {
		return octave;
	};
	that.getOctave = getOctave;

	var isRest = function() {
		return rest;
	}
	that.isRest = isRest;
	
	return that;
}

NoteOctave.getFromFrequency = function(frequency)
{
	var logCurrentOverBase = 
			Math.log(frequency / NoteOctave.BASE_NOTE.getFrequency());

	var steps = Math.round(logCurrentOverBase / Math.log(NoteOctave.A));
	return NoteOctave.BASE_NOTE.addSteps(steps);
};

NoteOctave.BASE_NOTE = NoteOctave(Notes.A, 4);
NoteOctave.BASE_FREQUENCY = 440;
NoteOctave.SIZE = 12;
NoteOctave.A = Math.pow(2, 1 / NoteOctave.SIZE);

function Progression(newBase, newSteps) {
	var that = {};

	var base = newBase;
	var steps = newSteps;

	var getNotes = function() {
		var notes = [];
		var curr;
		for (var i in steps) {
			if (steps[i] < 0) {
				curr = NoteOctave(Notes.A, 4, true);
			}
			else {
				curr = base.addSteps(steps[i]);
			}
			notes.push(curr);
		}
		return notes;
	};
	that.getNotes = getNotes;

	var toString = function() {
		var result = "";
		var notes = getNotes();
		for (var n in notes) {
			result += " " + notes[n];
		}
		return result;
	}
	that.toString = toString;

	return that;
}


function Scale()
{
	var that = {};

	var steps = [];
	for( var i = 0; i < arguments.length; ++i ) {
        steps[i] = arguments[i];
    }

    var getNotes = function(base, total) {
		var notes = [];
		var curr = NoteOctave(base.getNote(), base.getOctave());
		notes[0] = curr;

		var count = 1;
		while (count <= total) {
			for (var i in steps) {
				curr = curr.addSteps(steps[i]);
				notes.push(curr);
				count++;
				if (count > total)
					break;
			}
		}
		return notes;
	};
	that.getNotes = getNotes;

	var generateScale = function(base, mode) {
		var totalSteps = steps.length;
		var count = totalSteps*2;
		if (typeof mode  == 'undefined') {
			mode = base.getNote();
			count = totalSteps;
		}

		var notes = getNotes(base, count);

		while (notes[0].getNote() != mode) {
			notes.splice(0, 1);
		}

		if (notes.length > totalSteps + 1) {
			notes.splice(totalSteps, notes.length - totalSteps);
		}

		return notes;
	}
	that.generateScale = generateScale;

	return that;
}

Scale.Major = Scale(2, 2, 1, 2, 2, 2, 1);
Scale.Minor = Scale(2, 1, 2, 2, 1, 2, 2);
Scale.Pentatonic = Scale(2, 2, 3, 2, 3);