(function() {
  'use strict';
  
  //Make URL into a config
  function UserService($resource, API) {
    return $resource(API.baseUrl + '/v2/users/:token', { id: "@token" },
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
    .factory('UserService', UserService);
  
})();
