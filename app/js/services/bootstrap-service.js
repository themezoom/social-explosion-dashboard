(function () {
  'use strict';

  function BootStrapService() {
    this.colorize = function(status) {
      var color = null;
      if(status == 'deactivated') {
        color = 'danger';
      } else if(status == 'paused') {
        color = 'warning';
      };
      
      return color;
    },
    
    this.icon = function(status) {      
      return (status == 'active') ? 'glyphicon glyphicon-remove' : 'glyphicon glyphicon-play';
    },
    
    this.changeIcon = function(kind, element) {
      var classAttributes = BootStrapService.icon(attrs.action, $scope.feed.status);
      element.addClass(classAttributes);
    }
  }

  angular
    .module('socialExplosionAdmin')
    .service('BootStrapService', BootStrapService);
  
})();
