# 00 Connect

In this sample we are going to create a simple HTML page, then install all the gulp plumbing up and running and configure gulp
to start a lite dev web server on request.

Summary steps:

- Create a simple HTML file.
- Init the npm package.
- Install gulp-cli globally.
- Install grunt plugin to fire lite web server (connect).
- Configure an empty grunt config file.
- Define dev web server launch task.
- Run dev web server launch.
- Let's setup web server launch as default task.

# Steps to build it

##Prerequisites

Install Node.js and npm (v6.7.0) if they are not already installed on your computer.

> Verify that you are running at least node v6.x.x and npm 3.x.x by running `node -v` and `npm -v` in a terminal/console window. Older versions may produce errors.

##Steps

- Navigate to the folder where you are going to create the empty
project.

- Create a subfolder called _src_

- Under that folder create a file called _index.html_ the content of this file will
be:

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
- Move back to your project root folder

- Open the console and type the following command

```
npm init
```

- Full fill the requested info (do not forget, project name should not contain white spaces and must be lowercase, most of the info can be fullfilled with default values just by pressing enter).

- Let's install _gulp-cli_ globally (command interface), if you had a previous version installed
[Updating to gulp 4](https://www.liquidlight.co.uk/blog/article/how-do-i-update-to-gulp-4/)

```
npm install gulpjs/gulp-cli -g
```

- Let's install gulp locally and save it as a dev dependecny.

```
npm install gulpjs/gulp#4.0 --save-dev
```

Let's check that gulp-cli plus gulp has been successfully installed

```
gulp -v
```

It should prompt you two output lines (gulp-cli version plus gulp version).

> More info about this initial setup: [How to install Gulp 4 before it's officially released](https://demisx.github.io/gulp4/2015/01/15/install-gulp4.html)

- Now we are going to install a Gulp plugin that is able to
start a lite dev web server, we will save it to our package.json
as a dev dependency.

```
npm install gulp-connect --save-dev
```

- Configure an empty gulp config file, from our root folder we
will create a file called gulpfile.js_.

_You should end up with the following folder tree structure:

```
+-- src
| +-- index.html
+-- gulpfile.js
+-- package.json
```

- Initial content of this file:

```javascript
var gulp = require('gulp');
```

- Define dev web server launch task:

    - (I) Require the plugin.

```javascript
var gulp = require('gulp'),
    connect = require('gulp-connect');
...
```
    - (II) Configure the task.

```javascript
gulp.task('connect', function() {
  connect.server({
      root: 'dist'
  });
});
```
    - (III) Register the task and give it a name to be able to launch it form the command prompt (here we use series, to indicate
    that if in the future we have more than one task the will be executed sequentially).

```javascript
...
gulp.task('default', gulp.series('connect'));
};
```

- Run dev web server launch.

```
gulp web
```

- Since this is something we are going to use quite often, we
can set it up as a default task (let's open gruntfile.js).

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

- Just to recap your grunt file should look something like:

```javascript
module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
        server: {
          options: {
            hostname: 'localhost',
            port: 8080,
            keepalive:true,
            base: 'src',
            directory: 'src',            
            open: {
              target: 'http://localhost:8080/index.html'
            }
          }
        }
     },
  });

  grunt.registerTask('default', ['web']);

  grunt.registerTask('web', ['connect']);

  grunt.loadNpmTasks('grunt-contrib-connect');
};
```
