# Cross Site Request Forgery (CSRF) Demo

Whether it's through fancy buttons, a misleading form, or a deviously placed pop up banner, with CSRF, the attackers' endgame is to get a victom to unknowingly fire an unintended web request that, because of a browser's cookie attachment policy, will be executed with the user's privileges.

It's worth noting, CSRF attacks don't modify the request itself. For instance, if a bank API includes a `transfer` function, the CSRF approach does not require modifying the `transfer`'s inherent functionality. Rather, the attacker simply provides parameters corresponding to an unintended action (i.e. transferring funds to the attacker's account). With the help of some styling and social engineering, the disguised unwanted actions, on the surface, looks like a harmless web application.

![CSRF Attack Diagram](https://www.acunetix.com/wp-content/uploads/2013/04/csrf.png)

## Set Up Express Apps
1. Fork this repository and `cd` into this directory (`…/course-dev/cs161/csrf/`)
2. Install the relevant node dependencies with `npm install`.
3. Run `node app.js`. You should see the following in standard output:
```
Server started successfully, listening at localhost:3000
Malicious server started successfully, listening at localhost:3001
```
* Navigate to http://localhost:3000 for the standard banking app.
* Navigate to http://localhost:3001 for the page containing the CSRF exploits + explanations for how they work.

## App Overview
* `app.js`: The backend Javascript code which initializes both the banking app and the malicious app:
  * The code for the banking app itself begins on line 10
  * The code for the malicious CSRF code begins on line 126.
* `views`: The front end bells and whistles + app logic
  * `attack.html`: Malicious code + explanations.
  * `home.html`: Bank account displaying user's balance and form for transferring funds.
  * `login.html`: This mimics how logging into an account creates a session cookie.
* `package.json`: Node dependencies + unimportant metadata

## Exercise
Once you've opened the standard banking app, you should be seeing a login page. There are two users that you can log in as:
  * Username: `Bob`, Password: `Bob`
  * Username: `Alice`, Password: `Alice`
For our purposes, we will assume that Alice is the "attacker" who will attempt to carry out CSRF attacks to get Bob to inadvertently transfer funds to her account. Log in as Bob.

Once you are logged in as Bob, you should see the home page, indicating you are logged in, and then you have a balance of $500. You should also see the "Transfer Funds' form, which allows Bob (and only Bob) to transfer money out of his account to someone else. The expected app behavior is that no one should be able to perform this action except for Bob (i.e. assume Alice doesn't know Bob's password).

Now let's get to the exploits! You should see a link at the bottom called "Open Attack Page". Click on that, and you'll be sent to a page where you'll learn how to a CSRF attack can be carried out to swindle Bob.

## Defenses
There are a couple mediation techniques, with the most popular being CSRF Tokens. These values are distinct from the cookie in that it is a secret value, associated with a particular value, and should be communicated when a request is sent to a web app server.

The idea is as follows:
* The web server generates a token and stores it.
* The token is set as a hidden field in the form.
* When the form is submitted by the user, the token is included.
* The appliction compares the received request's token and the one it's stored.
  * If the tokens match, the request is valid.
  * If the tokens don't match, the request is invalid.

Another popular approach is same site cookies, which is derivative of the same origin policy. The idea here is that cookies can only be sent if a request is made from the origin related to the cookie. With this defense, form submissions coming from http://localhost:3001 would no longer be valid since the targeted cookie was created on the login page at http://localhost:3000.

## Resources
* Robust Defenses for Cross Site Request Forgery ([link](https://seclab.stanford.edu/websec/csrf/csrf.pdf))
* OWASP Definition Page ([link](https://owasp.org/www-community/attacks/csrf))
