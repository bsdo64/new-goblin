/**
 * Created by dobyeongsu on 2016. 3. 19..
 */
var path = require('path');

var gulp = require("gulp");
var gutil = require("gulp-util");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

var webpack = require("webpack");
var webpackGulp = require("webpack-stream");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./config/webpack.config.js");

var frontDir = path.resolve(__dirname, 'front');
var serverDir = path.resolve(frontDir, 'server');
var scriptDir = path.resolve(frontDir, 'scripts');

var dist = path.resolve(__dirname, 'dist');
var serverDist = path.resolve(dist, 'server');
var publicDist = path.resolve(dist, 'public');

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(serverDir + '/**/*', ['server']);
  gulp.watch(scriptDir + '/**/*', ['script']);
});

gulp.task("server", function () {
  return gulp.src(serverDir + '/**/*')
             .pipe(babel())
             .pipe(gulp.dest(serverDist));
});

gulp.task('script', function() {
  return gulp.src(scriptDir + '/**/*')
             .pipe(webpackGulp(webpackConfig))
             .pipe(gulp.dest(publicDist));
});

gulp.task("webpack-dev-server", function(callback) {
  // Start a webpack-dev-server
  var compiler = webpack(webpackConfig);

  new WebpackDevServer(compiler, {
    // server and middleware options
  }).listen(8080, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

    // keep the server alive or continue?
    // callback();
  });
});