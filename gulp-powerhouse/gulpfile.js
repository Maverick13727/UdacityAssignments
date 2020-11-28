var gulp = require('gulp'), // similar to import ,import necessary files from node_modules
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
    cleanCSS = require('gulp-clean-css');
    imageop = require('gulp-image-optimization');
    const criticalCss = require('gulp-critical-css');


gulp.task('scripts', function() {
  gulp.src('js/perfmatters.js')
      .pipe(uglify())
      .pipe(rename('perfmatters.min.js'))
      .pipe(gulp.dest('js/'));
});

gulp.task('styles', function() {
  gulp.src('css/*.css')
      .pipe(cleanCSS())
      .pipe(gulp.dest('minCSS'));
});
gulp.task('watch', function() {
  gulp.watch('js/*.js',['scripts']);
  gulp.watch('css/*.css',['styles']);
});
gulp.task('images', function(cb) {
    gulp.src(['images_src/**/*.png','images_src/**/*.jpg','images_src/**/*.gif','images_src/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('images')).on('end', cb).on('error', cb);
});
gulp.task('critical', () => {
    gulp.src('css/file.css')
        .pipe(criticalCss())
        .pipe(gulp.dest('dist'))
});
// gulp.task('default', ['scripts','styles','watch','images']);
gulp.task('default', ['images']);
// gulp.task('default', ['critical']);
