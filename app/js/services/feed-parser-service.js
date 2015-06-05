(function() {
  'use strict';

  function FeedParserService($http) {
    this.parse = function(url) {
      return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    }
  }
  
  angular
    .module('socialExplosionAdmin')
    .service('FeedParserService', FeedParserService);
  
})();
