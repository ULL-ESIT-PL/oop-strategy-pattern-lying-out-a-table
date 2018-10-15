var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task("default", ["test"]);

gulp.task("run", shell.task('NODE_PATH=./src node ./src/main.js'));

gulp.task("run2", shell.task('NODE_PATH=./src node ./src/main.js input2.json'));

/*
En versiones v8.*  chrome://inspect en el navegador
https://nodejs.org/en/docs/inspector/
*/
gulp.task('debugger', shell.task('echo "visit chrome://inspect" && NODE_PATH=./src node --inspect-brk src/main.js'));
gulp.task('debugger2', shell.task('echo "visit chrome://inspect" && NODE_PATH=./src node --inspect-brk src/main.js input2.json'));

// Deprecated form:
gulp.task('debug', shell.task('NODE_PATH=./src node --inspect --debug-brk src/main.js'));

gulp.task("test", shell.task("NODE_PATH=./src ./node_modules/mocha/bin/mocha --require should"));

// nyc is istanbul command line interface
gulp.task("cover", shell.task("NODE_PATH=./src ./node_modules/.bin/nyc --reporter=html ./node_modules/.bin/mocha --require should"));

gulp.task("browserify", shell.task("NODE_PATH=./src browserify src/main.js -o src/bundle.js --debug"));

gulp.task("watchify", shell.task("NODE_PATH=./src watchify src/main.js -o src/bundle.js --debug"));

gulp.task("beefy", ["browserify"], shell.task("NODE_PATH=./src beefy src/bundle.js"));
