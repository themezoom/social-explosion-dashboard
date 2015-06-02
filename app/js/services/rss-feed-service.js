(function() {
  'use strict';
  
  //Make URL into a config
  function RssFeedService($resource, API) {
    return $resource(API.baseUrl + '/v2/users/:token/rss_feeds/:id', {},
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
    .factory('RssFeedService', RssFeedService);
  
})();
