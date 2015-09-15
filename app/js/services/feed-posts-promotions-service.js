(function() {
  'use strict';
  
  function FeedPostsPromotionsService($resource, API) {
    return $resource(API.baseUrl + '/v2/users/:token/rss_feeds/:rss_feed_id/posts/:post_id/promotions', 
      {
        token: '@token',
        rss_feed_id: '@rss_feed_id',
        post_id: '@post_id'
      },
      {
        'create':  { method: 'POST' }
      }
    );
  }
  
  angular
    .module('socialExplosionAdmin')
    .factory('FeedPostsPromotionsService', FeedPostsPromotionsService);
  
})();
