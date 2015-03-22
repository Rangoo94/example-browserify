# Example page

[![Travis](https://travis-ci.org/Rangoo94/example-browserify.svg)](https://travis-ci.org/Rangoo94/example-browserify)
[![Code Climate](https://codeclimate.com/github/Rangoo94/example-browserify/badges/gpa.svg)](https://codeclimate.com/github/Rangoo94/example-browserify)
[![Coverage Status](https://coveralls.io/repos/Rangoo94/example-browserify/badge.svg)](https://coveralls.io/r/Rangoo94/example-browserify)

It's just example page which uses **Browserify** for modularity. The goal is to get and transform external data, to show in few tabs. Just for demo purposes it doesn't use jQuery.

## Development

To prepare development environment you need only to fire `npm install` and run `npm install -g grunt grunt-cli` to have **Grunt** installed globally.

### Code quality tools

I am using here **JSHint** & **JSCS** for JavaScript and **LessLint** for LESS files. You can run all linting procedures by `grunt lint` command.

### Unit tests

Everything is running by **Jasmine**. All tests are in `test/spec` directory and have same structure as `src/js`. It can be run by `grunt test` command and you can test coverage by `grunt html-coverage`, report will be put to `coverage` directory.

### Testing locally

There is prepared simple server, which you can start by `grunt server` command and it will be available at `http://localhost:8000`. To have live reload, run `grunt server:live` combining it with `grunt watch` which will detect code changes.

## Preparing distributable code

Run `grunt build` command to make production code, which will be available as code in `dist` folder.
