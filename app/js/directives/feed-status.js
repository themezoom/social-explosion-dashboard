angular
  .module('socialExplosionAdmin')
  .directive('feedStatus', ['BootStrapService', function (BootStrapService) {
    return {
      link: function (scope, element, attrs) {
        scope.$watch('feed', function(newValue, oldValue) {
          var classAttributes = 'alert alert-' + BootStrapService.colorize(scope.feed.status);
          element.removeClass(element.attr('class'));
          element.addClass(classAttributes);  
        }, true);
      }
  };
}]);
