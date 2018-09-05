var integration = require('@segment/analytics.js-integration')

var GoogleAnalytics = module.exports = integration('Google Analytics')
  .global('gtag')
  .option('trackingId', '')

GoogleAnalytics.prototype.initialize = function() {
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function(){dataLayer.push(arguments)}

  var config = {
    /** TODO: add in settings. */
  }

  window.gtag('js', new Date())
  window.gtag('config', this.options.trackingId, config)
}

GoogleAnalytics.prototype.track = function(track) {}

GoogleAnalytics.prototype.identify = function(identify) {}

GoogleAnalytics.prototype.orderCompleted = function(track) {}

GoogleAnalytics.prototype.checkoutStarted = function(track) {}

GoogleAnalytics.prototype.checkoutStepViewed = function(track) {}

GoogleAnalytics.prototype.checkoutStepCompleted = function(track) {}

GoogleAnalytics.prototype.orderRefunded = function(track) {}

GoogleAnalytics.prototype.productAdded = function(track) {}

GoogleAnalytics.prototype.productRemoved = function(track) {}

GoogleAnalytics.prototype.productViewed = function(track) {}

GoogleAnalytics.prototype.productClicked = function(track) {}

GoogleAnalytics.prototype.promotionViewed = function(track) {}

GoogleAnalytics.prototype.promotionClicked = function(track) {}

GoogleAnalytics.prototype.productListViewed = function(track) {}
