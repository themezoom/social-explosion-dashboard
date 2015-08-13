(function() {
  'use strict';
  
  function RssPromotionService($resource, API) {
    return $resource(API.baseUrl + '/v2/users/:token/rss_feeds/:id/promotions', {},
      {
        'index':   { method: 'GET', isArray: true }
      }
    );
  }
  
  angular
    .module('socialExplosionAdmin')
    .factory('RssPromotionService', RssPromotionService);
  
})();
