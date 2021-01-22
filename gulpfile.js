const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    purgecss = require('gulp-purgecss'),
    browserSync = require('browser-sync').create();

function css() {
    return gulp.src('./src/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename(function (path) {
            path.extname = ".min.css";
        }))
        .pipe(
            purgecss({
                content: ['*.html']
            })
        )
        .pipe(gulp.dest('./assets/css/'))
        .pipe(browserSync.stream());
}

function serve() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
}

gulp.watch('./src/*.scss', css);

exports.default = gulp.parallel(css, serve);