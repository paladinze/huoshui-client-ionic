var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sh = require('shelljs');
var gulpif = require('gulp-if');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var useref = require('gulp-useref');


var paths = {
  sass: ['./scss/**/*.scss'],
};



gulp.task('default', ['sass', 'templatecache', 'useref', 'moveImages',
  'moveFonts'
]);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

//generate ./www/js/templates/templates.js
gulp.task('templatecache', ['sass'], function(done) {
  gulp.src('./www/templates/**/*.html')
    .pipe(templateCache({
      standalone: true
    }))
    .pipe(gulp.dest('./www/js/templates'))
    .on('end', done);
});

//reanotate angular js files
gulp.task('ng_annotate', ['sass', 'templatecache'], function(done) {
  gulp.src('./www/js/**/*.js')
    .pipe(ngAnnotate({
      single_quotes: true
    }))
    .pipe(gulp.dest('./www/dist/js'))
    .on('end', done);
});

//generate aggregated index.html and js and css bundles
gulp.task('useref', ['sass', 'templatecache'], function(done) {
  gulp.src('./www/*.html')
    .pipe(useref())
    //.pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest('./www/dist'))
    .on('end', done);
});

//move imgs to dist
gulp.task('moveImages', function(done) {
  gulp.src('./www/img/*')
    .pipe(gulp.dest('./www/dist/img'));
  gulp.src('./www/*.ico')
    .pipe(gulp.dest('./www/dist'))
    .on('end', done);
});

//move imgs to dist
gulp.task('moveFonts', function(done) {
  gulp.src('./www/fonts/**/*')
    .pipe(gulp.dest('./www/dist/fonts'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan(
        'http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan(
        'gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
