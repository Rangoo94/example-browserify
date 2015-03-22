module.exports = function(grunt) {
    'use strict';

    // jshint camelcase: false
    // jshint node: true

    // Load configuration
    var libraries = Object.keys(grunt.file.readJSON('package.json').devDependencies),
        ignoredLibraries = [
            'grunt',
            'grunt-cli'
        ];

    // Load all Grunt tasks from NPM
    for (var i = 0; i < libraries.length; i++) {
        if (libraries[i].indexOf('grunt') === 0 && ignoredLibraries.indexOf(libraries[i]) === -1) {
            grunt.loadNpmTasks(libraries[i]);
        }
    }

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: [
                'Gruntfile.js',
                'src/**/*.js',
                'test/**/*.js'
            ]
        },
        jscs: {
            src: [
                'Gruntfile.js',
                'src/**/*.js',
                'test/**/*.js'
            ]
        },
        lesslint: {
            files: [ 'src/less/**/*.less' ]
        },
        browserify: {
            prod: {
                src: 'src/js/app.js',
                dest: 'dist/js/app.min.js',
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    preBundleCB: function(b) {
                        b.plugin(require('minifyify'), {
                            map: 'app.min.js.map',
                            output: 'dist/js/app.min.js.map'
                        });
                    }
                }
            }
        },
        less: {
            prod: {
                files: {
                    'dist/css/main.css': 'src/less/main.less'
                },
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({
                            browsers: [ 'last 4 versions' ]
                        })
                    ]
                }
            }
        },
        cssmin: {
            prod: {
                options: {
                    sourceMap: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist/css/',
                    src: [ 'main.css' ],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 8000,
                    base: {
                        path: './dist',
                        options: {
                            index: 'index.html'
                        }
                    }
                }
            },
            live: {
                options: {
                    keepalive: true,
                    livereload: true,
                    port: 8000,
                    base: {
                        path: './dist',
                        options: {
                            index: 'index.html'
                        }
                    }
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: 'test/blanket'
                },
                src: [ '!test/blanket.js', 'test/**/*.js' ]
            },
            coverage: {
                options: {
                    reporter: 'html-cov',
                    quiet: true,
                    captureFile: 'coverage.html'
                },
                src: [ '!test/blanket.js', 'test/**/*.js' ]
            }
        },
        copy: {
            prod: {
                files: [
                    { expand: true, cwd: 'src/', src: ['*.html'], dest: 'dist/' },
                    { expand: true, cwd: 'data/', src: ['**/*'], dest: 'dist/data/' }
                ]
            }
        },
        clean: {
            html: {
                src: [ 'dist/*.html' ]
            },
            js: {
                src: [ 'dist/js/**/*' ]
            },
            css: {
                src: [ 'dist/css/**/*' ]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: [ 'src/*.html' ],
                tasks: [ 'build:html' ]
            },
            js: {
                files: [ 'src/js/**/*' ],
                tasks: [ 'build:js' ]
            },
            css: {
                files: [ 'src/less/**/*' ],
                tasks: [ 'build:css' ]
            }
        }
    });

    grunt.registerTask('lint', [
        'jshint',
        'jscs',
        'lesslint'
    ]);

    grunt.registerTask('test', [
        'mochaTest:test'
    ]);

    grunt.registerTask('html-coverage', [
        'mochaTest'
    ]);

    grunt.registerTask('build:js', [
        'browserify:prod'
    ]);

    grunt.registerTask('build:css', [
        'less:prod',
        'cssmin:prod'
    ]);

    grunt.registerTask('build:html', [
        'copy:prod'
    ]);

    grunt.registerTask('build', [
        'clean',
        'build:js',
        'build:css',
        'build:html'
    ]);

    grunt.registerTask('server', [
        'build',
        'connect:server'
    ]);

    grunt.registerTask('server:live', [
        'build',
        'connect:live'
    ]);
};
