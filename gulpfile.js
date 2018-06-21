var gulp        =   require('gulp');
var browserSync =   require('browser-sync').create();


//Crea el servidor local i actualitza
gulp.task('update', function() {
    return gulp.src('src/css/*.css').pipe(browserSync.stream());
});

gulp.task('server', function(){
    browserSync.init({
        server: "./src"
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/*.js").on('change', browserSync.stream);
    gulp.watch("src/css/*.css",['update']);
});

gulp.task('default', ['server']);