'use strict';

// Load plugins
const gulp = require('gulp');
const browsersync = require('browser-sync');
const path = require('path');
const del = require('del');
const postcss = require('gulp-postcss');
// const lessImport = require('gulp-less-import');
const less = require('gulp-less');
const sass = require('gulp-sass');
const autoprefixer = require("gulp-autoprefixer");
const csso = require('gulp-csso');
const cssnano = require('gulp-cssnano');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const exec = require('child_process').exec; // это функции самого Node, вызывающие консольные команды.
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');
const newer = require("gulp-newer");
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const inlineSVG = require('postcss-inline-svg');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const include = require('gulp-include');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const debug = require('gulp-debug');
const gulpIf = require('gulp-if');
const argv = require('yargs').argv;
// const clean = require('gulp-clean');

// const paths = {
//     allSrcJs: 'src/scripts/test.js',
//     libDir: 'lib'
// };

const PATH = {
    SRC: {
        PUG: 'src/pages/*.pug',
        LESS: [
            'src/less/template.less',
            // 'src/less/template-new.less',
            'src/less/pages/*.less'
        ],
        SCSS: [
            // 'src/scss/**/*.scss'
            'src/scss/style-pages/*.scss'
        ],
        JS: [
            'src/js/script.js',
            'src/js/js-pages/*.js',
            // 'src/scripts/**/*.js'
        ],
        JS_LIBS: [
            'src/js/js-pages/*.js'
        ],
        IMG: [
            'src/img/**/*.{jpg,jpeg,gif,png,svg}',
            'src/blocks/img/**/*.{jpg,jpeg,gif,png,svg}'
        ],
        SVG: [
            'src/img/svg/**/*.svg'
        ],
        FONTS: 'src/fonts/**'
    },
    BUILD: {
        HTML: 'build/',
        CSS: 'build/css/',
        JS: 'build/js/',
        IMG: 'build/img/',
        SVG: 'build/img/svg',
        FONTS: 'build/fonts/'
    },
    LIBS: {
        CSS: [ // порядок имеет значение!
            // 'node_modules/select2/dist/css/select2.min.css',
            // 'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
            // 'node_modules/ion-rangeslider/css/ion.rangeSlider.skinNice.css',
            // 'src/less/libs/bootstrap-datetimepicker.min.css',
            // 'src/less/libs/tippy.css',
            // 'node_modules/owl.carousel/dist/assets/owl.carousel.min.css'
        ],
        JS_LIBS: [ // порядок имеет значение!
            'node_modules/jquery/dist/jquery.min.js',
            'src/scripts/libs/jquery-ui.min.js',
            'src/scripts/libs/jquery.validate.js',
            'src/scripts/libs/tippy.all.js',
            // 'node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js',
            // 'src/scripts/libs/jquery.mask.min.js',
            // 'src/scripts/libs/moment.min.js',
            'src/scripts/libs/ru.js',
            // 'src/scripts/libs/jquery.fancybox.pack.js',
            'src/scripts/libs/fotorama.min.js',
            'src/scripts/libs/iscroll.js',
            'src/scripts/libs/jquery.scrollbar.js',
            'src/scripts/libs/autosize.min.js',
            'src/scripts/libs/cropper.min.js',
            'src/scripts/libs/skrollr.min.js',
            // 'src/scripts/libs/pie-chart-clusterer-custom.js',
            // 'node_modules/select2/dist/js/select2.full.js',
            // 'node_modules/ion-rangeslider/js/ion.rangeSlider.min.js',
            'src/scripts/libs/bootstrap-without-jquery.js',
            // 'src/scripts/libs/bootstrap-datetimepicker.min.js',
            // 'node_modules/svg4everybody/dist/svg4everybody.min.js',
            // 'node_modules/owl.carousel/dist/owl.carousel.min.js'
        ]
    },
    WATCH: {
        PUG: ['src/pages/*.pug', 'src/blocks/**/*.pug'],
        // LESS: ['src/less/**/*.less', 'src/blocks/**/*.less', 'src/less/pages/*.less'],
        SCSS: ['src/scss/**/*.scss', 'src/blocks/**/*.scss'],
        // JS: ['src/scripts/template.js', 'src/blocks/**/*.js', 'src/scripts/pages/*.js', 'src/scripts/lp-constructor/*.js'],
        JS: [
            // 'src/blocks/**/*.js',
            'src/js/script.js',
            // 'src/js/pages/*.js',
            // 'src/js/**/*.js'
        ],
        SVG: ['src/images/svg/**/*.svg']
    }
};

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: "build/"
        },
        port: 3000
    });
    done();
}

// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean build
function clean() {
    console.log('>>> Очистка папки build');
    return del('build/');
}

/*--------------------------------------------------------------
# HTML
--------------------------------------------------------------*/
function pugHtml() {
  console.log('---------- Обработка Pug');
    return gulp.src(PATH.SRC.PUG)
        .pipe(pug({pretty: true}))
        .on('error', notify.onError(function(err){
            return {
                title: 'PUG',
                message: err.message
            };
        }))
        .pipe(gulp.dest(PATH.BUILD.HTML))
        .pipe(browsersync.stream());
}


/*--------------------------------------------------------------
 # CSS
 --------------------------------------------------------------*/
function taskSass() {
    console.log('>>> Обработка SASS');
    return gulp.src(PATH.SRC.SCSS)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            require('postcss-flexbugs-fixes'),
            require('postcss-inline-svg')
        ]))
        .pipe(autoprefixer({browsers: ['last 10 versions']}))
        .pipe(cssnano())
        .pipe(gulp.dest(PATH.BUILD.CSS))
        .pipe(browsersync.stream());
}

function taskLess() {
    console.log('>>> Обработка LESS');
    return gulp.src(PATH.SRC.LESS)
    // .pipe(sourcemaps.init())
    // .pipe(cached('less'))
    // .pipe(dependents())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        })).on('error', notify.onError(function(err){
            return {
                title: 'LESS',
                message: err.message
            };
        }))
        .pipe(postcss([
            require('postcss-flexbugs-fixes'),
            require('postcss-inline-svg')
        ]))
        .pipe(autoprefixer({browsers: ['last 10 versions']}))
        .pipe(cssnano())
        .pipe(debug({title: 'обработано less файлов'}))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATH.BUILD.CSS))
        .pipe(browsersync.stream());
}



// Lint scripts
// function scriptsLint() {
//     return gulp
//         .src(paths.allSrcJs)
//         .pipe(eslint())
//         .pipe(eslint.format())
//         .pipe(eslint.failAfterError());
// }

// расширенный линтер с фиксацией и флагом --fix в командной строке
// function scriptsLint() {
//     let target = argv.file ? argv.file : paths.allSrcJs;
//     let fixCode = argv.fix ? true : false;
//
//     return gulp.src(target, {base: "./"})
//         .pipe(eslint({
//             fix: fixCode,
//         }))
//         .pipe(eslint.format())
//         .pipe(gulpIf(isFixed, gulp.dest(paths.libDir)))
//         .pipe(eslint.failAfterError());
// }
// использование
// gulp eslint                                      // lint  all
// gulp eslint --fix                                // lint + fix all
// gulp eslint --file ./folder/filename.js          // lint file
// gulp eslint --file ./folder/filename.js --fix    // lint + fix file

// new function added to check if ESLint has run the fix
// function isFixed(file) {
//     return file.eslint !== null && file.eslint.fixed;
// }
// function eslintFix() {
//     return gulp.src(paths.allSrcJs)
//         .pipe(eslint({
//             fix: true,
//         }))
//         .pipe(eslint.format())
//         // if running fix - replace existing file with fixed one
//         .pipe(gulpIf(isFixed, gulp.dest('./src/scripts/')))
//         .pipe(eslint.failAfterError())
// }

/*--------------------------------------------------------------
 # JS
 --------------------------------------------------------------*/
