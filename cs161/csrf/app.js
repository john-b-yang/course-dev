// Module Imports
var _ = require('underscore');
var BigNumber = require('bignumber.js')
var bodyParser = require('body-parser');
var express = require('express');
var exphbr = require('express-handlebars');
var session = require('express-session');

// ****************************
// PART I: Banking Application Code
// ****************************

// ----------------------------
// MARK: Express App Initialization Begins Here
// ----------------------------

var app = express();
app.use(bodyParser.urlencoded({ extended: false })); // Helps w/ parsing data from HTML forms
app.use(session({
  secret: 'random',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: false }
})); // Session Middleware: Introduce statefulness across requests
app.engine('html', exphbr({ defaultLayout: 'main', extname: '.html' })); // Enables Templating Logic
app.set('view engine', 'html');

app.listen(3000, function() {
    console.log('Server started successfully, listening at localhost:3000');
});

// Valid Accounts, Balances (In real systems, these values would be in a MySQL, PostgreSQL DB)
var accounts = [{username: 'Bob', password: 'Bob'}, {username: 'Alice', password: 'Alice'}];
var balances = {'Bob': '500', 'Alice': '500'};

// ----------------------------
// MARK: 'Home' Page Routing Begins Here
// ----------------------------

// requiredLogin | Helper function for requiring login for home page route
var requiredLogin = function(req, res, next) {
  if (!req.session.user) { return res.redirect('/login'); } // Redirect non-logged in to login page
  next(); // If here, just continue
}

app.get('/', requiredLogin, function(req, res, next) {
  let user = req.session.user.name;
  res.render('home', { username: user, balance: balances[user] || 0 });
});

// ----------------------------
// MARK: 'Log In' Page Routing Begins Here
// ----------------------------

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

  // If here: Login is valid! Session cookie is created.
  req.session.regenerate(function(error) {
    if (error) {
      // Something happened when generating a new token for a fresh user session...
      console.log(error);
      return res.status(500).send('An unexpected error occurred.');
    }
    req.session.user = { name: user.username };
    res.redirect('/');
  });
});

// ----------------------------
// MARK: 'Transfer' Page Routing Begins Here
// ----------------------------

// transferAmount | Helper function for validating and performing a transfer of funds
var transferFunds = function(to, from, amount, cb) {
  // Checks if given parameters are valid for executing transfer
  if (!to || !balances[to]) return cb(new Error('Specified "To" account does not exist'));
  if (!from || !balances[from]) return cb(new Error('Specified "From" account does not exist'));
  if (!amount) return cb(new Error('Amount not specified'));

  try { amount = new BigNumber(amount); }
  catch (error) { return cb(new Error('Amount must be a number')); }

  if (amount < 0) { return cb(new Error('Amount must be greater than or equal to 0')); }

  // If here: Exchange can be performed.
  balances[to] = (new BigNumber(balances[to])).plus(amount).toString();
  balances[from] = (new BigNumber(balances[from])).minus(amount).toString();

  console.log(amount+'transferred from ('+from+') to ('+to+')');
  console.log('New Balances: '+JSON.stringify(balances, null, 2));
  cb();
}

// GET, POST requests to transfer endpoint are handled identically
app.get('/transfer/', requiredLogin, function(req, res, next) {
  transferFunds(req.query.to, req.session.user.name, req.query.amount,
    function(error) {
      if (error) { return res.status(400).send(error.message); }
      res.redirect('/');
    });
});

app.post('/transfer', requiredLogin, function(req, res, next) {
  transferFunds(req.query.to, req.session.user.name, req.query.amount,
    function(error) {
      if (error) { return res.status(400).send(error.message); }
      res.redirect('/');
    });
});

// ****************************
// PART I: CSRF Attack Demo
// ****************************

// ----------------------------
// MARK: Express App Initialization Begins Here
// ----------------------------

var csrfApp = express();
csrfApp.engine('html', exphbr({ defaultLayout: 'main', extname: '.html' }));
csrfApp.set('view engine', 'html');

csrfApp.listen(3001, function() {
    console.log('Malicious server started successfully, listening at localhost:3001');
});

csrfApp.get('/', function(req, res, next) {
  res.render('attack');
});
