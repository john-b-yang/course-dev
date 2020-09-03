# Stored XSS Demo

Cross Site Scripting (XSS) is a vulnerability typically found in web applications with a host of possible exploits. There are 2 specific exploits discussed in CS 161: Stored and Reflected XSS attacks. Reflected XSS attacks are usually a product of code injection through HTTP query parameters that are not sanitized by server side scripts before being used.

Stored XSS (persistent) is the arguably more devastating of the two. Generally, this is when unsanitized data from an attacker is saved to, then provided by a server on pages that other users may browse. Carefully written scripts can solicit or parse confidential information, or even worse, run unauthorized code with the permissions of another user.

This demo is a simple web app with Flask routing that saves and posts unsanitized user input. With a simplistic set up process that takes seconds, you can experiment writing malicious scripts and see what tricks you can carry out!

## App Overview



## Example Script

TBD

## Explanation

TBD

## Defenses

TBD

## Credit

TBD
