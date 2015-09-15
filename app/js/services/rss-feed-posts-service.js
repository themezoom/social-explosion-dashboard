(function() {
  'use strict';
  
  function RssFeedPostsService($resource, API) {
    return $resource(API.baseUrl + '/v2/users/:token/rss_feeds/:rss_feed_id/posts/:id', {},
      {
        'create':  { method: 'POST' },
        'index':   { method: 'GET', isArray: true },
        'show':    { method: 'GET', isArray: false },
        'update':  { method: 'PUT' },
        'destroy': { method: 'DELETE' }
      }
    );
  }
  
  angular
    .module('socialExplosionAdmin')
    .factory('RssFeedPostsService', RssFeedPostsService);
  
})();
