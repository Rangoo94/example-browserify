module.exports = function(grunt) {
    'use strict';

    // jshint camelcase: false
    // jshint node: true

    // Load configuration
    var libraries = Object.keys(grunt.file.readJSON('package.json').devDependencies),
        ignoredLibraries = [
            'grunt',
            'grunt-cli',
            'grunt-template-jasmine-istanbul'
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
            files: [ 'src/less/**/*.less' ],
            options: {
                csslint: grunt.file.readJSON('.csslintrc')
            }
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
            },
            tests: {
                src: 'test/**/*.js',
                dest: 'tmp/specs.js',
                options: {
                    transform: [
                        [ 'browserify-istanbul', {
                            ignore: ['test/**'],
                            defaultIgnore: true
                        } ]
                    ]
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
        },
        jasmine: {
            html: {
                options: {
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'coverage.json',
                        files: 'src/js/**/*',
                        report: {
                            type: 'html',
                            options: {
                                dir: 'coverage'
                            }
                        }
                    },
                    specs: [
                        'tmp/specs.js'
                    ]
                }
            },
            lcov: {
                options: {
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'coverage.json',
                        files: 'src/js/**/*',
                        report: {
                            type: 'lcovonly'
                        }
                    },
                    specs: [
                        'tmp/specs.js'
                    ]
                }
            }
        },
        compress: {
            js: {
                options: {
                    mode: 'gzip'
                },
                files: [
                    { expand: true, src: [ 'dist/js/*.min.js' ], dest: './', ext: '.min.js.gz' }
                ]
            },
            css: {
                options: {
                    mode: 'gzip'
                },
                files: [
                    { expand: true, src: [ 'dist/css/*.min.css' ], dest: './', ext: '.min.css.gz' }
                ]
            }
        }
    });

    grunt.registerTask('lint', [
        'jshint',
        'jscs',
        'lesslint'
    ]);

    grunt.registerTask('test', [
        'browserify:tests',
        'jasmine:lcov'
    ]);

    grunt.registerTask('html-coverage', [
        'browserify:tests',
        'jasmine:html'
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
        'build:html',
        'compress:js',
        'compress:css'
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
