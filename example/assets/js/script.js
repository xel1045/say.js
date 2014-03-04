$(document).ready(function() {
	SayJS.instance().start();

	say('tell me more', function() {
		$('html, body').animate({
			scrollTop: $("#how-it-works").offset().top
		}, 1000);
	});

	say(/my name is (.*)/, function(transcript, name) {
		alert('Hello '+name+'!');
	});
});