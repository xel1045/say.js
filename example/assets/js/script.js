$(document).ready(function() {
	SayJS.instance().start();

	say('tell me more', function() {
		alert('Hello!');
	});
});