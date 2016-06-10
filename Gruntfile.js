/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function (string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        // 该插件 将HTML模板打包成{path:content}，供全局引用
        html2js:{
            options: {

            },
            main: {
                src: ["project/module/**/*.html"],
                dest: 'project/module/templates.js'
            }
        },
        transport:{     // CMD 模块转换
            tpl: {      // html 转 CMD
                options: {
                    debug: false
                },
                files: [{
                    expand: true,
                    cwd: 'project',    // 基础路径
                    src: '**/*.html',
                    dest: 'cmd-dest'
                }]
            },
            'directory': {
                options: {
                    debug: false
                },
                files: [{
                    expand: true,
                    cwd: 'project',
                    src: '**/*.js',
                    dest: 'cmd-dest'
                }]
            }
        },
        watch: {
            jst: {
                //监控对象，匹配project下的所有文件
                files: 'project/**/*.html',
                //监控对象发生变化，出发的任务
                tasks: ['html2js','transport']
            }
        }
    });


    // These plugins provide necessary tasks.
    require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });

    grunt.registerTask('watchJst',['html2js','transport','watch:jst']);
};
