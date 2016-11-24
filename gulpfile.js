'use strict';

const gulp          = require('gulp');

const browserSync   = require('browser-sync');
const watch         = require('gulp-watch');

const sass          = require('gulp-sass');
const postcss       = require('gulp-postcss');

const autoprefixer  = require('autoprefixer');

const babelify      = require('babelify');
const browserify    = require("browserify");
const source        = require("vinyl-source-stream");

const cssmin        = require('gulp-cssmin');
const rename        = require('gulp-rename');




//default task
gulp.task('default', ['watch']);

// css task's
gulp.task('sass', () => {
    gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe( postcss([
            autoprefixer({
                browsers: ['last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
            })
        ]))
        .pipe(gulp.dest('public/css'));
});

//watch task & browser-sync
gulp.task('sass-watch', ['sass'], () => {
    setTimeout(() => {
        browserSync.reload;
    }, 200);
});

//babel
gulp.task("build", () => {
    return browserify({
        entries: ["./src/js/script.js"]
    })
    .transform(babelify.configure({
        presets : ["es2015"]
    }))
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./public/js"))
});

gulp.task('watch',['sass', 'build'], () => {
    browserSync({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./*html', browserSync.reload);
    gulp.watch('./public/css/*.css');
    gulp.watch('./src/scss/*.scss', ['sass-watch']);
    gulp.watch('./src/js/*.js', ['build']);
});