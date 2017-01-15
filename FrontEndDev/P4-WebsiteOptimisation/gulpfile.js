var gulp = require('gulp'), // similar to import ,import necessary files from node_modules
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
    cleanCSS = require('gulp-clean-css');
    imageop = require('gulp-image-optimize');
    criticalCss = require('gulp-critical-css');
    imagemin = require('gulp-imagemin');

gulp.task('imageCompress', () =>
    gulp.src('images_src/*')
        .pipe(imagemin())
        .pipe(gulp.dest('img'))
);
gulp.task('scripts', function() {
  gulp.src('views/js/main.js')
      .pipe(uglify())
      .pipe(rename('main-min.js'))
      .pipe(gulp.dest('views/js/'));
});
gulp.task('styles', function() {
  gulp.src('views/css/style.css')
      .pipe(cleanCSS())
      .pipe(rename('style-min.css'))
      .pipe(gulp.dest('views/css/'));
});
gulp.task('watch', function() {
  gulp.watch('js/*.js',['scripts']);
  gulp.watch('css/*.css',['styles']);
});
gulp.task('images', function(cb) {
    // gulp.src(['images_src/**/*.png','images_src/**/*.jpg','images_src/**/*.gif','images_src/**/*.jpeg']).pipe(imageop({
    gulp.src(['images_src/**/*{png,jpg}']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('img')).on('end', cb).on('error', cb);
});
gulp.task('critical', () => {
    gulp.src('css/style.css')
        .pipe(criticalCss())
        .pipe(gulp.dest('css/criticalCss'))
});
gulp.task('default', ['scripts','styles','watch','images','critical','imageCompress']);
