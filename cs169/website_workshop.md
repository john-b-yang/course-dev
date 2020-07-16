# Personal Website Workshop
Delivered 7/10/2020

### GitHub Pages
We need a website to host the code for our personal website. There's a variety of ways you can do this. The hosting site we will use is GitHub Pages ([link](https://pages.github.com/)). The link contains directions for how to set up the repository.

Here's a rundown on A. setting up the repository and B. pushing some starter code to the repository. Replace `<username>` with your GitHub account profile.

1. Create a GitHub account
2. Under your GitHub account, create a repository named `<username>.github.io`.
3. From the empty repository page, copy the github URL next to "Clone with HTTPS".
4. Open the Terminal / Command Line. `cd` into a directory you'd like to store the website code in.
5. Type `git clone `, then paste the github URL.
6. `cd` into the newly created folder, then create a `index.html` file
7. Paste the following code into `index.html`.

```
<html>
  <head>
  </head>
  <body>
    <h1>Hello, world!<h1>
  </body>
</html>
```

8. Commit + Push the code (i.e. `git add/commit/push`)
9. Now, in your browser, navigate to `<username>.github.io`. You should see a single `Hello, world!` and nothing else. Congrats! You have deployed your website successfully!

### Spicing Things Up
Developing your own website from scratch is a great learning experience, and there are plenty of tutorials out there that help you develop a beautiful landing page. However, it can be a tedious process, so here are some sites with readily available website templates and code that you can copy and commit.

**Website Template Code Sites**: I highly recommend these site for getting started. It has a variety of stunning sites that you can download for free. Some sites I like include [FreebiesBug](https://freebiesbug.com/code-stuff/html-website-templates/), [HTML 5 Up](https://html5up.net/), and [Free CSS](https://www.free-css.com/free-css-templates). HTML 5 Up is the most "personal website" oriented.

When you find a site you like...
1. Click "Free Download" to get a ZIP file of the website code.
2. Open the ZIP file, then copy the contents within the folder into the your website code repositroy. Make sure `index.html` is located at the root of the GitHub repo.
3. To update the website's components to your information, open the code in a text editor.
4. Commit + Push the code (i.e. `git add/commit/push`)
5. Now, in your browser, navigate to `<username>.github.io`. Your website should be updated!

**Fork a Site**: There's a lot of great website templates on GitHub, too! GitHub makes it easy to port this code over by making a "fork" (top right button) of the website, which essentially makes a copy of the repository's current state into your repository. From there, you can edit the repository's name to be `<username>.github.io` so that the code is rendered at your personal URL.
