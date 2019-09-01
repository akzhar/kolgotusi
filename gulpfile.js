'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  run = require('run-sequence'),
  rename = require('gulp-rename'),
  clean = require('rimraf'),
  jsMin = require('gulp-jsmin'),
  cssMin = require('gulp-clean-css'),
  htmlMin = require('gulp-htmlmin'),
  pug = require('gulp-pug'),
  imageMin = require('gulp-imagemin'),
  svgMin = require('imagemin-svgo'),
  jpegMin = require('imagemin-jpeg-recompress'),
  pngMin = require('imagemin-pngquant'),
  cwebp = require('gulp-cwebp'),
  svgstore = require('gulp-svgstore'),
  styleLint = require('gulp-stylelint'),
  esLint = require('gulp-eslint'),
  server = require('browser-sync').create(),
  devip = require('dev-ip'),
  posthtml = require('gulp-posthtml'),
  include = require('posthtml-include'),
  readFile = require('utils-fs-read-file'),
  data = require('gulp-data'),
  htmlValidator = require('gulp-w3c-html-validator');

devip();

gulp.task('validateHtml', function () {
  return gulp
  .src('docs/*.html')
  .pipe(htmlValidator())
  .pipe(htmlValidator.reporter());
});

gulp.task('styleLint', function () {
  return gulp
  .src('src/blocks/**/*.scss')
  .pipe(styleLint({
    failAfterError: true,
    reporters: [{formatter: 'string', console: true}]
  }));
});

gulp.task('esLint', function () {
  gulp.src(['src/js/modules/*.js'])
  .pipe(esLint())
  .pipe(esLint.format())
  .pipe(esLint.failAfterError());
});

gulp.task('clean', function (cb) {
  clean('docs', cb);
});

gulp.task('copy', function () {
  gulp.src([
      'src/fonts/**/*.{woff,woff2}',
      'src/js/data.json'
    ],
    {base: 'src'})
  .pipe(gulp.dest('docs/'));
});

gulp.task('svgSprite', function () {
  gulp.src('src/img/sprite/*.svg')
  .pipe(imageMin([
    svgMin({
      plugins: [
      {removeDimensions: true},
      {removeAttrs: false},
      {removeElementsByAttr: false},
      {removeStyleElement: false},
      {removeViewBox: false}
      ]
    })
    ]))
  .pipe(svgstore({inlineSvg: true}))
  .pipe(rename({basename: 'sprite', suffix: '.min'}))
  .pipe(gulp.dest('docs/img/'));
});

gulp.task('style', function () {
  gulp.src('src/blocks/*.{scss,sass}')
  .pipe(posthtml([ // сборка из разных файлов
    include()
  ]))
  .pipe(sass().on('error', sass.logError)) // компиляция css из препроцессорного кода sass
  .pipe(autoprefixer()) // расставление автопрефиксов
  .pipe(gulp.dest('docs/css/'))
  .pipe(cssMin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('docs/css/'));
});

gulp.task('js', function () {
  gulp.src('src/js/*.js')
  .pipe(posthtml([ // сборка из разных файлов
    include()
    ]))
  .pipe(gulp.dest('docs/js/'))
  .pipe(jsMin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('docs/js/'));
});

gulp.task('image', function () {
  gulp.src('src/img/*.{png,jpg,svg}')
  .pipe(imageMin([
    pngMin({quality: '80'}),
    jpegMin({progressive: true, method: 'ms-ssim'}),
    svgMin({
      plugins: [
      {removeDimensions: true},
      {removeAttrs: false},
      {removeElementsByAttr: false},
      {removeStyleElement: false},
      {removeViewBox: false}
      ]
    })
    ]))
  .pipe(gulp.dest('docs/img/'));
});

gulp.task('cwebp', function () {
  gulp.src('src/img/*.{png,jpg}')
  .pipe(cwebp())
  .pipe(gulp.dest('docs/img/'));
});

gulp.task('html', function () {
  gulp.src('src/blocks/*.html')
  .pipe(posthtml([ // сборка из разных файлов
    include()
    ]))
  .pipe(htmlMin({ collapseWhitespace: true }))
  .pipe(gulp.dest('docs/'));
});

gulp.task('pug', function (){
  var dataPath = 'src/js/data.json';
  return gulp.src('src/blocks/**/*.pug')
    .pipe(data(function () {
      return JSON.parse(readFile.sync(dataPath));
    }))
    .pipe(pug({pretty: true})) // не минифицировать HTML
    .pipe(gulp.dest(function (file) {
      return file.base;
    }));
});

gulp.task('watch', function() {
  var timeout = 1000;
  setTimeout(function(){gulp.watch('src/blocks/**/*.{scss,sass}', ['style', 'reload']);}, timeout);
  setTimeout(function(){gulp.watch('src/js/**/*.js', ['js' , 'reload']);}, timeout);
  setTimeout(function(){gulp.watch('src/blocks/**/*.html', ['html', 'reload']);}, timeout);
  setTimeout(function(){gulp.watch('src/img/*.*', ['image', 'reload']);}, timeout);
  setTimeout(function(){gulp.watch('src/img/sprite/inline-*.svg', ['sprite', 'html', 'reload']);}, timeout);
  setTimeout(function(){gulp.watch('src/blocks/**/*.pug', ['pug', 'html', 'reload']);}, timeout);
});

gulp.task('reload', function() {
  server.reload();
});

gulp.task ('server', function(done) {
  server.init({
    server: 'docs', // адрес к папке где лежит сборка
    notify: false,
    open: true,
    cors: true,
    host: '192.168.0.91', // дефолтный ip занят virtualbox, задача devip определила запасной ip
    ui: false
  });
  done();
});

gulp.task ('build', function(done) {
  run (
    'clean',
    'styleLint',
    'esLint',
    'copy',
    'image',
    'cwebp',
    'svgSprite',
    'style',
    'js',
    'pug',
    'html',
    'validateHtml',
    done
  );
});

gulp.task ('start', function(done) {
  run (
    'server',
    'watch',
    done
    );
});

// devip --> '192.168.1.76', '192.168.1.80' or false if nothing found (ie, offline user)
