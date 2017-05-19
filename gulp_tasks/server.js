module.exports = function (gulp) {
    var paths = require('../paths.json');
    var livereload = require('gulp-livereload');
    var connect = require('gulp-connect');
    var express = require('express');
    var proxy = require('http-proxy-middleware');

    gulp.task('server', function () {
        connect.server({
            root: 'src/static',
            port: 9000,
            livereload: true,
            middleware: function (connect, opt) {
                return [
                    proxy('/oauth', {
                        target: 'http://localhost:8080',
                        changeOrigin: true
                    }),
                    proxy('/api', {
                        target: 'http://localhost:8080',
                        changeOrigin: true
                    })
                ];
            }
        });
    });
};