define(["jAudio", "tones", "note"], function(jAudio) {
  var factory = {};

  var getNode = function() {
    var that = {};
  var context = jAudio.getAudioContext();  
  var node = context.createJavaScriptNode(2048, 4, 4);
  var sampleRate = context.sampleRate;
  
  var frequency = 440;
  var amplitude = 1.0;
  var phase = 0;
  
  var tones;
  var currTone;
  var nextTones = [];

  var callback;

  var process = function(e) {
    var leftChannel = e.outputBuffer.getChannelData(0);
    var rightChannel = e.outputBuffer.getChannelData(1);
    var length = leftChannel.length;
    switchTone();
    
    for (var i = 0; i < length; i++) {			
      leftChannel[i] = getSample(amplitude, phase);
      rightChannel[i] = getSample(amplitude, phase);
      advancePhase();
    }			
  };
  that.process = process;  
  node.onaudioprocess = function(e) 
  {
    that.process(e);
  };

  var addNextTones = function(moreTones) {
    nextTones.push(moreTones);
  }
  that.addNextTones = addNextTones;
  var getSample = function(amplitude, phase, prog) {
    
    return amplitude * Math.sin(phase * Math.PI * 2.0 );
  };

  var setFrequency = function(freq) {			
    frequency = freq;    
    if (callback) {
    	callback(freq);
    }

  };
  that.setFrequency = setFrequency;

  var setTones = function(newTones) {
    tones = newTones;    
  };
  that.setTones = setTones;

  var resetTones = function() {
  	tones = undefined;
  	currTone = undefined;
  };
  that.resetTones = resetTones;	

  var setAmplitude = function(amp) {  	
    amplitude = amp;
  };
  that.setAmplitude = setAmplitude;

  var getTones = function() {
    return tones;
  };
  that.getTones = getTones;

  var advancePhase = function() {
    phase += frequency / sampleRate;
    while (phase > 1.0)
      phase -= 1;			
  };

  var switchTone = function() {    
  	if (currTone && currTone.done() && tones.length == 0) {
      if (nextTones && nextTones.length > 0) {
        tones = nextTones.splice(0,1)[0];
        switchTone();
      }
      else {
  		  setAmplitude(0);
      } 
  	}
    else if (tones && tones.length != 0) {       
      if (!currTone || currTone.done()) {
        newTone();
      } 
    }
  }; 
  that.switchTone = switchTone;
  
  var setFrequencyCallback = function(newCallback) {
  	callback = newCallback;
  }
  that.setFrequencyCallback = setFrequencyCallback;

  var newTone = function() {
    currTone = tones.splice(0, 1)[0];
    console.log(currTone.getNote().toString());
    var freq = currTone.getNote().getFrequency();    
    setFrequency(freq);
    setAmplitude(currTone.getAmplitude());    
    currTone.start();        
  };
  that.newTone = newTone;

  var connect = function(destination) {
    node.connect(destination);
  };
  that.connect = connect;

  var disconnect = function() {
    node.disconnect();
  };
  that.disconnect = disconnect;
  return that;
};
factory.getNode = getNode;
  return factory;
});
