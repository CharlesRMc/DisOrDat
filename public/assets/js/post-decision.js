$(document).ready(function () {
	var decisionForm = $('form.decision');
	var decisionQuestion = $('input#decision-question');
	var tags = $('input#tags');
	var decisionChoiceOneName = $('input#decision-choice-1-name');
	var decisionChoiceOneUrl = $('input#decision-choice-1-url');
	var decisionChoiceTwoName = $('input#decision-choice-2-name');
	var decisionChoiceTwoUrl = $('input#decision-choice-2-url');

	// When the signup button is clicked, we validate the email and password are not blank
	decisionForm.on('submit', function (event) {
		event.preventDefault();

		console.log('Decision submit');

		var parsedTags = [];
		var decision = {
			description: decisionQuestion.val().trim(),
			choices: [
				{
					text: decisionChoiceOneName.val().trim(), 
					photo: decisionChoiceOneUrl.val().trim()
				},
				{
					text: decisionChoiceTwoName.val().trim(),
					photo: decisionChoiceTwoUrl.val().trim()
				}
			],
			tags: parsedTags
		};

		console.log(decision);

		if (!decision.description || !decision.choices) {
			return;
		}
		// If we have an email and password, run the signUpUser function
		createDecision(decision.description, decision.choices, decision.tags);
		decisionQuestion.val('');
		decisionChoiceOneName.val('');
		decisionChoiceOneUrl.val('');
		decisionChoiceTwoName.val('');
		decisionChoiceTwoUrl.val('');
	});

	// Does a post to the signup route. If succesful, we are redirected to the members page
	// Otherwise we log any errors
	function createDecision(description, choices, tags) {
		console.log(choices);
		$.post('/api/decision', {
			description: description,
			choices: JSON.stringify(choices),
			tags: JSON.stringify(tags)
		}).then(function (data) {
			// window.location.replace(data);
			console.log('HAHA!');
			// If there's an error, handle it by throwing up a boostrap alert
		}).catch(handleLoginErr);
	};

	function handleLoginErr(err) {
		$('#alert .msg').text(err.responseJSON);
		$('#alert').fadeIn(500);
	}
});

    parsedTags.push(tags);
    parsedTags.join(',');
    console.log(parsedTags);
};
