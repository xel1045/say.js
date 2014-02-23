// Ref: https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html
global.SpeechRecognition = function() {
	// recognition parameters
	this.grammars        = null;
	this.lang            = null;
	this.continuous      = null;
	this.interimResults  = null;
	this.maxAlternatives = null;
	this.serviceURI      = null;
	
	// methods to drive the speech interaction
	this.start = function() {};
	this.stop  = function() {};
	this.abort = function() {};

	// event methods
	this.onaudiostart  = function() {};
	this.onsoundstart  = function() {};
	this.onspeechstart = function() {};
	this.onspeechend   = function() {};
	this.onsoundend    = function() {};
	this.onaudioend    = function() {};
	this.onresult      = function() {};
	this.onnomatch     = function() {};
	this.onerror       = function() {};
	this.onstart       = function() {};
	this.onend         = function() {};
};