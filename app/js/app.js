(function() {
  'use strict';

  angular
    .module('socialExplosionAdmin', [
      'ui.router',
      'ngResource',
      'ui.bootstrap',
      'LocalStorageModule'
    ]);

  angular
    .module('socialExplosionAdmin')
    .constant("API", {
        "baseUrl": "http://localhost:3002"
      })
    .config(function($stateProvider, $urlRouterProvider, $httpProvider, localStorageServiceProvider) {
      //Reset headers to avoid OPTIONS request (aka preflight), retarded
      $httpProvider.defaults.headers.common = {};
      $httpProvider.defaults.headers.post = {};
      $httpProvider.defaults.headers.put = {};
      $httpProvider.defaults.headers.patch = {};
  
      $urlRouterProvider.otherwise('/login');
      
      localStorageServiceProvider
        .setPrefix('socialExplosionAdmin')
        .setStorageType('sessionStorage')
        .setNotify(true, true)
      
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'partials/login.html',
          controller: 'LoginController'
        })
        .state('logout', {
          url: '/logout',
          templateUrl: 'partials/login.html',
          controller: 'LoginController',
          resolve: {
            user: function(localStorageService) {
              return localStorageService.remove('user');
            }
          }
        })
        .state('rssFeeds', {
          url: '/rss_feeds',
          templateUrl: 'rss_feeds/index.html',
          controller: 'RssFeedController',
          resolve: {
            user: function(localStorageService) {
              return localStorageService.get('user');
            }
          }
        })
        .state('newRssFeed', {
          url: '/rss_feeds/new/:id',
          templateUrl: 'rss_feeds/new.html',
          controller: 'NewRssFeedController',
          resolve: {
            user: function(localStorageService) {
              return localStorageService.get('user');
            }
          }
        });
      });
})();
