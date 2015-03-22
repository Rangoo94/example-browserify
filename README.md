# Example page

It's just example page which uses **Browserify** for modularity. The goal is to get and transform external data, to show in few tabs.

## Development

To prepare development environment you need only to fire `npm install` and run `npm install -g grunt grunt-cli` to have **Grunt** installed globally.

### Code quality tools

I am using here **JSHint** & **JSCS** for JavaScript and **LessLint** for LESS files. You can run all linting procedures by `grunt lint` command.

### Unit tests

Everything is running by **Mocha**, later it may be moved to **Jasmine**.
All tests are in `test/spec` directory and have same structure as `src/js`. It can be run by `grunt test` command and you can test coverage by `grunt html-coverage`, report will be put to `coverage.html` file.

### Testing locally

There is prepared simple server, which you can start by `grunt server` command and it will be available at `http://localhost:8000`. To have live reload, run `grunt server:live`.

## Preparing distributable code

Run `grunt build` command to make production code, which will be available as code in `dist` folder.
