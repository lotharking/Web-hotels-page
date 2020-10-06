'use strict'

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	uglify = require('gulp-uglify'),
	usemin = require('gulp-usemin'),
	rev = require('gulp-rev'),
	cleanCss = require('gulp-clean-css'),
	flatmap = require('gulp-flatmap'),
	htmlmin = require('gulp-htmlmin');



//primer tarea de gulp - este es el formato que maneja
gulp.task('sass', function(done) {
	gulp.src('./css/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./css'));
	done();
})

//habilitar el watch
gulp.task('sass:watch', function(done){
	gulp.watch('./css/*.scss', gulp.series(['sass']));
		done();
});

//habilitar el watch
gulp.task('browser-sync', function(){
	var files = ['./*.html', './css/*.css', './img/*.{png, jpg, gif}', './js/*.js']
	browserSync.init(files, {
		server: {
			baseDir: './'
		}
	});
});

//habilitar la tarea por defecto usando solo el comando gulp
gulp.task('default', gulp.parallel(['browser-sync', 'sass:watch']))

gulp.task('clean', function(){
	return del(['dist']);
});

gulp.task('copyfonts', function(done){
	gulp.src('./node_modules/open-iconic/font/fonts/*.{ttf,woff,eof,svg,eot,otf}*')
		.pipe(gulp.dest('./dist/fonts'));
	done();
});

gulp.task('imagemin', function(){
	return gulp.src('./images/*')
		.pipe(imagemin({optimizationLevel: 3, progressive:true, interlaced: true}))
		.pipe(gulp.dest('dist/images'));
});

gulp.task('usemin', function(){
	return gulp.src('./*.html')
		.pipe(flatmap(function(stream, file){
			return stream
				.pipe(usemin({
					css: [rev()],
					html: [function(){return htmlmin({collapseWhitespace:true})}],
					js: [uglify(), rev()],
					inlinejs: [uglify()],
					inlinecss: [cleanCss(), 'concat']
				}))
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series(['clean', 'copyfonts','imagemin', 'usemin']));