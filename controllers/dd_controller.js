// Requiring our models and passport as we've configured it
const express = require('express');
const router = express.Router();
const db = require('../models');
const passport = require('../config/passport');
var app = express();

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post('/api/login', passport.authenticate('local'), (req, res) => {
	// Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
	// So we're sending the user back the route to the members page because the redirect will happen on the front end
	// They won't get this or even be able to access this page if they aren't authed
	res.status(200).json('/login.html');
});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post('/api/signup', (req, res) => {
	console.log(req.body);
	db.User.create({
		email: req.body.email,
		password: req.body.password,
		user_name: req.body.user_name
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
router.get('/api/profile', (req, res) => {
	if (!req.user) {
		// The user is not logged in, send back an empty object
		res.json({});
	} else {
		db.User.findOne({ where: { email: req.user.email } }).then((dbUser) => {
			res.status(200).send(dbUser);
		});
	}
});

router.get('/feed', (req, res) => {
	//searches the database for all "Decisions" that include the choice model
	db.Decision.findAll({
		include: [
			{ model: db.User },
			{ model: db.Choice },
			{ model: db.Tag },
			{ model: db.Vote },
			{
				model: db.Comment,
				include: [db.User]
			}
		]
		//prints out the JSON
	}).then(function (dbDecisions) {
		// res.redirect(307, "/");
		var hbsObject = {
			decisions: dbDecisions
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
	db.Decision.create({
		description: req.body.description,
		user_id: req.user.id,
		Choices: req.body.choices,
		Tags: req.body.tags
	}, { include: [db.Choice, db.Tag] }).then((dbDecision) => {
		res.json(dbDecision);
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

router.post('/api/comment', (req, res) => {
	db.Comment.create({
		text: req.body.text,
		user_id: req.user.id,
		decision_id: req.body.decision_id
	}).then((dbComment) => {
		res.json(dbComment);
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
		res.json(dbVote);
	}).catch((err) => {
		res.json(err);
	});
});

module.exports = router;