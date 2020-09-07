// Module Imports
var _ = require('underscore');
var bodyParser = require('body-parser');
var express = require('express');
var exphbr = require('express-handlebars');
var session = require('express-session');

// Initialize Express App
var app = express();
app.use(bodyParser.urlencoded({ extended: false })); // Helps w/ parsing data from HTML forms
app.use(session({
  secret: 'random',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: false }
})); // Session Middleware: Inroduce statefulness across requests
app.engine('html', exphbr({ defaultLayout: 'main', extname: '.html' })); // Enables Templating Logic
app.set('view engine', 'html');

app.listen(3000, function() {
    console.log('Server started successfully, listening at localhost:3000');
});

// Valid Accounts, Balances (In real systems, these values would be in a MySQL, PostgreSQL DB)
var accounts = [{username: 'bob', password: 'bob'}, {username: 'alice', password: 'alice'}];
var balances = {bob: '500', alice: '500'};

// Log In Routes
// NOTE: This is a very weak login system, but is needed to mimic generating a
// session cookie, a certificate of authenticity that is targeted by CSRF attacks.
app.get('/login', function(req, res, next) {
  res.render('login');
});

app.post('/login', function(req, res, next) {
  // Checks for verifying if login information is correct.
  if (!req.body.username) { return res.status(400).send('Username is required'); }
  if (!req.body.password) { return res.status(400).send('Password is required'); }
  var user = _.find(accounts, function(login) {
    return login.username===req.body.username && login.password ===req.body.password;
  });
  if (!user) { return res.status(400).send('Username, password combination not found'); }

  // If here: Login is valid! Let's create a cookie.
  req.session.regenerate(function(error) {
    if (error) {
      // Something happened when generating a new token for a fresh user session...
      console.log(error);
      return res.status(500).send('An unexpected error occurred.');
    }
    req.session.user = { name: user.username };
    res.redirect('/');
  });
})