function scripts() {
    // return gulp
    //     .src(paths.allSrcJs)
    //     .pipe(babel({
    //         presets: ['@babel/env'],
    //         plugins: ['@babel/transform-runtime'] // для шаблонизации
    //     }))
    //     .on('error', function(e) {
    //         console.log('>>> ERROR', e);
    //         // emit here
    //         this.emit('end');
    //     })
    //     .pipe(gulp.dest(paths.libDir))
    //     // .pipe(browsersync.stream());

    console.log('>>> Обработка JS');
    return gulp.src(PATH.SRC.JS)
    // .pipe(plumber({
    //   errorHandler: function(err) {
    //     notify.onError({
    //       title: 'Javascript concat/uglify error',
    //       message: err.message
    //     })(err);
    //     this.emit('end');
    //   }
    // }))
    // .pipe(concat('main.js'))
        .pipe(include())
        .on('error', notify.onError(function(err){
            return {
                title: 'JS',
                message: err.message
            };
        }))
        .pipe(uglify())
        .pipe(gulp.dest(PATH.BUILD.JS))
        .pipe(browsersync.stream());
}
function scriptsLibs() {
    // return gulp
    //     .src(paths.allSrcJs)
    //     .pipe(babel({
    //         presets: ['@babel/env'],
    //         plugins: ['@babel/transform-runtime'] // для шаблонизации
    //     }))
    //     .on('error', function(e) {
    //         console.log('>>> ERROR', e);
    //         // emit here
    //         this.emit('end');
    //     })
    //     .pipe(gulp.dest(paths.libDir))
    //     // .pipe(browsersync.stream());

    console.log('>>> Обработка JS');
    return gulp.src(PATH.SRC.JS_LIBS)
    // .pipe(plumber({
    //   errorHandler: function(err) {
    //     notify.onError({
    //       title: 'Javascript concat/uglify error',
    //       message: err.message
    //     })(err);
    //     this.emit('end');
    //   }
    // }))
    // .pipe(concat('main.js'))
        .pipe(include())
        .on('error', notify.onError(function(err){
            return {
                title: 'JS',
                message: err.message
            };
        }))
        .pipe(uglify())
        .pipe(gulp.dest(PATH.BUILD.JS))
        .pipe(browsersync.stream());
}

/*--------------------------------------------------------------
 # Оптимизация и копирование изображений
 --------------------------------------------------------------*/
function images() {
    console.log('>>> Оптимизация картинок');
    return gulp
        .src(PATH.SRC.IMG)
        .pipe(newer(PATH.BUILD.IMG))
        .pipe(
            imagemin([
                imagemin.gifsicle({ interlaced: true }),
                imagemin.jpegtran({ progressive: true }),
                imagemin.optipng({ optimizationLevel: 5 }),
                imagemin.svgo({
                    plugins: [
                        {
                            removeViewBox: false,
                            collapseGroups: true
                        }
                    ]
                })
            ])
        )
        .pipe(gulp.dest(PATH.BUILD.IMG))
        .pipe(browsersync.stream({once: true}));
}

function svgSprite() {
    console.log('---------- Сборка SVG спрайта');
    return gulp.src(PATH.SRC.SVG)
        .pipe(svgstore())
        .pipe(rename('sprite-svg.svg'))
        .pipe(gulp.dest(PATH.BUILD.SVG));
};

/*--------------------------------------------------------------
 # FONTS
 --------------------------------------------------------------*/
function fonts() {
    console.log('---------- Копирование шрифтов');
    return gulp.src(PATH.SRC.FONTS)
        .pipe(gulp.dest(PATH.BUILD.FONTS));
};

// Watch files
function watchFiles() {
    gulp.watch(PATH.WATCH.PUG, pugHtml);
    gulp.watch(PATH.SRC.JS, scripts);
    gulp.watch(PATH.SRC.JS_LIBS, scriptsLibs);
    // gulp.watch(PATH.WATCH.LESS, taskLess);
    // gulp.watch(PATH.WATCH.SCSS, gulp.series(taskSass));
    gulp.watch(PATH.WATCH.SCSS, taskSass);
    gulp.watch(PATH.SRC.IMG, images);
    // gulp.watch(PATH.WATCH.JS, gulp.series(scripts));
    // gulp.watch(paths.allSrcJs, gulp.series(scriptsLint, scripts));
}


// Tasks
// gulp.task("js", gulp.series(scriptsLint, scripts));
gulp.task("images", images);
gulp.task("svgSprite", svgSprite);
// gulp.task("css", taskSass);
gulp.task("js", scripts);
gulp.task("jsLibs", scriptsLibs);
gulp.task("fonts", fonts);
gulp.task("pugHtml", pugHtml);
gulp.task("taskSass", taskSass);
gulp.task("sass", sass);
// gulp.task("eslintFix", eslintFix);
gulp.task("clean", clean);

// build
gulp.task(
    "build",
    // gulp.series(clean, gulp.parallel('images', 'svgSprite', 'taskSass', 'js', 'fonts'))
    gulp.series(clean, gulp.parallel('pugHtml', 'taskSass', 'images', 'js', 'jsLibs'))
);

// watch
// gulp.task("watch", gulp.parallel(watchFiles, browserSync));

gulp.task("default", gulp.parallel(watchFiles, browserSync));



