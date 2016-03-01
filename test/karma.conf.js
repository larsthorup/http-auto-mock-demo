module.exports = function (config) {
  config.set({
    basePath: '..',

    browsers: [ 'Chrome' ],

    files: [
      'node_modules/chai/chai.js',
      'node_modules/sinon/pkg/sinon.js',
      'test/mocha.main.js',
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
