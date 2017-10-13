$(document).ready(function () {
	// Getting references to our form and input
	var signUpForm = $('form.signup');
	var emailInput = $('input#email-input');
	var passwordInput = $('input#password-input');
	var passwordConfirmInput = $('input#password-input');
	var userNameInput = $('input#username-input');

	// When the signup button is clicked, we validate the email and password are not blank
	signUpForm.on('submit', function (event) {
		event.preventDefault();
		var userData = {
			email: emailInput.val().trim(),
			password: passwordInput.val().trim(),
			passwordConfirm: passwordConfirmInput.val().trim(),
			userName: userNameInput.val().trim()
		};

		if (!userData.email || !userData.password) {
			return;
		}

		if (userData.passwordConfirm !== userData.password) {
			alert('Passwords must match.');
		}

		// If we have an email and password, run the signUpUser function
		signUpUser(userData.email, userData.password, userData.password);
		emailInput.val('');
		passwordInput.val('');
		userNameInput.val('');
	});

	// Does a post to the signup route. If succesful, we are redirected to the members page
	// Otherwise we log any errors
	function signUpUser(email, password) {
		$.post('/api/signup', {
			email: email,
			password: password,
			userName: userName
		}).then(function (data) {
			window.location.replace(data);
			// If there's an error, handle it by throwing up a boostrap alert
		}).catch(handleLoginErr);
	}

	function handleLoginErr(err) {
		$('#alert .msg').text(err.responseJSON);
		$('#alert').fadeIn(500);
	}
});
