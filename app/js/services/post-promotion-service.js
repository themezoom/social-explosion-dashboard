(function() {
  'use strict';
  
  function PostPromotionsService($resource, API) {
    return $resource(API.baseUrl + '/v2/users/:token/posts/:id/promotions', 
      {
        token: '@token',
        post_id: '@post_id'
      },
      {
        'create':  { method: 'POST' }
      }
    );
  }
  
  angular
    .module('socialExplosionAdmin')
    .factory('PostPromotionsService', PostPromotionsService);
  
})();
