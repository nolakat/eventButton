var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var webserver = require('gulp-webserver');


gulp.task('sass', function(){
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css/'))
        .pipe(notify({
            "title": "Stylesheets compiled.",
            "message": "Compiled <%= file.relative %>"
        }))
});

gulp.task('webserver', function(){
    gulp.src('./')
    .pipe(webserver({
        livereload: true,
        directoryListing: false,
        open: true,
        fallback: 'index.html'
    }));
    gulp.watch('scss/**/*.scss',['sass']);
    gulp.watch('**/*.js',['js']);
    gulp.watch('**/*.html');
});

gulp.task('js', function(){
    return gulp.src('js/**/*.js')
    .pipe(notify({
        "title": "Stylesheets compiled.",
        "message": "Compiled <%= file.relative %>"
    }))
})

gulp.task('default', ['webserver']);

gulp.task('watch', function(){
    

})