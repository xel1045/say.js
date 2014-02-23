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

		var _analyseTranscript = function(transcript) {
			for (var phrase in phrases) {
				var parameters = null;

				if (typeof phrase === 'string') {
					if (phrase === transcript) {
						parameters = [];
					}
				} else if (phrase instanceof RegExp) {
					parameters = phrase.match(transcript);
				}

				if (parameters) {
					parameters.push(transcript, phrase);
					var callback = phrases[phrase];
					callback.apply(this, parameters);
				}
			}
		};

		this.init = function(options) {
			options = options || {};

			recognition = options.recognition || new SpeechRecognition();

			// Configure the speech recognition
			recognition.maxAlternatives = 5;
			recognition.continuous = true;

			this.language('en-US');

			// Add callbacks to speech recognition
			recognition.onstart = function() {
				// trigger event onstart
			};

			recognition.onend = function() {
				// trigger event onend
			};

			recognition.onresult = function(event) {
				// trigger event onresult

				for (var i = event.resultIndex; i < event.results.length; ++i) {
					if (event.results[i].isFinal) {
						var transcript = event.results[i][0].transcript;

						// Clean the transcript
						transcript = transcript.trim();

						// trigger an action if a match is found.
						_analyseTranscript(transcript);
					}
				}
			};

			recognition.onerror = function(event) {
				// trigger event onerror

				// event.error
				//    - no-speech
				//    - aborted
				//    - audio-capture
				//    - network
				//    - not-allowed
				//    - service-not-allowed
				//    - bad-grammar
				//    - language-not-supported
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
			recognition.stop();
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