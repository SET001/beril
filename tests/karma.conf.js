// Karma configuration
// Generated on Tue Jul 28 2015 02:15:34 GMT+0300 (EEST)

module.exports = function(config) {
  config.set({
    browserNoActivityTimeout: 1000000,
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
	files: [
        {pattern: 'node_modules/lodash/lodash.js', included: false},
        {pattern: 'node_modules/three/three.js', included: false},
        {pattern: 'node_modules/q/q.js', included: false},
        {pattern: 'node_modules/mock-socket/dist/mock-socket.min.js', included: false},

        //{pattern: 'tests/**/[^_]*.spec.js', included: false},
        {pattern: 'tests/component.spec.js', included: false},
        {pattern: 'src/**/[^_]*.js', included: false},
        // {pattern: 'src/beril.js', included: false},
        // {pattern: 'src/core.js', included: false},
        // {pattern: 'src/application.js', included: false},
        // {pattern: 'src/applications/*.js', included: false},
        // {pattern: 'src/di.js', included: false},
        // {pattern: 'src/entities.js', included: false},
        // {pattern: 'src/entities/*.js', included: false},

        'tests/test-main.js',
        

        // 'build/beril.js',
        // 'tests/mocks/berilMock.js',
        // 'tests/**/[^_]*.spec.js',
        // 'src/tests/test-main.js',
        // 'build/tests/**/*.spec.js',
	],

    // paths: {
    //     lodash: '../../bower_components/lodash/lodash.js'
    // }


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // preprocessors: {
    //     'build/v3.js': ['babel'],
    //     'tests/*.spec.js': ['babel'],
    // },

    // babelPreprocessor: {
    //   options: {
    //     presets: ['es2015'],
    //   }
    // },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    specReporter: {
        maxLogLines: 5,         // limit number of lines logged per test
        suppressErrorSummary: true,  // do not print error summary
        suppressFailed: false,  // do not print information about failed tests
        suppressPassed: false,  // do not print information about passed tests
        suppressSkipped: true  // do not print information about skipped tests
    }
  })
}
