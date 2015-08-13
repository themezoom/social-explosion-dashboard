(function () {
  'use strict';

  function BootStrapService() {
    this.colorize = function(status) {
      var color = null;
      if(status == 'deactivated') {
        color = 'danger';
      } else if(status == 'paused') {
        color = 'warning';
      } else if(status == 'active') {
        color = 'success'; 
      };
      
      return color;
    },
    
    this.icon = function(status) {
      var css = 'glyphicon '
      
      switch(status) {
        case undefined:
          break;
        case 'active':
          css += 'glyphicon-remove';
          break;
        case 'paused':
          css += 'glyphicon-remove';
          break;
        case 'deactivated':
          css += 'glyphicon-play';
          break;
      };

      return css;
    },
    
    this.changeIcon = function(kind, element) {
      var classAttributes = BootStrapService.icon(attrs.action, $scope.feed.status);
      element.addClass(classAttributes);
    },
    
    this.actionButtonClass = function(status) {
      var css = 'btn btn-sm '
      
      switch(status) {
        case undefined:
          break;
        case 'active':
          css += 'btn-danger';
          break;
        case 'paused':
          css += 'btn-danger';
          break;
        case 'deactivated':
          css += 'btn-success';
          break;
      };

      return css;
    }
  }

  angular
    .module('socialExplosionAdmin')
    .service('BootStrapService', BootStrapService);
  
})();
