$(document).ready(function() {
	SayJS.instance().start();

	say('tell me more', function() {
		alert('Hello!');
	});

	say(/my name is (.*)/, function(transcript, name) {
		alert('Hello '+name+'!');
	});
});