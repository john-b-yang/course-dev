# Stored XSS Demo

Cross Site Scripting (XSS) is a vulnerability typically found in web applications with a host of possible exploits. There are 2 specific exploits discussed in CS 161: Stored and Reflected XSS attacks. Reflected XSS attacks are usually a product of code injection through HTTP query parameters that are not sanitized by server side scripts before being used.

Stored XSS (persistent) is the arguably more devastating of the two. Generally, this is when unsanitized data from an attacker is saved to, then provided by a server on pages that other users may browse. Carefully written scripts can solicit or parse confidential information, or even worse, run unauthorized code with the permissions of another user.

This demo is a simple web app with Flask routing that saves and posts unsanitized user input. With a simplistic set up process that takes seconds, you can experiment writing malicious scripts and see what tricks you can carry out!

## Set Up Flask App
1. Fork this repository and `cd` into this directory (`…/course-dev/cs161/stored-xss/`)
2. If necessary, install the necessary requirements with `pip install -r requirements.txt` (It's just Flask, a Python backend library!)
3. Run `./app.py`. If you're getting permission errors, run `chmod u+x app.py`. You should
    * See a `db.sqlite3` file (your local database)
    * See the website at http://0.0.0.0:5000/. The site should be live!

## App Overview
* `app.py`: The backend Python code which instantiates the SQLite DB and implements the `/`, `/comment` and `/clear` endpoints.
* `templates`: Contains `index`, `base` HTML files, just front end
* `static`: Contains `style` CSS file, just front end
* `requirements.txt`: Contains list of dependencies (just `Flask`)!

## Exercise

When you navigate to http://0.0.0.0:5000/, hopefully you will see a working, albeit, very simple "Bulletin Board" application.

The app starts off with no posts. However, you can create a couple by filling in the *Create Post* form. If you interrupt the app, the data will still be there when you restart.

After you input a comment, a *Clear Posts* button should pop up. You can reset the comments you've entered by clicking that button.

## The Attack

Okay. Let's say you are acting on behalf of an unscrupulous student consulting club, and in order to solicit more members, you want to force everyone who visits the site to see an announcement.

Let's say you know that the inputs for creating a post (*Name* and *Comment*) are not sanitized.

<details>
<summary>What might you submit as a comment to fire an alert that will pop up every time the webpage is loaded?</summary>
<br>
Something like the following should do the trick:
`<script>alert("Hello there!! You must check out my club!!")</script>`
The reason submitting such JavaScript code works is because the input values are not sanitized.
</details>

## Explanation

So what's going on? After a user submits input, this is what's happening step by step:
1. Line 37 of `index.html`: When a comment is submitted, the *name* and *comment* inputs are sent to the `comment` endpoint.
2. Line 41-44 of `app.py`: This is where the inpt values are fed into the database. It's clear that the inputs are not checked for scripting before being stored.
3. Line 22 of `index.html`: When the index page is rerendered, the comments are printed to the webpage. Just fyi, the `safe` filter explicitly marks a string as *safe*, which indicates the string sholdn't be automatically escape (without it, our XSS attack wouldn't work!)

## Defenses

The three primary ways to prevent XSS all involve sanitizing the input or interpretting in a manner that prevents suspicious characters from being rendered.
* Escape: Ensure received data is "secure" before rendering it; "secure" means devoid of key characters (i.e. <, >).
* Validating Input: Use an allow or block list to check whether inputs abide by a certain value (i.e. use Regex Patterns!)
* Sanitize: Scrub your database of illegal characters from time to time!

## Credit
* OWASP [Definition](https://owasp.org/www-community/attacks/xss/)
* HackUCF [Demo](https://github.com/HackUCF/xss-demo) by Mark Ignacio
