jAudio = function() { }
jAudio.getAudioContext = function() {
    if (this.context) {
        return this.context;
    }

    var contextClass = (window.AudioContext || 
        window.webkitAudioContext || 
        window.mozAudioContext || 
        window.oAudioContext || 
        window.msAudioContext);

    if (contextClass) {
        this.context = new contextClass();
        return this.context;
    } else {
        throw new Error('AudioContext not supported in this browser.');
    }
};
