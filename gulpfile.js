var gulp = require('gulp');
var sass = require('gulp-sass');

// process main.scss file
gulp.task('styles', function() {
    gulp.src('sass/**/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
});

//Watch for changes in all scss files task
gulp.task('watch-scss',function(){
    gulp.watch('sass/**/*.scss',['styles']);
})

gulp.task('default',['styles','watch-scss']);