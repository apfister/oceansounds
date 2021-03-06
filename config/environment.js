/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'oceansounds',
    environment: environment,
    rootURL: '/oceansounds/',
    locationType: 'auto',

    torii: {
      sessionServiceName: 'session',
      providers: {
        'arcgis-oauth-bearer': {
          // apiKey: '1fa2j7mOrkB4FTWm',
          apiKey: 'arcgisonline',
          portalUrl: 'https://www.arcgis.com',
          remoteServiceName: 'iframe',
          display: 'iframe',
          showSocialLogins: false
        }
      }
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      portalBaseUrl: 'https://www.arcgis.com',
      arcgisPortal: {
        domain: 'arcgis.com',
        env: 'www',
        maps: 'maps'
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.rootURL = '/oceansounds/';
    ENV.locationType = 'hash';
  }

  return ENV;
};
