# 03 Live Reload

This sample takes as starting point _02 Production_.

In this sample we are going to add a watcher: whenever there's a change on the
js or html a new build-dev will be fired and browser page will get updated.


Summary steps:

- Let's first add _livereload_ support to our _connect_ task
- Let define a watch task (check for any js or html changes).
- Let's add this watch task to the _gulp web_ task.
- Let's create a _force-reload_ tasks to notify the browser to realod the page.
- Let's add this _force-reload_ tasks at the end to the build-dev process.

# Steps to build it

##Prerequisites

Same as on _00 Connect_ sample.

##Steps

- Let's first add _livereload_ support to our _connect_ task

```javascript
gulp.task('connect', function() {
  connect.server({
      root: 'dist',
      livereload: true
  });
});
```

- Let's add a watch task: it will be watching any change on HTML o Js files, in
case it detect a change in any of this files it will launch "buil-dev" task.

```javascript
gulp.task('watch', function() {
  gulp.watch(['./src/**/*.html', './src/**/*.js'], gulp.series('build-dev'))
});
```

- We need to launch this task in parallel whenever we launch our web server (existing web task)

```javascript
gulp.task('web', gulp.parallel('connect', 'watch'));
```

- Now we need the browser to be notified, Let's add a new task called
_force-reload_ that will just notify connect to reload the browser.

```javascript
gulp.task('force-reload', function() {
  return   gulp.src('./src/*.html')
             .pipe(connect.reload());
});
```

- Let's add this task at the end of the _watch_ process

```javascript
gulp.task('watch', function() {
  gulp.watch(['./src/**/*.html', './src/**/*.js'], gulp.series('build-dev', 'force-reload'))
});
```

- Now run _gulp build-dev_ process
```
gulp build-dev
```

- It's time to test it, run _gulp web_, launch the browser, then grab a HTML
or js file, add some change and check that the build process gets launched
and the browser automatically refreshes the page displaying the new updates.

```
gulp web
```
