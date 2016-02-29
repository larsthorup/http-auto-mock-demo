module.exports = function (config) {
  config.set({
    basePath: '..',

    browsers: [ 'Chrome' ],

    files: [
      'node_modules/chai/chai.js',
      'tools/mocha.main.js',
      'src/client/app.js',
      'src/client/app.test.js'
    ],

    frameworks: [ 'mocha' ],

    plugins: [
      'karma-chrome-launcher',
      'karma-mocha'
    ],

    reporters: [ 'dots' ],

    singleRun: true
  });
};
