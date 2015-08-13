angular
  .module('socialExplosionAdmin')
  .directive('feedButton', ['BootStrapService', function (BootStrapService) {
    return {
      link: function (scope, element, attrs) {
        scope.$watch('feed', function(newValue, oldValue) {
          var classAttributes = BootStrapService.icon(scope.feed.status);
          element.removeClass(element.attr('class'));
          element.addClass(classAttributes);  
        }, true);

        var classAttributes = BootStrapService.icon(scope.feed.status);
        element.addClass(classAttributes);
      }
  };
}]);
