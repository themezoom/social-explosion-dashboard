(function() {
  'use strict';
  
  //Make URL into a config
  function UserService($resource) {
    return $resource('http://localhost:3002/v2/users/:token', { id: "@token" },
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
