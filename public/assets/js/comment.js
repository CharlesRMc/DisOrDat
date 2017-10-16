$(document).ready(function () {
	var commentForm = $('form.comment-form');
	var comment = $('input#comment-box-input');

	// When the signup button is clicked, we validate the email and password are not blank
	commentForm.on('submit', function (event) {
		event.preventDefault();

		console.log('data-choice-id');
		console.log($(this).attr('data-choice-id'));
		var decisionId = $(this).attr('data-decision-id');
		var commentText = comment.val().trim();
		// If we have an email and password, run the signUpUser function
		postComment(decisionId, commentText);
	});

	// Does a post to the signup route. If succesful, we are redirected to the members page
	// Otherwise we log any errors
	function postComment(decisionId, comment) {
		$.post('/api/comment', {
			decision_id: decisionId,
			text: comment
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
