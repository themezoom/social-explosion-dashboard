var gulp = require('gulp'),
    concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./app/js/*.js','./app/js/**/*.js'])
    .pipe(concat('concat.js'))
    .pipe(gp_rename('js/scripts.js'))
    .pipe(gp_uglify())
    .pipe(gulp.dest('release'));
});

// JS concat, strip debugging and minify
gulp.task('css', function() {
  gulp.src(['./app/css/*.css'])
    .pipe(concat('concat.css'))
    .pipe(gp_rename('css/styles.css'))
    .pipe(gulp.dest('release'));
});
