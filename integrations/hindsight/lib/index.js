'use strict';

var integration = require('@segment/analytics.js-integration');
var is = require('is');
var each = require('@ndhoule/each');

/**
 * Expose `Hindsight`
 *
 */

var Hindsight = (module.exports = integration('Hindsight')
  .global('RB')
  .option('pixel_code', '')
  .option('custom_tracking_domain', '')
  .option('enable_cookie_sync', true)
  .tag('<script src="https://{{ host }}/assets/{{ lib }}.js">'));

/**
 * Initialize
 */

Hindsight.prototype.initialize = function() {
  window.RB = {};
  window.RB.disablePushState = true;
  window.RB.queue = [];
  window.RB.track =
    window.RB.track ||
    function() {
      window.RB.queue.push(Array.prototype.slice.call(arguments));
    };
  window.RB.source = this.options.pixel_code;

  var hasCustomDomain = !!this.options.custom_tracking_domain;
  var enableCookieSync = this.options.enable_cookie_sync;
  var scriptHost = hasCustomDomain
    ? this.options.custom_tracking_domain
    : 'getrockerbox.com';
  var scriptLib = hasCustomDomain && enableCookieSync ? 'wxyz.rb' : 'wxyz.v2';
  var tagParams = {
    host: scriptHost,
    lib: scriptLib
  };

  this.load(tagParams, this.ready);
};

/**
 * Loaded
 */

Hindsight.prototype.loaded = function() {
  return !!window.RB && !!window.RB.loaded;
};

/**
 * Page
 */

Hindsight.prototype.page = function(page) {
  window.RB.track('view', format(page.properties()));
};

/**
 * Track
 */

Hindsight.prototype.track = function(track) {
  window.RB.track(track.event(), format(track.properties()));
};

/**
 * Identify
 */

Hindsight.prototype.identify = function(identify) {
  window.RB.track('identify', identify.traits());
};

/**
 * Stringify all object values
 * @param {Object} props
 * @return {Object} ret
 */

function format(props) {
  var ret = {};
  each(function(value, key) {
    ret[key] = is.object(value) ? window.JSON.stringify(value) : value;
    return ret[key];
  }, props);

  return ret;
}
