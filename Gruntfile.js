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
        extract_sourcemap: {
            prod: {
                options: {
                    removeSourcesContent: true
                },
                files: {
                    'dist/js': 'dist/js/app.min.js'
                }
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
                    { expand: true, cwd: 'src/', src: ['*.html'], dest: 'dist/' }
                ]
            }
        }
    });

    grunt.registerTask('lint', [
        'jshint',
        'jscs'
    ]);

    grunt.registerTask('test', [
        'mochaTest:test'
    ]);

    grunt.registerTask('html-coverage', [
        'mochaTest'
    ]);

    grunt.registerTask('build:js', [
        'browserify:prod',
        'extract_sourcemap:prod'
    ]);

    grunt.registerTask('build:html', [
        'copy:prod'
    ]);

    grunt.registerTask('build', [
        'build:js',
        'build:html'
    ]);
};
