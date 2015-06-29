var gulp = require("gulp");
var uglify = require("gulp-uglify");
var ts = require("gulp-typescript");
var minHTML = require("gulp-minify-html");
var minCSS = require("gulp-minify-css")
var concat = require("gulp-concat");
var imageMin = require("gulp-imagemin");
var rsync = require("gulp-rsync");
var connect = require("gulp-connect");
//var obfuscate = require("gulp-obfuscate");

gulp.task("build", function () {
//	Select the HTML index, replace the script sources, minify, and move to dist
	gulp.src("index.html")
		.pipe(minHTML())
		.pipe(gulp.dest("dist/"));

//	Select the CSS, minify, and move to dist
	gulp.src("**.css")
		.pipe(minCSS())
		.pipe(gulp.dest("dist/"));

	gulp.src("**.json")
		.pipe(gulp.dest("dist/"));

	gulp.src(["**.ts"])
		.pipe(ts())
//		.pipe(obfuscate())
		.pipe(uglify({
			mangle: false
		}))
		.pipe(gulp.dest("dist/"));

	gulp.src("lib/phaser.js")
		.pipe(gulp.dest("dist/lib/"));

	gulp.src("img/*")
		.pipe(imageMin())
		.pipe(gulp.dest("dist/img/"));

	gulp.src(["audio/**.ogg", "audio/**.mp3", "audio/**.wav"])
		.pipe(gulp.dest("dist/audio/"));

});

gulp.task("connect", function() {
	gulp.src("dist/")
		.pipe(connect.server({
			root: "dist",
			livereload: true,
			port: 8001
		}));
});

gulp.task("reload", function () {
	connect.reload();
});

gulp.task("deploy", function () {
	gulp.src("dist/")
		.pipe(rsync({
			root: "dist",
			hostname: "gl0vgames.com",
			destination: "/usr/share/nginx/cb/",
			username: "root",
			incremental: true,
			progress: true,
			recursive: true
	}));
});

gulp.task("default", ["build", "connect"], function() {
	gulp.watch("**", ["build", "reload"]);
	gulp.watch("**/**", ["build", "reload"]);
});
