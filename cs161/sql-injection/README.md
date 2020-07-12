# SQL Injection Demo

Poorly santizied inputs to SQL queries are nothing new, and yet, after its initial mention in 1998, it continues to be the attack behind dozens of cyber-crime headlines and millions of dollars of damage (Vice [article](https://www.vice.com/en_us/article/aekzez/the-history-of-sql-injection-the-hack-that-will-never-go-away)).

This demo contains a simple, Express-based application that features a log-in page with a SQL Injection vulnerability. The `app.js` folder contains the database and app's naive SQL query for validating log in. This example will attempt to demonstrate how one would go about:
1. Detecting whether an app has a SQL Injection vulnerability.
2. Expose that vulnerability with a variety of malicious queries.

This exercise does not require any proficiency in front end languages or frameworks. The installation requirements are simply to get the app running.

## Set Up Express App
1. Fork this repository and `cd` into this directory (`…/course-dev/cs161/sql-injection/`)
2. Ensure that you have `node` and `npm` installed. ([link](https://nodejs.org/en/download/))
3. Run `npm install` (`node_modules/` folder should be created)
4. Run `./run.sh`. You should see something similar to:
```
CG> success true
CG> open -p 3000 /index.html
```
5. Navigate to `http://0.0.0.0:3000/`. The site should be live!

## App Overview
* `index.html`: The app's log in page
* `admin.ejs`: Source code for the page indicating successful log in
* `style.css`: Decorations for app, don't worry about this
* `app.js`: The app logic
  * Lines 2-10: Express app configurations
  * Lines 12-17: Inserts mock users into SQL database
  * Lines 19 onwards: Handles login attempt form submission

There are two users: (username: Oski, password: cs161rulezzz) and (Dirks, ilikefences)

The SQL query for validating log in is `"SELECT name, balance, owed FROM user WHERE username = '" + username + "' and password = '" + password + "'";`

When the password log in form is submitted, you can see the values for `username` and `password` you entered, along with the completely constructed SQL query in standard output.

## Exercise

First, enter a valid username/password combination. Verify that you are directed to the `admin` page indicating successful login.

Now, go back to the login page and enter an incorrect username/password combination. Verify that a banner pops up below indicating the provided log in values were invalid.

#### Detecting the Vulnerability

Hopefully, you are somewhat convinced that superficially, the app login seems to be effective. Realizing this, assuming you're an attacker who knows nothing about the app internals and can't view `app.js`, you decide to enter some random values to check for a vulnerability. Assume you know a valid username (i.e. Oski, Dirks)

<details>
<summary>What values could you enter to check for a SQL Injection vulnerability? (Hint: Cause an app server error)</summary>
<br>
Unsanitized arguments in an unprotected SQL query can cause app server errors. Try entering {username: `hello`, password: `hello'`} and see what happens. The `An error has occurred` banner should appear.

Navigate to the standard output and you'll likely see:
```
query: SELECT name, balance, owed FROM user WHERE username = 'hello' and password = 'hello''
ERROR Error: SQLITE_ERROR: unrecognized token: "'hello''"
```

That extra quotation mark caused a SQL query error! Even if we couldn't see the standard output, the `An error has occurred` message indicates that something wrong happened in the app server, which is seminally distinct from `invalid username/password`. The latter suggests an error in the *client's* request, but the former hints at a *server* side error.
</details>

#### The Attack

Now, knowing that there is a SQL vulnerability, it's time to act.

<details>
<summary>What could you enter for username or password to log in with unregistered credentials?</summary>
<br>
The general approach here would be to write a SQL snippet that would evaluate to a true expression even if the password is wrong.

This combination would work:
```
username: Oski
password: joe-bruin' or '1'='1
```

Even though our password is wrong, the `'1'='1` evaluates to true no matter what! We've broken in. 🎩 Notice that this "password" would work for any username, so we can log in to both the Dirks and Oski accounts.

Can you think of any other malicious queries? If you do, feel free to create a PR and add your own to this README!
</details>
<br>
<details>
<summary>How can we rewrite the SQL query such that this error doesn't occur?</summary>
<br>
The conceptual antidote to SQL Injections is to never trust user input, and to always sanitize it before passing it into a SQL statement. Techniques include:

* Prepared statements: Create SQL statement first, then treat user data as parameters
* Vague Errors: Instead of a server error message that suggested the vulnerability's presence, a more general "Incorrect: Please try again" reveals much less about the underlying app's behavior.
* Regular expressions: Only allow passwords that match a certain pattern, although this can be counter-productive in that it narrows down the scope of what a password could be.

Thankfully, the `sqlite3` package has its own version of prepared statements. For this application, do the following:
1. Copy and paste `var stmt = db.prepare("SELECT name, balance, owed FROM user WHERE username=(?) and password = (?)");` anywhere in the `app.post` call.
2. Change the `db.get(query, function(...` line to `stmt.get(username, password, function(err, row) {`

Viola! If you run the same aforementioned exploit, the app will return the "Invalid Username or Password" error instead of logging you in.
</details>

## Additional Resources
These links are meant to provide more practical examples of SQL injection.
* [hacksplaining](https://www.hacksplaining.com/exercises/sql-injection) - Highly recommended, amazing infographic!
* [w3schools](https://www.w3schools.com/sql/sql_injection.asp)
