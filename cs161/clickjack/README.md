# Clickjacking Demo

We've all likely encountered some form of clickjacking online, whether it's from visiting our favorite third party streaming websites or downloading PDFs from [www.fR3eT3xt800ks.com](https://www.youtube.com/watch?v=dQw4w9WgXcQ). While simplistic in implementation, it remains a nifty, effective technique to get unintended clicks to perform unwanted actions. Clickjacking is one of a suite of security vulnerabilities under the *UI attacks* category. Unlike phishing where attackers may create a malicious facsimile of a real site from scratch, clickjacking requires much less effort because of how it can "adopt" an existing webpage's appearance. Grabbing existing code from webpages to mimic elements is even easier thanks to tools like `inspect element` in browsers.

This demo is a very barebones, front end oriented example that captures the basic essence of how clickjacking works. The included clickjack "attack" is not malicious, in that running this exploit locally won't do anything bad to your computer (I promise!).

## App Overview
* `index.html`: The "victim" webpage that the clickjacking site attempts to mimic
* `clickjack.html`: The malicious webpage. It mimics `index.html` with an `iframe` reference, then lays its own elements on top of it.
* `style.css`: CSS styling, no need to look here.

## Exercise
From command prompt, `cd` into this directory, then type `open index.html`. You should see a mock banking login. There are two interactive elemens to pay attention to:
1. The **LOGIN** button. If clicked, you should see a `flash` message saying "You have been logged in!"".
2. The *Request a referral at this* **link** button. If clicked, a `flash` message with "You would be forwarded to a referral form!" shows.

Now, type `open clickjack.html` in the command prompt. For our intent and purposes, the webpage should look identical! However, click on the either the **LOGIN** button or referral **link**, and you'll see different flash messages pop up. This is clickjacking at work.

## Explanation
So what happened? The `iframe` tag is an indispensable facet of clickjacking attacks. By simply creating an `iframe` that references the page it'd like to imitate + basic CSS styling, we can create a visual replica that's indiscernable from the original page. This is on line 27 in `clickjack.html` + some extra styling so the `iframe` covers the entire page.

Once the `iframe` is in place, we can add our own misdirections with transparent UI elements. In `clickjack.html`, both login and referral buttons are covered by identical-looking UI elements, but with the original links + functions swapped out with malicious methods instead. Lines 28-47 contains the code behind this. You can see, it's nearly identical to the `index.html` code, but with the `onclick` functions replaced. If you'd like the overlay to be more apparent, uncomment lines 18 and 19 for highlighting of the overlay.

## Defenses
Thankfully, there is a readily available armament of defenses for thwarting clickjacking attempts. Some of the weaker defenses involve blocking pages from being opened in a frame (a.k.a. `framebusting`). Place the following code snippet somewhere within the `script` tag in `index.html`:

```
if (top != window) {
    top.location = window.location;
}
```

Now, if you open `clickjack.html` again, the button should no longer be working! Like before, try clicking anywhere on the page. The malicious `flash` message shouldn't show up.

The problem with defenses like these is that they rely on JavaScript elements. In general, these measures often have counters that nullify the anti-clickjacking effect.

The most popular remedy to clickjacking is the `X-Frame-Options` header, which has the following 2 options:
* `DENY`: Never show page inside a frame
* `SAMEORIGIN`: `iframe` allowed if parent document is from same origin
* `ALLOW-FROM <domain>` (deprecated): `iframe` allowed if parent document is from given domain

This option must be included in the configurations corresponding to your web app. Read the [docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options#Examples) for a more thorough explanation.

## Credit
* [Javascript.info](https://javascript.info/clickjacking) - Inspiration for this tutorial!
