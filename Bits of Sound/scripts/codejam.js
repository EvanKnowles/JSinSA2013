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
        },

        "tab": {
            exports: "Tab"
        }
    },
    enforceDefine: true
});

define(["waves", "jAudio", "jquery", "jquery-ui", "tab"],  function init(factory, jAudio)  {
	
	var context = jAudio.getAudioContext();

	var startSound = function() {	
	      gainNode.connect(context.destination);
	};

	var stopSound = function() {
	    gainNode.disconnect();
	};

    $('.play').click(startSound);
    $('.stop').click(stopSound);
		
    var strings = [];
    var gainNode = context.createGainNode();
    for (var i = 0; i <= 5; i++) {
        strings[i] = factory.getNode();
        strings[i].connect(gainNode);
    }

    var tab = Tab();
	var handleFileSelect = function(evt) {
	    evt.stopPropagation();
	    evt.preventDefault();

	    var files = evt.dataTransfer.files;
	    if (files.length != 1)
	    	$("#result").text("Only one file please.");
	    var f = files[0];
	    var reader = new FileReader();

      	// Closure to capture the file information.
        var tone = require("tones");

      	reader.onload = (function(theFile) {
        	return function(e) {
        		tab.parseTabFile(e.target.result);
                $("#result").html(tab.toString());
                var prog = tab.getPhraseProgressions();

                for (var i = 0; i < prog[0].length; i++) {                    
                    var tones = tone.getTones(prog[0][i].getNotes(), 200, 1);
                    strings[i].setTones(tones);
                }

                for (var j = 1; j < prog.length; j++) {
                    for (var i = 0; i < prog[j].length; i++) {                    
                        var tones = tone.getTones(prog[j][i].getNotes(), 200, 1);
                        strings[i].addNextTones(tones);
                    }
                }
                
        };
      })(f);
      reader.readAsText(f);
	  };

	var handleDragOver = function(evt) {
		evt.stopPropagation();
	    evt.preventDefault();
	    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
	};
    var dropZone = $('#fileInput')[0];
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);


});




