var gulp = require('gulp');
var jsmin = require('gulp-jsmin');   // JS 压缩插件
var rename = require('gulp-rename'); // 在 gulp-jsmin 中定义的
var through = require("through2");

// 定义任务，传入任务名 和 任务脚本
gulp.task('default', function() {
    // src 获取匹配文件，pipe 通过管道流给其他插件处理。
    gulp.src('project/module/**/*.js', { base: 'project' }) // base 是指 只取这个路径“以下”的内容
        .pipe(jsmin())
        .pipe(through.obj(function(file, encode, cb) {
            // 获取内容
            var contents = file.contents.toString(encode);

            // 处理内容

            // 重设内容
            file.contents = new Buffer(contents, encode);
            //回调
            cb(null, file, encode);
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build'));  // build 目录下生成的路径从 module 开始，即 src - base 。
});

//监听，传入监听对象，目标任务
var watcher = gulp.watch('project/**/*.js', ['default']);
//watch 的时候可以不配置目标任务，而在 事件处理函数中 编写任务。
watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});