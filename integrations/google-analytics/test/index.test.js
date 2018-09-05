var Analytics = require('@segment/analytics.js-core').constructor;
var sandbox = require('@segment/clear-env');
var tester = require('@segment/analytics.js-integration-tester');
var GoogleAnalytics = require('../lib');

describe('Google Analytics', function() {
  var ga;
  var analytics;
  var options = {};

  beforeEach(function() {
    analytics = new Analytics();
    ga = new GoogleAnalytics(options);
    analytics.use(EmailAptitude);
    analytics.use(tester);
    analytics.add(ea);
  })

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    ea.reset();
    sandbox();
  });
})
