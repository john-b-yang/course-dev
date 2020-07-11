// {
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var app = express();
app.use(express.static('.'));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", __dirname + "/");

var db = new sqlite3.Database(':memory:');
db.serialize(function() {
  db.run("CREATE TABLE user (username TEXT, password TEXT, name TEXT, balance INTEGER, owed INTEGER)");
  db.run("INSERT INTO user VALUES ('Oski', 'cs161rulezzz', 'Administrator', 3000, 1000)");
  db.run("INSERT INTO user VALUES ('Dirks', 'ilikefences', 'Alumni', 270000, 700000)");
});
// }
app.post('/login', function (req, res) {
    var username = req.body.username; // a valid username is Oski, Dirks
    var password = req.body.password; // a valid password is cs161rulezzz, ilikefences
    var query = "SELECT name, balance, owed FROM user where username = '" + username + "' and password = '" + password + "'";

    console.log("-------");
    console.log("username: " + username);
    console.log("password: " + password);
    console.log('query: ' + query);

    db.get(query , function(err, row) {
        if(err) {
            console.log('ERROR', err);
            res.redirect("/index.html#error");
        } else if (!row) {
            res.redirect("/index.html#unauthorized");
        } else {
            res.render("admin", {
              name: row.name,
              balance: row.balance,
              owed: row.owed,
              username: username,
            })
        }
    });

});

app.listen(3000);
