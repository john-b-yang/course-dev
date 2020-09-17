# Command Injection Demo

The range of attacks that fit under command injection is broad and varied in form. The core vulnerability behind command injection is that an attacker is capable of executing shell commands with elevated privileges on a host OS through a vulnerable application. Typically, a program supplies unsanitized, user fed values as arguments to a `system` call. Without input validation, it's easy for attackers to formulate attacks with the entire disposal of shell commands, leading to a whole spectrum of exploits with tremendously malicious capabilities.

## Set Up `cat` Wrapper Code
1. Fork this repository and `cd` into this directory (`…/course-dev/cs161/cmd-injection/`)
2. Run `gcc -o cat-inject cat-inject.c`. This should generate an executable called `cat-inject`.
3. Run `./cat-inject <file>`, where file is any filename (i.e. `test.txt`). The expected behavior is identical to the `cat` command - the file contents are printed out.

## App Overview
* `cat-inject.c`: The vulnerable application, written in C, with a `system` call that includes user input.
* `test.txt`: A dummy text file to verify `./cat-inject`'s behavior + be exploited!

## The Attack
The `cat-inject.c` code is hopefully easy to wrap your head around. It is essentially just a wrapper around the [cat](http://www.linfo.org/cat.html) command.

The problem with this code, as mentioned above, is that user inputs (via the `command` variable) are fed into a `system` call (line 18) without being sanitized. Consequently, similar to SQL Injection, an attacker can inject additional shell code by simply terminating the `cat` command with a `;`, then write as many additional lines as necessary for numerous kinds of exploits.

Here are just a couple:
* `test.txt; rm -rf *;`: Removes everything in the current directory. The `*` character can be altered to point at any path in the system that `./cat-inject` is being run in.
* `test.txt; id;` Prints the system's user and group names + numeric IDs, useful for retrieving permissions to mimic.
* All on one line:
  ```
  test.txt;
  touch exploit.c;
  echo '<exploit code>' > exploit.c;
  gcc -o exploit exploit.c;
  ./exploit;
  ```
  The `;` characters allows us to write multiline attacks. In this case, we can use command injection to facilitate code injection and execution.

Can you come up with some of your own?

**Note**: This example is relatively harmless since you are running the exploit on your own system. However, if an application vulnerable to command injection is running on another system, these same commands could be used to wreck unwanted and harmful havoc. For instance, let's say you find out an API that updates a databases based on client requests uses system calls with user input to perform DB queries. Passing in malicious input like the `rm -rf *` example above would clear out an entire DB.

## Defenses
Command injeciton vulnerabilities tend to be borne out of bad coding practices. The primary defenses would be to:
1. Avoid direct system calls entirely. Builtin library functions or vetted third party modules are much better options to perform certain actions rather than shell code.
2. Input validation + escape user input if system calls are necessary. Similar to the defenses for SQL injection and code injection, parameterization (separating data and commands) or validating input with allow/blocklists + regex expressions would anticipate and drop illegal inputs before they are run. With that said, writing comprehensive input validation that shields against all possible malicious inputs is difficult to do from scratch.
3. Running applications at the lowest privileges needed to accomplish their given tasks (Principle of Least Privilege) could mitigate the amount of harm a system command could do.

## Credits
* Command Injection [Examples](https://owasp.org/www-community/attacks/Command_Injection)
* Command Injection [Defenses](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html)
