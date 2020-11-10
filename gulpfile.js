var gulp = require("gulp"),
    util = require("gulp-util"),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename');
    log = util.log;
var uglify = require('gulp-uglify');
var streamqueue = require('streamqueue');
var concat = require('gulp-concat');

gulp.task("libs-css", function(){
  return streamqueue({ objectMode: true },
    gulp.src("public/libs/ui-bootstrap/bootstrap.min.css"),
    gulp.src("public/libs/toast/ngToast.min.css"),
    gulp.src("public/libs/angular/ng-table/ng-table.min.css")
   )
    .pipe(concat('vendor.css'))
    .pipe(minifycss({compatibility: 'ie9'}))
    .pipe(gulp.dest('public/dist/css'));
});

//minify js plugins
gulp.task('assets',['libs-css'], function() {
  return streamqueue({ objectMode: true },
    gulp.src('public/libs/jquery-2.1.4.min.js'),
    gulp.src('public/libs/lodash.min.js'),
    gulp.src("public/libs/angular/angular.min.js"),
    gulp.src("public/libs/angular/angular-animate.js"),
    gulp.src("public/libs/angular/angular-sanitize.min.js"),
    gulp.src("public/libs/toast/ngToast.min.js"),
    gulp.src("public/libs/angular/angular-ui-router.min.js"),
    gulp.src('public/libs/angular/satellizer.min.js'),
    gulp.src('public/libs/ui-bootstrap/ui-bootstrap-tpls.min.js'),
    gulp.src('public/libs/angular/ng-table/ng-table.min.js'),
    gulp.src('public/libs/*.js')
  )
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('public/dist/js'));
});

//tasks
gulp.task('default',['assets'])
