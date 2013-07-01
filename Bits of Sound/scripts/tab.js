function TabLine(newNote, newLine) {
  var that = {};

  var note = newNote;
  var line = newLine;

  var getProgression = function(octave) {
    var baseOctave = octave ? octave : 4;
    if (note.toUpperCase() !== note) {
      baseOctave++;
    }
    
    var noteOctave = NoteOctave(Notes[note.toUpperCase()], baseOctave);

    var number = /[0-9]/;
    var steps = [];
    for (var i in line) {
      if (number.test(line[i])) {
        steps.push(+line[i]);
      }
      else {
        steps.push(-1);
      }

    }
    return Progression(noteOctave, steps);
  };
  that.getProgression = getProgression;

  var toString = function() {
    return note + "|" + line;
  };  
  that.toString = toString;

  return that;
}

function TabPhrase() {
  var that = {};

  var lines = [];
  var complete_count = 6;

  var isComplete = function() {
    return lines.length === complete_count; 
  };
  that.isComplete = isComplete;

  var addLine = function(line) {
    lines.push(line);
  };
  that.addLine = addLine;

  var toString = function() {
    var result = "";
    for (var i in lines)
    {
      result += lines[i] + "<br/>";
    }
    return result;
  };
  that.toString = toString;

  var getProgressions = function(octave) {
    var result = [];
    for (var i = 0; i < lines.length; i++) {
      result.push(lines[i].getProgression(octave));
    }
    return result;
  }
  that.getProgressions = getProgressions;

  return that;
};

function Tab() {
  var that = {};

  var phrases = [];

  var addPhrase = function(phrase) {
    phrases.push(phrase);
  };
  that.addPhrase = addPhrase;

  var getPhraseProgressions = function(octave) {
    var result = [];
    for (var i = 0; i < phrases.length; i++) {
      result.push(phrases[i].getProgressions(octave));
    }
    return result;
  };
  that.getPhraseProgressions = getPhraseProgressions;

  var toString = function() {
    var result = "";
    for (var i in phrases)
    {
      result += phrases[i] + "<hr/>";
    }
    return result;
  };
  that.toString = toString;

  var parseTabFile = function(text) {
    lines = text.split(/\r\n|\r|\n/g);

  	phrases = [];
    var tabPhrase = TabPhrase();
    var tablaturePattern = /^([A-Ga-g]{0,1}[#b]{0,1})[\|\]]{0,1}([\-0-9\|\/\^\(\)\\hbpv]+)/;

    for (var i in lines) {      
      var match = lines[i].match(tablaturePattern);
      if (match) {
        tabPhrase.addLine(TabLine(match[1], match[2]));
        if (tabPhrase.isComplete()) {
          addPhrase(tabPhrase);
          tabPhrase = TabPhrase();                            
        }
      }
      else {         
        tabPhrase = TabPhrase();
      }      
    }
  };
  that.parseTabFile = parseTabFile;

  return that;
}