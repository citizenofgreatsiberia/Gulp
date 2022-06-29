const { src, dest, watch, series, parallel } = require('gulp');

const dartSass = require('sass');
const gulpSass = require('gulp-sass');
const sass = gulpSass(dartSass);

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browsersync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const groupMedia = require('gulp-group-css-media-queries');
const include = require('gulp-file-include');

const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/'
    },
    html: {
        src: 'src/*.html',
        dest: 'dist/'
    },
    fonts: {
        src: 'src/fonts/*.ttf',
        dest: 'dist/fonts/',
    },
    img: {
        src: 'src/img/**/*.{jpeg,jpg,png,svg,gif,ico,webp}',
        dest: 'dist/img/',
    }
};

function browserSync() {
    browsersync.init({
        server: {
            baseDir: paths.html.dest
        },
        port: 3000,
        // notify: false
    })
}

function html() {
    return src(paths.html.src)
        .pipe(include())
        .pipe(dest(paths.html.dest))
        .pipe(browsersync.stream())
}

function clean() {
    return del(['dist']);
}

function styles() {
    return src(paths.styles.src)
        .pipe(sass())
        .pipe(groupMedia())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: true,
        }))
        .pipe(dest(paths.styles.dest))
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'style',
            suffix: '.min'
        }))
        .pipe(dest(paths.styles.dest))
        .pipe(browsersync.stream())
}

function scripts() {
    return src(paths.scripts.src, { sourcemaps: true })
        .pipe(include())
        .pipe(babel())
        .pipe(dest(paths.scripts.dest))
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(dest(paths.scripts.dest))
        .pipe(browsersync.stream())
}

function images() {
    return src(paths.img.src)
        .pipe(dest(paths.img.dest))
        .pipe(browsersync.stream())
}

function watchFiles() {
    watch([paths.scripts.src], scripts);
    watch([paths.styles.src], styles);
    watch([paths.html.src], html);
    watch([paths.img.src], images);
}

const build = series(clean, parallel(styles, scripts, browserSync, html, watchFiles, images));

exports.images = images;
exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.watchFiles = watchFiles;
exports.build = build;

exports.default = build;