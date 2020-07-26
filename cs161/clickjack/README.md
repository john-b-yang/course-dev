# Clickjacking Demo

We've all likely encountered some form of clickjacking online, whether it's from visiting our favorite third party streaming websites or downloading PDFs from [www.fR3eT3xt800ks.com](https://www.youtube.com/watch?v=dQw4w9WgXcQ). While simplistic in implementation, it remains a nifty, effective technique to get unintended clicks to perform unwanted actions. Clickjacking is one of a suite of security vulnerabilities under the *UI attacks* category. Unlike phishing where attackers may create a malicious facsimile of a real site from scratch, clickjacking requires much less effort.

This demo is a very barebones example that captures the basic essence of how clickjacking works. The included clickjack "attack" is 1. not malicious and 2. "coarse". By not malicious, I mean running this exploit locally won't do anything bad to your computer (I promise!). By "coarse", I mean that clickjack overlay is not very fine-grained. Attacks of this archetype with more malicious intents tend to have much more elaborate CSS to mimic the victim website.

## App Overview
* `index.html`: The "victim" webpage that the clickjacking site attempts to mimic
* `clickjack.html`: The malicious webpage. It mimics `index.html` with an `iframe` reference, then lays a transparent button on top of it.
* `style.css`: CSS styling, no need to look here

## Exercise
From command prompt, `cd` into this directory, then type `open index.html`. Observe that a `flash` message saying `You have been logged in!` should be displayed under normal circumstances.

Now, type `open clickjack.html` in the command prompt. For our intent and purposes, the webpage should look identical! However, click anywhere on the screen and you might observe that a different `flash` message, `Uh oh, you've been clickjacked!`, pops up instead.

## Explanation
So what happened? The `iframe` tag is an indispensable facet of clickjacking attacks. By simply creating an `iframe` that references the page it'd like to imitate + basic CSS styling, we can create a visual replica that's indiscernable from the original page.

Once the `iframe` is in place, we can add our own misdirections with transparent UI elements. In the `clickjack.html` file, a `button` element covers the entire screen. This is a very crude version of clickjacking. Imagine if the username + password entries and login button were covered by identical tags. An unaware user could be submitting their information in a couple seconds without any qualms.

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
