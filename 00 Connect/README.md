# 00 Connect

In this sample we are going to create a simple HTML page, then install all the _gulp_ plumbing up and running and configure _gulp_
to start a lite dev web server on request.

Summary steps:

- Create a simple HTML file.
- Init the _npm_ package.
- Install _gulp-cli_ globally.
- Install _gulp_ plugin to fire lite web server ([_connect_](https://github.com/avevlad/gulp-connect)).
- Configure an empty _gulp_ config file.
- Define a dev web server launch task.
- Run dev web server task.
- Set up web server task to be the default.

# Steps to build it

## Prerequisites

Install [Node.js (>= 6.7.0) and npm](https://nodejs.org/) if they are not already installed on your computer.

> Verify that you are running at least node >= v6.7.0 and npm >= 3.10.8 by running `node -v` and `npm -v` in a terminal / console window. Older versions may produce errors.

## Steps

- Navigate to the folder where you are going to create the empty project.

- Create a subfolder called _src_.

- Under that folder create a file called _index.html_. The content of this file will be:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <h1>Hello Gulp !</h1>
  </body>
</html>
```
- Now open the console, move to your project root folder and type the following command:

```
npm init
```

- Full fill the requested info (do not forget, project name should not contain white spaces and must be lowercase, most of the info can be fullfilled with default values just by pressing enter).

- Let's install [_gulp-cli_](https://github.com/gulpjs/gulp-cli) globally (command line interface for _gulp_). If you had a previous version installed you must reinstall it
(see this article [Updating to gulp 4](https://www.liquidlight.co.uk/blog/article/how-do-i-update-to-gulp-4/) for more info).

```
npm install gulpjs/gulp-cli -g
```

- Let's install _gulp_ locally and save it as a dev dependency.

```
npm install gulpjs/gulp#4.0 --save-dev
```

Let's check that gulp-cli plus gulp has been successfully installed

```
gulp -v
```

It should prompt you two output lines (gulp-cli version plus gulp version).

> More info about this initial setup: [How to install Gulp 4 before it's officially released](https://demisx.github.io/gulp4/2015/01/15/install-gulp4.html).

- Now we are going to install a _Gulp_ plugin that is able to
start a lite dev web server, we will save it to our package.json
as a dev dependency.

```
npm install gulp-connect --save-dev
```

- Let's create the gulp config file. From our project root folder we
will create an empty file called _gulpfile.js_. You should end up with the next following folder tree structure:

```
.
├─ src/
│  └─ index.html
│
├─ gulpfile.js
└─ package.json
```

- Let's configure _gulp_ by importing it in the _gulpfile.js_:

```javascript
var gulp = require('gulp');
```

- Define dev web server launch task:

  - (I) Require the _connect_ plugin.

  ```javascript
  var gulp = require('gulp'),
      connect = require('gulp-connect');
  ...
  ```

  - (II) Configure the web task.

  ```javascript
  gulp.task('connect', function() {
    connect.server({
        root: 'src'
    });
  });
  ```

    - (III) Register the task and give it a name to be able to launch it form the command prompt (here we use series, to indicate
    that if in the future we have more than one task the will be executed sequentially).

    ```javascript
    ...
    gulp.task('default', gulp.series('connect'));
    ```

- Run dev web server launch by typing:

```
gulp web
```

- Since this is something we are going to use quite often, we
can set it up as a default task:

```javascript
...
gulp.task('web', gulp.series('connect'));
gulp.task('default', gulp.series('web'));
```

- We can now just run _gulp_ from the command prompt, with no
extra params and it will launch the dev server.

```
gulp
```

- Finally just to recap your _gulp_ file should look something like:

```javascript
var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'src'
  });
});

gulp.task('web', gulp.series('connect'));
gulp.task('default', gulp.series('web'));

```
