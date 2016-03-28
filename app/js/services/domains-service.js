(function() {
  'use strict';
  
  function DomainsService($resource, API) {
    return $resource(API.baseUrl + '/v2/users/:token/domains/:id', {},
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
    .factory('DomainsService', DomainsService);
  
})();
