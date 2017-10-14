const path = require('path');
//sets path to login page
module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/login.html'))
    });
    app.get("/signup", function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/signup.html"));
    });
};


