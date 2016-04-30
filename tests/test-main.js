var allTestFiles = [];
var TEST_REGEXP = /(spec|tests)\.js$/i;

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
    var normalizedTestModule = file.replace(/^\/base\/tests\/|\.js$/g, '');
    allTestFiles.push(normalizedTestModule);
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base/tests',
  // deps: ['three', 'tests/component.spec'],
  //deps: allTestFiles,
  // deps: allTestFiles,
  // deps: ['../node_modules/three/three', '../src/beril', 'component.spec'],

  // dynamically load all test files
  // deps: allTestFiles,
  // deps: [
  //   'component.spec',
  //   // '../../bower_components/lodash/lodash'
  // ],

  // we have to kickoff jasmine, as it is asynchronous
  // callback: window.__karma__.start,
  paths: {
    lodash: '../node_modules/lodash/lodash',
    three: '../node_modules/three/three',
    q: '../node_modules/q/q',
    // stats: '../bower_components/stats.js/build/stats.min',
  },
  shim: {
    tests: {
      deps: allTestFiles
    },

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
    // 'beril': {
    //   deps: ['lodash', 'three', 'q'],
    //   // path: 'beril',
    //   exports: 'beril',
    //   init: function(lodash, three, q){
    //     console.log("Ads");
    //     window.Q = q;
    //   }
    // },
  }
});

requirejs.onError = function (err) {
    console.log(err.requireType);
    console.log('modules: ' + err.requireModules);
    throw err;
};

// have no idea why this shit work this way and don't work in normal way
// normal way is then you load it somehow like this https://karma-runner.github.io/0.8/plus/RequireJS.html
// or at least using this huck but without 3 nesting callbacks
require(['three', 'q', 'lodash'], function(three, q){
  window.THREE = three;
  window.Q = q;
  require(['../src/index'], function(beril){
    require(allTestFiles, function(){
      window.__karma__.start();
    });
  })
});