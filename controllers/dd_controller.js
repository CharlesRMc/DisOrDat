// Requiring our models and passport as we've configured it
const express = require('express');
const router = express.Router();
const db = require('../models');
const isAuthenticated = require('../config/middleware/isAuthenticated');
const passport = require('../config/passport');

var app = express();

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post('/api/login', passport.authenticate('local'), (req, res) => {
	// Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
	// So we're sending the user back the route to the members page because the redirect will happen on the front end
	// They won't get this or even be able to access this page if they aren't authed
	res.status(200).json('/feed');
	// res.redirect(307, '/feed');
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post('/api/signup', (req, res) => {
	console.log(req.body);
	
	var profilePic;

	if (!req.body.photo) {
		profilePic = '/assets/img/profile-pic-placeholder.png';
	} else {
		profilePic = req.body.photo;
	}

	db.User.create({
		email: req.body.email,
		password: req.body.password,
		user_name: req.body.userName,
		first_name: req.body.firstName,
		last_name: req.body.lastName,
		birthday: req.body.birthday,
		profile_pic: profilePic
	}).then(function () {
		res.redirect(307, '/api/login');
	}).catch(function (err) {
		console.log(err);
		res.json(err);
		// res.status(422).json(err.errors[0].message);
	});
});

// Route for logging user out
router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

// Route for getting some data about our user to be used client side

router.get('/profile', isAuthenticated, (req, res) => {
	db.Decision.findAll({
		where: {
			user_id: req.user.id
		},
		order: [
			['created_at', 'DESC']
		],
		include: [
			{
				model: db.User,
				attributes: { exclude: ["password"] }
			},
			{
				model: db.Choice,
				include: [db.Vote],
				required: false
			},
			{ model: db.Tag },
			{
				model: db.Vote,
				where: { neither: true },
				required: false
			},
			{
				model: db.Comment,
				include: [db.User],
				order: [
					['created_at', 'DESC']
				]
			}
		]
	}).then((dbUserDecisions) => {

		var hbsObject = {
			decisions: dbUserDecisions,
			user: req.user
		};
		res.render('profile', hbsObject);
		// res.json(dbUserDecisions);
		//catches any errors
	}).catch(function (err) {
		console.log(err);
		res.json(err);
	});
});

router.get('/feed', isAuthenticated, (req, res) => {
	//searches the database for all "Decisions" that include the choice model
	db.Decision.findAll({
		order: [
			['created_at', 'DESC'],
			[db.Comment, 'updated_at', 'DESC']
		],
		include: [
			{
				model: db.User,
				attributes: { exclude: ["password"] }
			},
			{
				model: db.Choice,
				include: [db.Vote],
				required: false
			},
			{ model: db.Tag },
			{
				model: db.Vote,
				where: { neither: true },
				required: false
			},
			{
				model: db.Comment,
				include: [db.User]
			}
		]
		//prints out the JSON
	}).then(function (dbDecisions) {
		var hbsObject = {
			decisions: dbDecisions,
			user: req.user
		};
		res.render('feed', hbsObject);
		// res.json(dbDecisions);
		//catches any errors
	}).catch(function (err) {
		console.log(err);
		res.json(err);
	});
});

router.post('/api/decision', (req, res) => {
	console.log(req.body.choices);
	db.Decision.create({
		description: req.body.description,
		user_id: req.user.id,
		Choices: JSON.parse(req.body.choices, null, 2),
		Tags: JSON.parse(req.body.tags, null, 2)
	}, {
			include: [db.Choice, db.Tag]
		}).then((dbDecision) => {
			console.log('Redirect feed');
			// THIS DOES NOT WORK (refresh the page)
			// return res.redirect('/feed');
			// THIS WORKS BY window.location.replace() ON THE CLIENT SIDE
			res.status(200).json('/feed');
		}).catch((err) => {
			console.log(err);
			res.json(err);
		});
});

router.delete('/api/decision/:id', (req, res) => {
	db.Decision.destroy({
		where: {
			id: req.params.id
		}
	}).then((dbDecision) => {
		res.json(dbDecision);
	}).catch((err) => {
		res.json(err);
	});
});

router.post('/api/comment', isAuthenticated, (req, res) => {
	db.Comment.create({
		text: req.body.text,
		user_id: req.user.id,
		decision_id: req.body.decision_id
	}).then((dbComment) => {
		// res.json(dbComment);
		res.status(200).json('/feed');
	}).catch((err) => {
		res.json(err);
	});
});

router.get('/api/vote/user', (req, res) => {
	db.Vote.findAll({
		where: {
			user_id: req.user.id
		},
		include: [
			{ model: db.Choice },
			{ model: db.Decision }
		]
	}).then((dbVote) => {
		res.json(dbVote);
	}).catch((err) => {
		res.json(err);
	});
})

router.post('/api/vote', (req, res) => {
	db.Vote.create({
		neither: req.body.neither,
		choice_id: req.body.choice_id,
		user_id: req.user.id,
		decision_id: req.body.decision_id
	}).then((dbVote) => {
		res.status(200).json('/feed');
	}).catch((err) => {
		res.json(err);
	});
});

module.exports = router;