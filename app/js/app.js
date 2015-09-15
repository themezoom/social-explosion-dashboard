(function() {
  'use strict';
  // Public URL: http://dashboard.wpsocialexplosion.com/
  angular
    .module('socialExplosionAdmin', [
      'ui.router',
      'ngResource',
      'ui.bootstrap',
      'LocalStorageModule',
      'ngLodash',
      'ngLoadingSpinner',
      'ncy-angular-breadcrumb'
    ]);

  angular
    .module('socialExplosionAdmin')
    .constant("API", {
        "baseUrl": "http://api.wpsocialexplosion.com"
      })
    .config(function($stateProvider, $urlRouterProvider, $httpProvider, localStorageServiceProvider, $breadcrumbProvider) {
      //Reset headers to avoid OPTIONS request (aka preflight), retarded
      $httpProvider.defaults.headers.common = {};
      $httpProvider.defaults.headers.post = {};
      $httpProvider.defaults.headers.put = {};
      $httpProvider.defaults.headers.patch = {};
  
      $urlRouterProvider.otherwise('/login');
      
      $breadcrumbProvider.setOptions({
        templateUrl: 'templates/breadcrumb.html'
      });
      
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
        .state('posts', {
          url: '/posts',
          templateUrl: 'posts/index.html',
          controller: 'PostsController',
          ncyBreadcrumb: {
            label: 'Posts'
          },
          resolve: {
            user: function(localStorageService) {
              return localStorageService.get('user');
            }
          }
        })
        .state('scheduledPosts', {
          url: 'posts/:id/scheduled_posts',
          templateUrl: 'scheduled_posts/index.html',
          controller: 'ScheduledPostsController',
          ncyBreadcrumb: {
            label: 'Post Details',
            parent: 'posts'
          },
          resolve: {
            user: function(localStorageService) {
              return localStorageService.get('user');
            }
          }
        })
        .state('rssFeeds', {
          url: '/rss_feeds',
          templateUrl: 'rss_feeds/index.html',
          controller: 'RssFeedsController',
          ncyBreadcrumb: {
            label: 'Home'
          },
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
          ncyBreadcrumb: {
            label: 'New Feed',
            parent: 'rssFeeds'
          },
          resolve: {
            user: function(localStorageService) {
              return localStorageService.get('user');
            }
          }
        })
        .state('editRssFeed', {
          url: '/rss_feeds/edit/:id',
          templateUrl: 'rss_feeds/edit.html',
          controller: 'EditRssFeedController',
          ncyBreadcrumb: {
            label: 'Edit Feed',
            parent: 'showRssFeed'
          },
          resolve: {
            user: function(localStorageService) {
              return localStorageService.get('user');
            }
          }
        })
        .state('showRssFeed', {
          url: '/rss_feeds/show/:id',
          templateUrl: 'rss_feeds/show.html',
          controller: 'ShowRssFeedController',
          ncyBreadcrumb: {
            label: 'Rss Feed',
            parent: 'rssFeeds'
          },
          resolve: {
            user: function(localStorageService) {
              return localStorageService.get('user');
            }
          }
        })
        .state('rssFeedPosts', {
          url: '/rss_feeds/:feed_id/post/:id',
          templateUrl: 'rss_feeds/posts.html',
          controller: 'RssFeedPostsController',
          ncyBreadcrumb: {
            label: 'Feed Post Details ',
            parent: 'showRssFeed({id: feed_id})'
          },
          resolve: {
            user: function(localStorageService) {
              return localStorageService.get('user');
            }
          }
        });
      });
})();
