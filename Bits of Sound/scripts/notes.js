 require.config({
    shim: {
        "bootstrap": {
          deps: ["jquery"],
          exports: "$.fn.popover"
        },

        "jquery-ui": {
            exports: "$",
            deps: ['jquery']
        },

        "jAudio": {
            exports: "jAudio"
        },

        "note": {
            exports: "NoteOctave"
        }
    },
    enforceDefine: true
});

define(["waves", "jAudio", "jquery", "jquery-ui", "note", "tones"],  function init(node, jAudio)  {	
	var context = jAudio.getAudioContext();
	var sinewave = node.getNode();
	var amp = 100;

	var startSound = function() {	
		sinewave.connect(context.destination);
	};

	var stopSound = function() {
	    sinewave.disconnect();
	};

	var playScale = function() {
		var currFreq = $("#frequency").slider("option", "value");
		//var total = 8;
		var base = NoteOctave.getFromFrequency(currFreq);

		var notes = Scale.Pentatonic.generateScale(base);
		var tone = require("tones");
		
		var test = tone.getTones(notes, 500, 1);
		sinewave.setTones(test);
		startSound();
	};

	var clickPlay = function(){
		sinewave.resetTones();
		startSound();
	}

    $('.play').click(clickPlay);
    $('.stop').click(stopSound);
	$('.playScale').click(playScale);

	$("#frequency").slider({
		value: 440,
		min: 18,
		max: 987,
		slide: function(event, ui)  { 
			var note = NoteOctave.getFromFrequency(ui.value);
			$("#noteDiv").text("Closest note is: " + note);
			sinewave.setFrequency(note.getFrequency());					
		}
	});
	
	$("#volume").slider({
		value: 100.0,
		min: 0.0,
		max: 110.0,
		slide: function(event, ui) {
			if (typeof sinewave !== "undefined") { 
				sinewave.setAmplitude(ui.value/100);
			}
		}
	});

	var updateFrequency = function(freq) {
		$("#frequency").slider('value', freq);
		var note = NoteOctave.getFromFrequency(freq);
		$("#noteDiv").text("Closest note is: " + note.toString());
	};

	sinewave.setAmplitude(+amp/100.0); 
	sinewave.setFrequency($("#frequency").slider("option", "value"));
	sinewave.setFrequencyCallback(updateFrequency);
});




