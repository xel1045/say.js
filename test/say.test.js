var assert = require("assert");

require('./SpeechRecognition');
require('../src/say');

describe('SayJS', function(){
	describe('add()', function(){
		it('should add a new phrase', function(){
			var say = new SayJS();
			say.add('hello', function() {});

			assert.equal(1, say.count());
		});
	});
});
