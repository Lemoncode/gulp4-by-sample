var gulp = require('gulp'),
    connect = require('gulp-connect'),
    del = require('del');

gulp.task('connect', function() {
    connect.server({
        root: 'dist'
    });
});

gulp.task('clean', function() {
  return del([
      'dist/**/*'
    ]);
});

gulp.task('copy-dev', function() {
    return   gulp.src('./src/**/*')
               .pipe(gulp.dest('./dist')
             );
});

gulp.task('build-dev', gulp.series('clean', 'copy-dev'));
gulp.task('web', gulp.series('connect'));
gulp.task('default', gulp.series('web'));
