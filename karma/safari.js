
function setSafari (config) {
  config.customLaunchers = {
    sl_safari_latest: {
      base: 'SauceLabs',
      browserName: 'safari',
      version: 'latest'
    },
    sl_safari_latest_1: {
      base: 'SauceLabs',
      browserName: 'safari',
      version: 'latest-1'
    }
  }
  config.browsers = Object.keys(config.customLaunchers)
  return config
}

module.exports = setSafari
