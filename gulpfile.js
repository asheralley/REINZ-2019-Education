//Gulp Variables
var gulp = require('gulp');
	sass = require('gulp-sass');
 	livereload = require('gulp-livereload');
 	connect = require('gulp-connect');
 	jshint = require('gulp-jshint');
    rename = require('gulp-rename');
    minifyCss = require('gulp-minify-css');
    jade = require('gulp-jade');
    concat = require('gulp-concat');
    uglify = require('gulp-uglify');

//Server Task
gulp.task('serve', function(event) {
    connect.server({
        root: '',
        port: 1988,
        livereload: true
    });
});

//Styles Task
gulp.task('styles', function() {
    gulp.src('sass/**/custom.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '-min'}))
        .pipe(minifyCss())
        .pipe(gulp.dest('css/'))
        .pipe(connect.reload());
});

//HTML Task
gulp.task('html', function() {
    gulp.src('./*.html')
    	.pipe(connect.reload());
});

gulp.task('scripts', function() {
  gulp.src([
    './js/jquery-1.11.0-min.js', 
    './js/reveal.js', 
    './lib-responsive/js/jquery.easing.1.3.js', 
    './lib-responsive/js/jquery.transit.min.js', 
    './lib-responsive/js/jquery.transit.min.js',
    './lib-responsive/js/essemble_core.min.js',
    './lib-responsive/js/mcq.js',
    './lib-responsive/js/quiz.js'
    ])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'))
});

//JS Lint Task
gulp.task('lint', function(){
    gulp.src('js/custom.js')
    .pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(connect.reload());
});

//Rendering Jade Task 
gulp.task('templates', function() {
  var YOUR_LOCALS = {};
  gulp.src('views/*.jade')
    .pipe(jade({ 
        locals: YOUR_LOCALS,
        pretty: true
    }))
    .pipe(gulp.dest('./'))
    .pipe(connect.reload());
});

//Watch Task
gulp.task('watch', function(){
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('./*.html', ['html']); 
	gulp.watch('js/*.js', ['lint']);
    gulp.watch('views/*.jade', ['templates']);

});

// gulp.task('default', ['serve', 'styles', 'html', 'lint', 'watch']);
gulp.task('default', ['serve', 'styles', 'scripts', 'html', 'watch']);
