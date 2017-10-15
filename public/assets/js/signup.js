$(document).ready(function () {
	// Getting references to our form and input
	var signUpForm = $('form.signup');
	var emailInput = $('input#email-input');
	var passwordInput = $('input#password-input');
	var passwordConfirmInput = $('input#password-confirm-input');
	var userNameInput = $('input#username-input');
	var userFNameInput = $('input#firstname-input');
	var userLNameInput = $('input#lastname-input');
	var userBdayInput = $('input#birthday-input');
	var userPhotoInput = $('input#photo-input');

	// When the signup button is clicked, we validate the email and password are not blank
	signUpForm.on('submit', function (event) {
		event.preventDefault();
		var userData = {
			email: emailInput.val().trim(),
			password: passwordInput.val().trim(),
			passwordConfirm: passwordConfirmInput.val().trim(),
			userName: userNameInput.val().trim(),
			userFName: userFNameInput.val().trim(),
			userLName: userLNameInput.val().trim(),
			userBday: userBdayInput.val().trim(),
			userPhoto: userPhotoInput.val().trim()
		};

		console.log(userData);

		if (!userData.email || !userData.password) {
			return;
		}

		if (userData.passwordConfirm !== userData.password) {
			alert('Passwords must match.');
		}

		// If we have an email and password, run the signUpUser function
		signUpUser(userData.email, userData.password, userData.userName, userData.userFName, userData.userLName, userData.userBday, userData.userPhoto);
		emailInput.val('');
		passwordInput.val('');
		passwordConfirmInput.val('');
		userNameInput.val('');
		userFNameInput.val('');
		userLNameInput.val('');
		userBdayInput.val('');
		userPhotoInput.val('');
	});

	// Does a post to the signup route. If succesful, we are redirected to the members page
	// Otherwise we log any errors
	function signUpUser(email, password, userName, fName, lName, bDay, pic) {
		$.post('/api/signup', {
			email: email,
			password: password,
			userName: userName,
			firstName: fName,
			lastName: lName,
			birthday: bDay,
			photo: pic
		}).then(function (data) {
			// console.log(data);
			// JAKIE FIX THIS
			// JAKIE FIX THIS
			// JAKIE FIX THIS
			// JAKIE FIX THIS
			window.location.replace(data);

			// If there's an error, handle it by throwing up a boostrap alert
		}).catch(handleLoginErr);
	}

	function handleLoginErr(err) {
		$('#alert .msg').text(err.responseJSON);
		$('#alert').fadeIn(500);
	}
});
