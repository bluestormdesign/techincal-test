'use strict';

// what we be needing?
var gulp            = require('gulp'),
    concat          = require('gulp-concat-util'),
    uglify          = require('gulp-uglify'),
    minify          = require('gulp-minify-css'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    hashsum         = require('gulp-hashsum'),
    watch           = require('gulp-watch'),
    connect         = require('gulp-connect'),
    os              = require('os'),
    gutil           = require('gulp-util'),
    plumber         = require('gulp-plumber'),
    babel           = require('gulp-babel'),
    postcss         = require('gulp-postcss'),
    autoprefixer    = require('autoprefixer'),
    sri             = require('gulp-sri');


// app.js components
var appJsComponents = [
    'resources/js/app-components/app-component.js',
    'resources/js/app-components/contact-form.js',
    'resources/js/app-components/bm-twentytwenty.js',
    'resources/js/app-components/cookie-consent.js',
    'resources/js/app-components/mobile-menu.js',
    'resources/js/app-components/object-fit-ie-fix.js',
    'resources/js/app-components/password-update.js',
    'resources/js/app-components/scroll-to.js',
    'resources/js/app-components/scrollbar.js',
    'resources/js/app-components/typeahead.js',
    'resources/js/app-components/bm-general.js',
    'resources/js/app-components/bm-recipe-search.js',
    'resources/js/app-components/bm-news-and-trends.js',
    'resources/js/app-components/bm-case-studies.js',
    'resources/js/app-components/bm-news-and-trends-mobile.js',
    'resources/js/app-components/bm-case-studies-mobile.js',
    'resources/js/app-components/bm-categories-menu.js',
    'resources/js/app-components/bm-parallax.js',
    'resources/js/app-components/bm-animation.js',
    'resources/js/app-components/bm-sticky-image.js',
    'resources/js/app-components/bm-owlcarousel.js',
];

// js vendor libraries and compiled app.js
var scripts = [
    'web/assets/src/js/vendor/jquery-3.3.1.min.js',
    'web/assets/src/js/vendor/ofi.js',
    'web/assets/src/js/vendor/tether.min.js',
    'web/assets/src/js/vendor/popper.min.js',
    'web/assets/src/js/vendor/bootstrap.min.js',
    'web/assets/src/js/vendor/bloodhound.js',
    'web/assets/src/js/vendor/typeahead.jquery.js',
    'web/assets/src/js/vendor/owl.carousel.min.js',
    'web/assets/src/js/vendor/jquery.mousewheel.min.js',
    'web/assets/src/js/vendor/jquery.mmenu.all.min.js',
    'web/assets/src/js/vendor/jquery.mmenu.offcanvas.min.js',
    'web/assets/src/js/vendor/jquery.mCustomScrollbar.min.js',
    'web/assets/src/js/vendor/jquery.event.move.js',
    'web/assets/src/js/vendor/jquery.twentytwenty.js',
    'web/assets/src/js/vendor/jquery.paroller.min.js',
    'web/assets/src/js/vendor/jquery.sticky-kit.min.js',
    'web/assets/src/js/app.js'
];

// css vendor libraries and compiled style.css stylesheet
var stylesheets = [
    'web/assets/src/css/vendor/normalize.css',
    'web/assets/src/css/vendor/bootstrap.css',
    'web/assets/src/css/vendor/animate.css',
    'web/assets/src/css/vendor/font-awesome.min.css',
    'web/assets/src/css/vendor/hamburgers.min.css',
    'web/assets/src/css/vendor/jquery.mCustomScrollbar.css',
    'web/assets/src/css/vendor/jquery.mmenu.all.css',
    'web/assets/src/css/vendor/jquery.mmenu.offcanvas.css',
    'web/assets/src/css/vendor/jquery.mmenu.positioning.css',
    'web/assets/src/css/vendor/jquery.mmenu.fullscreen.css',
    'web/assets/src/css/vendor/owl.carousel.css',
    'web/assets/src/css/vendor/typeahead.css',
    'web/assets/src/css/vendor/twentytwenty.css',
    'web/assets/src/css/app.css'
];

// build our app.js file from our modular components
gulp.task('build-app-js', function() {
    return gulp.src(appJsComponents, {base: 'js/'})
        .pipe(concat('app.js'))
        .pipe(concat.header('$(function() {\n\n'))
        .pipe(concat.footer('\n});\n'))
        .pipe(babel({presets: ['es2015']}))

        .pipe(plumber(function (error) {
            gutil.log(error.message);
            gutil.log(gutil.colors.red('[Error]'), error.toString());
            this.emit('end');
        }))
        .pipe(gulp.dest('web/assets/src/js/'));
});

// concat and uglify our vendor libraries and app.js into a global site script, then rev it up
gulp.task('js', ['build-app-js'], function() {
    return gulp.src(scripts, {base: 'js/'})
        .pipe(plumber(function (error) {
            gutil.log(error.message);
            gutil.log(gutil.colors.red('[Error]'), error.toString());
            this.emit('end');
        }))
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(hashsum({json: true, filename: './resources/manifest/scripts.min.hash.json'}))
        .pipe(gulp.dest('./web/assets/dist/js/'))
        .pipe(sri())
        .pipe(gulp.dest('web/assets/dist/'))
        .pipe(connect.reload());
});

// if we're running the css process, we don't need to reky on any pre-tasks
var sassPreTasks = (typeof process.argv[2] == 'string' && ((process.argv[2] == 'css') || (process.argv[2] == 'watch'))) ? [] : ['js'];

// compile our sass into a stylesheet
gulp.task('sass', sassPreTasks, function() {
    return gulp.src('./resources/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./web/assets/src/css'));
});

// minify our stylesheet and rev it up
gulp.task('css', ['sass'], function() {
    return gulp.src(stylesheets, {base: 'web/assets/src/css'})
        .pipe(postcss([
            autoprefixer({
                browsers: ['last 2 versions']
            })
        ]))
        .pipe(concat('stylesheets.min.css'))
        .pipe(minify())
        .pipe(hashsum({json: true, filename: './resources/manifest/stylesheets.min.hash.json'}))
        .pipe(gulp.dest('web/assets/dist/css/'))
        .pipe(sri())
        .pipe(gulp.dest('web/assets/dist/'))
        .pipe(connect.reload());
});

// sass watcher with livereload for localhost (loca development)
gulp.task('watch', function () {

    var ifs = os.networkInterfaces(),
        ipAddress = Object.keys(ifs)
                          .map(x => ifs[x].filter(x => x.family === 'IPv4' && !x.internal)[0])
                          .filter(x => x)[0].address;

    connect.server({
        livereload: {
            enable: true,
            port: process.env.LIVERELOAD_LISTENER_PORT
        },
        port: process.env.LIVERELOAD_SERVER_PORT,
        https: true,
        host: ipAddress
    });

    gulp.watch('./resources/scss/**/*.scss', ['css']);
    gulp.watch('./resources/js/app-components/*.js', ['js']);
});

// define our default, dev and production tasks
gulp.task('default', ['js', 'css']);
