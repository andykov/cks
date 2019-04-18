'use strict';

// Load plugins
const gulp = require('gulp');
const browsersync = require('browser-sync');
const path = require('path');
const del = require('del');
const postcss = require('gulp-postcss');
// const lessImport = require('gulp-less-import');
const esbabel = require('gulp-babel');
const less = require('gulp-less');
const sass = require('gulp-sass');
const autoprefixer = require("gulp-autoprefixer");
const csso = require('gulp-csso');
const cssnano = require('gulp-cssnano');
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
            'src/less/pages/*.less'
        ],
        SCSS: [
            'src/scss/global.scss',
            'src/scss/style-pages/*.scss'
        ],
        JS: [
            // 'node_modules/babel-polyfill/dist/polyfill.js',
            'src/js/js-pages/*.js',
            'src/js/script.js',
        ],
        JS_LIBS: [
            // 'src/js/js-pages/*.js'
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
            // 'node_modules/[moduleName]',
        ],
        JS: [ // порядок имеет значение!
            // 'node_modules/[moduleName]',
        ]
    },
    WATCH: {
        PUG: ['src/pages/*.pug', 'src/blocks/**/*.pug'],
        SCSS: ['src/scss/**/*.scss', 'src/blocks/**/*.scss'],
        JS: [
            'src/blocks/**/*.js',
            'src/js/js-pages/*.js',
            'src/js/script.js',
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
    var plugins = [
        autoprefixer({browsers: ['last 1 version']}),
        cssnano()
    ];
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

// function taskLess() {
//     console.log('>>> Обработка LESS');
//     return gulp.src(PATH.SRC.LESS)
//     // .pipe(sourcemaps.init())
//     // .pipe(cached('less'))
//     // .pipe(dependents())
//         .pipe(less({
//             paths: [path.join(__dirname, 'less', 'includes')]
//         })).on('error', notify.onError(function(err){
//             return {
//                 title: 'LESS',
//                 message: err.message
//             };
//         }))
//         .pipe(postcss([
//             require('postcss-flexbugs-fixes'),
//             require('postcss-inline-svg')
//         ]))
//         .pipe(autoprefixer({browsers: ['last 10 versions']}))
//         .pipe(cssnano())
//         .pipe(debug({title: 'обработано less файлов'}))
//         // .pipe(sourcemaps.write())
//         .pipe(gulp.dest(PATH.BUILD.CSS))
//         .pipe(browsersync.stream());
// }



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
    //     .pipe(esbabel({
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
        // .pipe(esbabel({
        //     presets: ['@babel/preset-env', 'module:@babel/plugin-proposal-class-properties']
        // }))
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
    //     .pipe(esbabel({
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
    gulp.watch(PATH.WATCH.JS, scripts);
    gulp.watch(PATH.WATCH.SCSS, taskSass);
    gulp.watch(PATH.SRC.IMG, images);
}


// Tasks
// gulp.task("js", gulp.series(scriptsLint, scripts));
gulp.task("images", images);
gulp.task("svgSprite", svgSprite);
gulp.task("js", scripts);
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
    gulp.series(clean, gulp.parallel('pugHtml', 'taskSass', 'images', 'js'))
);

// watch
// gulp.task("watch", gulp.parallel(watchFiles, browserSync));

gulp.task("default", gulp.parallel(watchFiles, browserSync));



