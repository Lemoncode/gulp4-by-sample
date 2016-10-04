var gulp = require('gulp'),
    connect = require('gulp-connect'),
    del = require('del'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    htmlreplace = require('gulp-html-replace');

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
  return gulp.src('./src/**/*')
             .pipe(gulp.dest('./dist'));
});

gulp.task('generate-prod-html', function() {
  return gulp.src('./src/index.html')
             .pipe(htmlreplace({
               'js': '<script src="app.min.js"></script>'
             }))
             .pipe(gulp.dest('./dist'));
});

gulp.task('build-dev', gulp.series('clean', 'copy-dev'));

gulp.task('create-bundle', function() {
  return gulp.src('./src/**/*.js')
             .pipe(concat('app.min.js'))
             .pipe(gulp.dest('dist'))
             .pipe(uglify())
             .pipe(gulp.dest('dist'));
});

gulp.task('build-prod', gulp.series('clean', gulp.parallel('generate-prod-html', 'create-bundle')));

gulp.task('web', gulp.series('connect'));
gulp.task('default', gulp.series('web'));
