const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const watchify = require('watchify')
const tsify = require('tsify')
const gutil = require('gulp-util')
const glob = require('glob')
const exorcist = require('exorcist')


function task(name) {
	let browser = browserify({
		basedir: '.',
		//debug: true,
		entries: name.startsWith('test') ? glob.sync(__dirname + '/test/**/*.test.ts') : ['docs/index.ts']
	})
	browser.plugin(tsify)
	browser.on('log', gutil.log)

	if (name.endsWith('-watch')) {
		browser.plugin(watchify)
		browser.on('update', () => {
			bundle()
		})
	}

	let dir = name.replace('-watch', '')

	function bundle() {
		return browser
			.bundle()
			.on('error', (err) => gutil.log(err.message))
			//.pipe(exorcist(__dirname + '/' + dir + '/bundle.js.map'))
			.pipe(source('bundle.js'))
			.pipe(gulp.dest(dir))
	}

	return bundle()
}


function css() {
	return gulp.src(['css/*.css', 'css/fonts/*'], {base: '.'})
		.pipe(gulp.dest('docs'))
}


gulp.task('css', css)
gulp.task('docs', () => task('docs'))
gulp.task('docs-watch', () => task('docs-watch'))
