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
			for (var i=0, l=phrases.length; i<l; i++) {
				var object = phrases[i],
					phrase = object.phrase,
					parameters = null;

				if (typeof phrase === 'string') {
					if (phrase === transcript) {
						parameters = [];
					}
				} else if (phrase instanceof RegExp) {
					parameters = transcript.match(phrase);
				}

				if (parameters) {
					parameters.push(transcript, phrase);
					var callback = phrases[i].callback;
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
				console.log(event);
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

		/**
		 * Get or set the language used for speech recognition.
		 * @param  string language Optionnal - Set the language
		 */
		this.language = function(language) {
			if ( ! language) {
				return recognition.lang;
			}

			recognition.lang = language;
			return this;
		};

		/**
		 * Start the speech recognition engine
		 */
		this.start = function() {
			recognition.start();
			return this;
		};

		/**
		 * Stop the speech recognition.
		 */
		this.stop = function() {
			recognition.stop();
			return this;
		};

		/**
		 * Return the number of phrases defined for detection.
		 */
		this.count = function() {
			return Object.keys(phrases).length;
		};

		/**
		 * Add a new phrase to be looked for by the speech recognition.
		 * @param mixed   phrase   String or Regex of the phrase to look for
		 */
		this.add = function(phrase, callback) {
			this.remove(phrase);

			phrases.push({
				'phrase': phrase,
				'callback': callback
			});
			return this;
		};

		/**
		 * Reset all phrases saved for recognition.
		 */
		this.reset = function() {
			phrases = [];
			return this;
		};

		/**
		 * Return if a phrase is defined for the speech recognition.
		 * @param mixed   phrase   String or Regex of the phrase to look for
		 */
		this.exists = function(phrase) {
			for (var i=0, l=phrases.length; i<l; i++) {
				if (String(phrases[i].phrase) === String(phrase)) {
					return true;
				}
			}

			return false;
		};

		/**
		 * Remove a phrase for the speech recognition.
		 * @param mixed   phrase   String or Regex of the phrase to look for
		 */
		this.remove = function(phrase) {
			phrases = phrases.filter(function(object) {
				return String(object.phrase) !== String(phrase);
			});
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