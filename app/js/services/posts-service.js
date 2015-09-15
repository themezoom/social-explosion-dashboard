(function() {
  'use strict';
  
  function PostsService($resource, API) {
    return $resource(API.baseUrl + '/v2/users/:token/posts/:id', {},
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
    .factory('PostsService', PostsService);
  
})();
