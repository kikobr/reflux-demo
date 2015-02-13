// Include gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    react = require('gulp-react');

// Lint task
gulp.task('lint', function(){
    return gulp.src('src/**/*.js')
        .pipe(react())
        .pipe(jshint())
        .pipe(jshint.reporter('default', { verbose: true }));
});

// Compile Sass
gulp.task('sass', function(){
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

// Watch files for changes
gulp.task('watch', function(){
    gulp.watch('src/**/*.js', ['lint', 'browserify']);
    gulp.watch('scss/*.scss', ['sass']);
});


// -----------------------------------------------------------
// Browserify + watchify enhanced!
// -----------------------------------------------------------

var bundler = watchify(browserify('./src/index.js', watchify.args));
// add any other browserify options or transforms here
bundler.transform('reactify');

gulp.task('browserify', bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler

function bundle() {
    return bundler.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        // optional, remove if you dont want sourcemaps
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        .pipe(sourcemaps.write('./')) // writes .map file
        //
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('./dist'));
}

gulp.task('build', function(){
    return gulp.src('dist/bundle.min.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// Default
gulp.task('default', ['lint', 'sass', 'browserify', 'watch']);
