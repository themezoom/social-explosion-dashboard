(function() {
  'use strict';
  
  function AuthenticationService(UserService, localStorageService) {
    this.login = function (params) {
      return UserService.get({ token: params.token, email: params.email });
    },
  
    this.loggedIn = function () {
      return localStorageService.get('user');
    }
  }
  
  angular
    .module('socialExplosionAdmin')
    .service('AuthenticationService', AuthenticationService);
  
})();
