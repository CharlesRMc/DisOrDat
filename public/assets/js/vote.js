$(document).ready(function () {
	var voteChoice = $('.vote');

	// When the signup button is clicked, we validate the email and password are not blank
	voteChoice.click(function () {
		// event.preventDefault();

		console.log('data-choice-id');
		console.log($(this).attr('data-choice-id'));
		var decisionId = $(this).attr('data-decision-id');
		var choiceId = $(this).attr('data-choice-id');
		var neither = $(this).attr('data-neither');
		// If we have an email and password, run the signUpUser function
		postVote(decisionId, choiceId, neither);
	});

	// Does a post to the signup route. If succesful, we are redirected to the members page
	// Otherwise we log any errors
	function postVote(decisionId, choiceId, neither) {
		$.post('/api/vote', {
			decision_id: decisionId,
			choice_id: choiceId,
			neither: neither
		}).then(function (redirectUrl) {
			window.location.replace(redirectUrl);
			// If there's an error, handle it by throwing up a boostrap alert
		}).catch(handleLoginErr);
	};

	function handleLoginErr(err) {
		$('#alert .msg').text(err.responseJSON);
		$('#alert').fadeIn(500);
	}
});
