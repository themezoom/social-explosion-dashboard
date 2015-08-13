angular
  .module('socialExplosionAdmin')
  .directive('feedActionTooltip', ['BootStrapService', function (BootStrapService) {
    return {
      link: function (scope, element, attrs) {
        scope.$watch('feed', function(newValue, oldValue) {
          var title = null;
          if(scope.feed.status == 'deactivated') {
            title = 'Click to re-activate the feed';
          } else if(scope.feed.status == 'active') {
            title = 'Click to deactivate the feed'; 
          };
          
          element.removeClass(element.attr('title'));
          element.addClass(title);
        }, true);
      }
  };
}]);
