(function() {
	'use strict';

	var root = (typeof exports == 'undefined' ? window : exports);

	// Get the speech recognition object with vendor definition
	var SpeechRecognition = root.SpeechRecognition ||
		root.webkitSpeechRecognition ||
		root.mozSpeechRecognition ||
		root.msSpeechRecognition ||
		root.oSpeechRecognition;
console.log('test');
console.log(root);
	// Check browser support
	if ( ! SpeechRecognition) {
		return;
	}

	var SayJS = function(options) {
		var recognition;
		var phrases = [];

		this.init = function(options) {
			var defaults = {};

			recognition = new SpeechRecognition();

			// Configure the speech recognition
			recognition.maxAlternatives = 5;
			recognition.continuous = true;

			this.language('en-US');

			// Add callbacks to speech recognition
			recognition.onstart = function() {
				
			};

			recognition.onend = function() {
				
			};

			recognition.onresult = function(event) {

			};

			recognition.onerror = function() {
				
			};
		};

		this.language = function(language) {
			if ( ! language) {
				return recognition.lang;
			}

			recognition.lang = language;
			return this;
		};

		this.start = function() {
			recognition.start();
			return this;
		};

		this.stop = function() {
			recognition.abort();
			return this;
		};

		this.count = function() {
			return phrases.length;
		};

		this.add = function(phrase, callback) {
			phrases[phrase] = callback;
			return this;
		};

		this.reset = function() {
			phrases = [];
			return this;
		};

		this.remove = function(phrase) {
			delete phrases[phrase];
			return this;
		};

		// Call constructor
		this.init(options);
	};

	// Global instance
	var instance;

	SayJS.instance = function() {
		if ( ! instance) {
			instance = new SayJS();
		}

		return instance;
	};

	// Export
	root.SayJS = SayJS;

	// Global helper
	root.say = function(phrase, callback) {
		SayJS.instance().add(phrase, callback);
	};
})();