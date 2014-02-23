var assert       = require('assert'),
	should       = require('should'),
	sinon        = require('sinon'),
	EventEmitter = require('events').EventEmitter;

require('./SpeechRecognition');
require('../src/say');

describe('Say.js', function() {
	describe('Methods to manage phrases callbacks', function() {
		describe('add()', function() {
			it('should add static phrase', function() {
				var say = new SayJS();
				say.add('hello', function() {});

				assert.equal(1, say.count());
			});

			it('should add regex phrase', function() {
				var say = new SayJS();
				say.add(/hello (.*)/, function() {});

				assert.equal(1, say.count());
			});
		});

		describe('count()', function() {
			it('should return zero on initialization', function() {
				var say = new SayJS();
				assert.equal(0, say.count());
			});

			it('should count new items added', function() {
				var say = new SayJS();

				say.add('hello', function() {});
				assert.equal(1, say.count());

				say.add('hi', function() {});
				assert.equal(2, say.count());
			});

			it('should not count duplicates', function() {
				var say = new SayJS();

				say.add('hello', function() {});
				assert.equal(1, say.count());

				say.add('hello', function() {});
				assert.equal(1, say.count());
			});

			it('should decrease on remove static', function() {
				var say = new SayJS();

				say.add('hello', function() {});
				assert.equal(1, say.count());

				say.remove('hello');
				assert.equal(0, say.count());
			});

			it('should return zero on reset', function() {
				var say = new SayJS();

				say.add('hello', function() {});
				say.reset();

				assert.equal(0, say.count());
			});
		});

		describe('remove()', function() {
			it('should remove a static phrase', function() {
				var say = new SayJS();
				say.add('hello', function() {});
				say.remove('hello');

				assert.equal(0, say.count());
			});

			it('should remove a regex phrase', function() {
				var say = new SayJS();
				say.add(/hello (.*)/, function() {});
				say.remove(/hello (.*)/);

				assert.equal(0, say.count());
			});
		});

		describe('reset()', function() {
			it('should reset phrases', function() {
				var say = new SayJS();
				say.add('hello', function() {});
				say.add(/hello (.*)/, function() {});
				say.reset();

				assert.equal(0, say.count());
			});
		});
	});

	describe('Methods to manage the SpeechRecognition state', function() {
		describe('language()', function() {
			it('should return the default language', function() {
				var say = new SayJS();

				assert.equal('en-US', say.language());
			});

			it('should get and set the language', function() {
				var say = new SayJS();

				say.language('fr-CA');
				assert.equal('fr-CA', say.language());
			});

			it('should synchronize the language with the recognition object', function() {
				var mock = new SpeechRecognition();
				var say = new SayJS({
					recognition: mock
				});

				assert.equal('en-US', mock.lang);

				say.language('fr-CA');
				assert.equal('fr-CA', mock.lang);
			});
		});

		describe('start()', function() {
			it('should start the recognition object', function() {
				var mock = new SpeechRecognition();
				sinon.spy(mock, 'start');

				var say = new SayJS({
					recognition: mock
				});

				say.start();

				sinon.assert.calledOnce(mock.start);
			});
		});

		describe('stop()', function() {
			it('should stop the recognition object', function() {
				var mock = new SpeechRecognition();
				sinon.spy(mock, 'stop');

				var say = new SayJS({
					recognition: mock
				});

				say.stop();

				sinon.assert.calledOnce(mock.stop);
			});
		});
	});

	describe('Events', function() {

	});
});
