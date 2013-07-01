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

define(["waves", "jAudio", "jquery", "jquery-ui"],  function init(node, jAudio)  {
	
	var context = jAudio.getAudioContext();

	var startSound = function() {	
	  sinewave.connect(context.destination);
	};

	var stopSound = function() {
	  sinewave.disconnect();
	};

    $('.play').click(startSound);
    $('.stop').click(stopSound);
		
	$("#frequency").slider({
		value: 440,
		min: 18,
		max: 987,
		slide: function(event, ui)  { 
			sinewave.setFrequency(ui.value);					
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
	var sinewave = node.getNode(); 
	var amp = $("#volume").slider("option", "value");

	sinewave.setAmplitude(+amp/100.0); 
	sinewave.setFrequency($("#frequency").slider("option", "value"));
});




