angular
  .module('socialExplosionAdmin')
  .directive('feedButton', ['BootStrapService', function (BootStrapService) {
    return {
      link: function (scope, element, attrs) {
        element.bind('click', function() {
          scope.toggleFeed(scope.feed);
          
          var classAttributes = (scope.feed.status == 'deactivated') ? 'glyphicon glyphicon-remove' : 'glyphicon glyphicon-play';
          element.removeClass(element.attr('class'));
          element.addClass(classAttributes);
        });
        
        var classAttributes = BootStrapService.icon(scope.feed.status);
        element.addClass(classAttributes);
      }
  };
}]);
