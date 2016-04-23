var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/build',

  // dynamically load all test files
  // deps: allTestFiles,
  deps: [
    '../src/tests/application.spec',
    // '../../bower_components/lodash/lodash'
  ],

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start,
  paths: {
    lodash: '../bower_components/lodash/lodash',
    three: '../bower_components/three.js/build/three',
    q: '../bower_components/q/q',
    stats: '../bower_components/stats.js/build/stats.min',
  },
  shim: {
    lodash: {
      exports: '_'
    },
    three: {
      exports: 'THREE'
    },
    q: {
      exports: 'Q',
    },
    stats:{
      exports: 'Stats',
    },
    beril: {
      deps: ['lodash', 'three', 'q'],
      // path: 'beril',
      exports: 'beril',
      init: function(lodash, three, q){
        console.log("Ads");
        window.Q = q;
      }
    },
  }
});
