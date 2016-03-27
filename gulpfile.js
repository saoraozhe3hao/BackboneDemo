var gulp = require('gulp');
var jsmin = require('gulp-jsmin');   // JS 压缩插件
var rename = require('gulp-rename'); // 在 gulp-jsmin 中定义的

// 定义任务，传入任务名 和 任务脚本
gulp.task('default', function() {
    // src 获取匹配文件，pipe 通过管道流给其他插件处理。
    gulp.src('project/module/**/*.js', { base: 'project' })
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build'));  // build 目录下生成的路径从 module 开始，即 src - base 。
});

//监听，传入监听对象，目标任务
var watcher = gulp.watch('project/**/*.js', ['default']);
//watch 的时候可以不配置目标任务，而在 事件处理函数中 编写任务。
watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});