// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
	// Using the passport.authenticate middleware with our local strategy.
	// If the user has valid login credentials, send them to the members page.
	// Otherwise the user will be sent an error
	app.post("/api/login", passport.authenticate("local"), function (req, res) {
		// Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
		// So we're sending the user back the route to the members page because the redirect will happen on the front end
		// They won't get this or even be able to access this page if they aren't authed
		// res.json("/members");
		res.status(200).json("/feed");
	});

	// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
	// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
	// otherwise send back an error
	app.post("/api/signup", function (req, res) {
		console.log(req.body);
		db.User.create({
			email: req.body.email,
			password: req.body.password,
			user_name: req.body.user_name
		}).then(function () {
			res.redirect(307, "/api/login");
		}).catch(function (err) {
			console.log(err);
			res.json(err);
			// res.status(422).json(err.errors[0].message);
		});
	});

	// Route for logging user out
	app.get("/logout", function (req, res) {
		req.logout();
		res.redirect("/");
	});

	// Route for getting some data about our user to be used client side
	app.get("/api/profile", function (req, res) {
		if (!req.user) {
			// The user is not logged in, send back an empty object
			res.json({});
		}
		else {
			db.User.findOne({ where: { email: req.user.email } }).then((dbUser) => {
				res.status(200).send(dbUser);
			});
		}
	});

	app.get('/api/decision/all', (req, res) => {
		//searches the database for all "Decisions" that include the choice model
		db.Decision.findAll({
			include: [
				{ model: db.Choice },
				{ model: db.Tag }
			]
			//prints out the JSON
		}).then(function (dbDecision) {
			// res.redirect(307, "/");
			res.json(dbDecision)
			//catches any errors
		}).catch(function (err) {
			console.log(err);
			res.json(err);
		});
	});

	app.post('/api/decision', (req, res) => {
		db.Decision.create({
			description: req.body.description,
			user_id: req.body.user_id,
			Choices: [
				{ text: req.body.text1, photo: req.body.photo1 },
				{ text: req.body.text2, photo: req.body.photo2 }
			],
			Tags: req.body.tags
		}, {
				include: [db.Choice, db.Tag]
			}).then((dbDecision) => {
				res.json(dbDecision);
			}).catch((err) => {
				console.log(err);
				res.json(err);
			});
	});
};
