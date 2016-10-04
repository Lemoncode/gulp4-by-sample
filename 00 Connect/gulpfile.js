var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: 'src'
  });
});

gulp.task('web', gulp.series('connect'));
gulp.task('default', gulp.series('connect'));
