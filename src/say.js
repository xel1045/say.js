(function(global) {
	'use strict';

	// Get the speech recognition object with vendor definition
	var SpeechRecognition = global.SpeechRecognition ||
		global.webkitSpeechRecognition ||
		global.mozSpeechRecognition ||
		global.msSpeechRecognition ||
		global.oSpeechRecognition;

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
				// trigger callback onstart
			};

			recognition.onend = function() {
				// trigger callback onend
			};

			recognition.onresult = function(event) {
				// trigger callback onresult

				for (var i = event.resultIndex; i < event.results.length; ++i) {
					if (event.results[i].isFinal) {
						var transcript = event.results[i][0].transcript;

						// trigger an action if a match is found.
					}
				}
			};

			recognition.onerror = function(event) {
				// trigger callback onerror

				// event.error
				//     - network
				//     - not-allowed
				//     - service-not-allowed
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
			return Object.keys(phrases).length;
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
	global.SayJS = SayJS;

	// Global helper
	global.say = function(phrase, callback) {
		SayJS.instance().add(phrase, callback);
	};
})(typeof global === "object" ? global : this);