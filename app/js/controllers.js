(function() {
  'use strict';
    
  angular
    .module('socialExplosionAdmin')
    .controller('LoginController', function ($scope, $state, $stateParams, UserService, RssFeedService, AuthenticationService, localStorageService, $rootScope) {
      
      $scope.login = function($stateParams) {              
        AuthenticationService.login($stateParams).$promise.then(function (user) {
            localStorageService.set('user', user);
            $scope.error = null;
            return $state.go('rssFeeds');
          }, function() {
            $scope.error = 'Invalid Login!';
        });
      };
    })
    
  .controller('RssFeedController', function (user, $state, $scope, RssFeedService, localStorageService) {
    if (user == null) {
      $state.go('login'); // There has to be a better way to do this
    };
    
    var feeds = RssFeedService.query({ token: user.token }, function() {
      console.log(feeds);
    });
    
    $scope.rssFeeds = feeds;
    
    $scope.toggleFeed = function(feed) {
      console.log(feed.status);
      
      if (feed.status == 'deactivated') {
        var update = feed.$update({ token: user.token, id: feed.id, rss_feed: { active: true } });
      } else if(feed.status == 'active') {
        var deactivated_on = new Date();
        feed.$update({ token: user.token, id: feed.id, rss_feed: { active: false, deactivated_on:  deactivated_on } });
      };
    };
    
    $scope.colorize = function(status) {
      if(status == 'deactivated') {
        return 'danger';
      } else if(status == 'paused') {
        return 'warning';
      };
    };
  })
  
  .controller('NewRssFeedController', function (user, outletsService, $scope, RssFeedService, $stateParams, $state) {
    if (user == null) {
      $state.go('login'); // There has to be a better way to do this
    };
    
    $scope.outlets = outletsService.outlets;
    
    $scope.feed = new RssFeedService();
    
    $scope.addRssFeed = function() {
      var settings = $scope.outlets.map(function (outlet) {
        var rObj = {};
        if((outlet.durationSelected != null) && (!outlet.freqSelected != null)) {
          rObj[outlet.name.toLowerCase()] = { reach: outlet.durationSelected.toLowerCase(), freq: outlet.freqSelected.toLowerCase() };
        } else {
          rObj[outlet.name.toLowerCase()] = { reach: '', freq: '' };
        }
        return rObj;
      });

      $scope.feed.$create({ token: user.token, rss_feed: { url: $scope.feed.url }, settings: JSON.stringify(settings) }, function() {
          $state.go('rssFeeds');
      });
    };
    
    $scope.dropDownOptions = [
      'Low',
      'Medium',
      'High'
    ];
    
    $scope.selectFrequency = function(outlet, option) {
      $scope.setFrequency(outlet, option);
    };
    
    $scope.setFrequency = function(outlet, value) {
      var text = null;
      var val = null;
      
      switch(value) {
        case 'Low':
          text = '23-25'
          val = 24;
          break;
        case 'Medium':
          text = '11-13'
          val = 12;
          break;
        case 'High':
          text = '5-7'
          val = 6;
          break;
      };
      
      outlet.freq = text;
      outlet.freqValue = val;
      outlet.freqSelected = value;
    };
    
    $scope.toggleSelection = function toggleSelection(outlet) {
      outlet.status === 'enabled' ? outlet.status = 'disabled' : outlet.status = 'enabled'
    };
    
    $scope.selectDuration = function(outlet, option) {
      $scope.setDuration(outlet, option);
    };
    
    $scope.setDuration = function(outlet, value){
      var text = null;
      var val = null;
      
      switch(value) {
        case 'Low':
          text = '2-4'
          val = 3;
          break;
        case 'Medium':
          text = '6-8'
          val = 7;
          break;
        case 'High':
          text = '12-15'
          val = 14;
          break;
      };
      
      outlet.duration = text;
      outlet.durationValue = val;
      outlet.durationSelected = value;
    };
  });
})();
