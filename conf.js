exports.config = {
  directConnect: true,
  chromeDriver: 'res/driver/chromedriver_83.0.4103.39',
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    silent: true,
    defaultTimeoutInterval: 36000,
    print: function () {
    }
  },
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['res/js_compiled_tests/itests/spec.js'],
  capabilities: {
    browserName: 'chrome',
    // Uncomment to run the tests headless
    // chromeOptions: {
    //   //binary: process.env.CHROME_BIN,
    //   args: ['--headless', '--no-sandbox']
    //   }
  },
  onPrepare: function() {
    let jasmineReporters = require('jasmine-reporters');
    jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: 'res/testresults/jasmine-reporter',
        filePrefix: 'xmloutput'
    }));

    let AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'res/testresults/allure-results'
    }));
    jasmine.getEnv().afterEach(function(done){
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      })
    });
    
    let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: 'pretty'
      }
    }));
  }
  // multiCapabilities: [
  //   {browserName: 'chrome'},
  //   {browserName: 'firefox'}
  // ]
};