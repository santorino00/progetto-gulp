var gulp = require("gulp");
// var autoprefixer = require("gulp-autoprefixer");
var imagemin = require("gulp-imagemin");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var htmlmin = require("gulp-htmlmin");


gulp.task("imageMin", () =>
  gulp.src("src/images/*").pipe(imagemin()).pipe(gulp.dest("dist/images"))
);

gulp.task("minify", function () {
  gulp.src("src/js/*.js").pipe(uglify()).pipe(
    rename({
      basename: "script",
    })
  ).pipe(gulp.dest("dist/js"));
  gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task("sass", function () {
  gulp
    .src("src/sass/*.scss")
    // .pipe(autoprefixer())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(
      rename({
        basename: "style",
      })
    )
    .pipe(gulp.dest("dist/css"));
});

gulp.watch(["./src/js/*.js", "./src/*.html"], ["minify"]);
gulp.watch("./src/sass/*.scss", ["sass"]);
gulp.watch("./src/images/*", ["imageMin"]);

gulp.task("default", ["imageMin", "minify", "sass"], function () {});
