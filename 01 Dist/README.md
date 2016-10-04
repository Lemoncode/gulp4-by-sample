# 01 Dist

This sample takes as starting point _00 Connect_.

In this sample we are going to create a distribution folder where we are going
to place the result of the grunt build folder, then we are to configure our
dev server to point to that distribution folder.

Summary steps:

- Create a _dist_ folder.
- Add a vanilla code to clean folders (detailed recipe)[https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md].
- Create task called _build-dev_ that will make use of the the plugin to copy the html to dist, this task:
    - Will first clean the _dist_ folder content.
    - Then will copy all the needed files to that folder (for the copy operation we don't need any plugin, more info in this
    (link)[http://ilikekillnerds.com/2014/07/copying-files-from-one-folder-to-another-in-gulp-js/].
- Change where connect is pointing and configure root as _dist_.
- Create a simple js file called _calculator.js_ add a simple sum function.
- Create a simple js file called main.js_ this file will make use of sum function.
- Reference both files in the HTML via _script_ tags.
- Extend the copy task to copy as well the js.
- Test that everything is working as expected.

# Steps to build it

##Prerequisites

Same as on _00 Connect_ sample.

##Steps

- Create a _dist_ folder

```
+-- dist
+-- src
| +-- main.html
+-- gulpfile.js
+-- package.json
```

- Install a plugin to clean folders.

```
npm install del --save-dev
```

 - Let's required the installed plugins / packages in our gulp file.

```javascript
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    del = require('del');

...
```

- Let's code a clean task:

```
gulp.task('clean', function() {
  return del([
      'dist/**/*'
    ]);
});
```

- Let's do a quick test, we are going to add some test file to the _dist_ folder
then let's run _clean

```
gulp clean
```

- Let's code a copy task (as a prerequisite it will call the clean task)

```javascript
gulp.task('copy-dev', function() {
    return   gulp.src('./src/**/*')
               .pipe(gulp.dest('./dist')
             );
});
```

- And let's define a _build-dev_ task that will sequentially execute clean and then copy-dev

```javascript
gulp.task('build-dev', gulp.series('clean', 'copy-dev'));
```

- Now let's give a try and check if it's copying what we expected (from the command prompt)

```
gulp build-dev
```

- Now it's time to update the where our dev server is pointing (change to dist) _dist_.

```javascript
gulp.task('connect', function() {
  connect.server({
      root: 'dist'
  });
});
```

- Let's test the new settings, let's type from the command prompt:

```
gulp build-dev
```

and check under dist the index.html file has been copied.

```
gulp web
```


 - It's time to play with some javascript, let's add a simple _calculator.js_ file under src

 ```javascript
 function mySum(a, b) {
   return a + b;   
 }
 ```

 - Now let's add an _main.js_ file that will make use of the previously created filed (_calculator_)

 ```javascript
 var result = mySum(2, 4);
 document.write(" sum result:" + result);
 ```

 - Let's reference both files in the main HTML

```HTML
...
<script src="./calculator.js"></script>
<script src="./main.js"></script>
</html>
```


 - Test that everything is working as expected.

 ```
 grunt build-dev
 ```

 ```
 grunt web
 ```
