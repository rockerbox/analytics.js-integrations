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

GoogleAnalytics.prototype.orderCompleted = function(track) {
  var properties = track.properties()
  var products = track.products()

  window.gtag('event', 'purchase', {
    transaction_id: properties.order_id,
    affiliation: properties.affiliation,
    value: properties.revenue,
    currency: properties.currency,
    tax: properties.tax,
    shipping: properties.shipping,
    items: products.map(function(product) {
      return {
        id: product.productId,
        name: product.name,
        // Unsupported
        // list_name: "Search Results",
        brand: properties.brand,
        category: properties.category,
        variant: properties.variant,
        // Unsupported
        // list_position: 1,
        quantity: properties.quantity,
        price: properties.price.toString()
      }
    })
  })
}

GoogleAnalytics.prototype.checkoutStarted = function(track) {
  var properties = track.properties()
  var products = track.products()
  window.gtag('event', 'begin_checkout', {
    items: products.map(function(product) {
      return {
        id: product.productId,
        name: product.name,
        // Unsupported
        // "list_name": "Search Results",
        brand: properties.brand,
        category: properties.category,
        variant: properties.variant,
        // Unsupported
        // "list_position": 1,
        quantity: properties.quantity,
        price: properties.price.toString()
      }
    }),
    coupon: properties.coupon
  })
}

/**
 * @param {Facade.Track} track
 */

GoogleAnalytics.prototype.checkoutStepViewed = function(track) {
  var properties = track.properties()
  var shippingMethod = properties.shippingMethod()
  var paymentMethod = properties.paymentMethod()

  if (shippingMethod) {
    window.gtag('event', 'set_checkout_option', {
      checkout_step: properties.step,
      checkout_option: "shipping method",
      value: shippingMethod
    });
  }

  if (paymentMethod) {
    window.gtag('event', 'set_checkout_option', {
      checkout_step: properties.step,
      checkout_option: "payment_method",
      value: paymentMethod
    });
  }
}

GoogleAnalytics.prototype.checkoutStepCompleted = function(track) {
  var properties = track.properties()
  var products = track.products()

  window.gtag('event', 'checkout_progress', {
    items: products.map(function(product) {
      return {
        id: product.productId,
        name: product.name,
        // Unsupported
        // list_name: "Search Results",
        brand: properties.brand,
        category: properties.category,
        variant: properties.variant,
        // Unsupported
        // list_position: 1,
        quantity: properties.quantity,
        price: properties.price.toString()
      }
    }),
    coupon: properties.coupon
  });
}

GoogleAnalytics.prototype.orderRefunded = function(track) {
  var properties = track.properties()
  var products = track.products()

  window.gtag('event', 'refund', {
    transaction_id: properties.order_id,
    affiliation: properties.affiliation,
    value: properties.revenue,
    currency: properties.currency,
    tax: properties.tax,
    shipping: properties.shipping,
    items: products.map(function(product) {
      return {
        id: product.productId,
        name: product.name,
        // Unsupported
        // list_name: "Search Results",
        brand: properties.brand,
        category: properties.category,
        variant: properties.variant,
        // Unsupported
        // list_position: 1,
        quantity: properties.quantity,
        price: properties.price.toString()
      }
    })
  })
}

GoogleAnalytics.prototype.productAdded = function(track) {}

GoogleAnalytics.prototype.productRemoved = function(track) {}

GoogleAnalytics.prototype.productViewed = function(track) {}

GoogleAnalytics.prototype.productClicked = function(track) {}

GoogleAnalytics.prototype.promotionViewed = function(track) {}

GoogleAnalytics.prototype.promotionClicked = function(track) {
  window.gtag('event', 'select_content', {
    promotions: [
      {
        id: properties.promotionId,
        name: properties.name
      }
    ]
  })
}

GoogleAnalytics.prototype.productListViewed = function(track) {}
