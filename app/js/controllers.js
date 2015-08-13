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
  
  
  //INDEX
  .controller('RssFeedsController', function (user, $state, $scope, RssFeedService, localStorageService) {
    if (user == null) {
      $state.go('login'); // There has to be a better way to do this
    };
    
    var feeds = RssFeedService.query({ token: user.token }, function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
    
    $scope.rssFeeds = feeds;
    $scope.user = user;
    
    $scope.toggleFeed = function(feed) {
      
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
  
  
  //SHOW
  .controller('ShowRssFeedController', function (user, $scope, $stateParams, RssFeedService, RssPromotionService, BootStrapService){
    if (user == null) {
      $state.go('login'); // There has to be a better way to do this
    };
    
    var data = RssPromotionService.query({ token: user.token, id: $stateParams.id }, function(feed) {
      console.log(feed);
    });
    
    var feed = RssFeedService.get({ token: user.token, id: $stateParams.id }, function(feed) {      
      if(feed.status == 'deactivated') {
        $scope.title = 'Click to re-activate the feed';
      } else if(feed.status == 'active') {
        $scope.title = 'Click to deactivate the feed'; 
      };
      
      var svg = dimple.newSvg("#chartContainer", '100%', 400);
      var chart = new dimple.chart(svg, data);
      chart.setBounds(0, 30, 605, 305);
      chart.setMargins(50, 20, 50, 100);
      var x = chart.addCategoryAxis("x", "date");
      x.addOrderRule("date");
      chart.addMeasureAxis("y", "promotions");
      var s = chart.addSeries(feed.name, dimple.plot.line);
      s.interpolation = "cardinal";
      chart.draw();
      
      $scope.actionButtonClass = BootStrapService.actionButtonClass(feed.status);
    });
    
    $scope.feed = feed;
    
    $scope.addToolTip = function() {
      $('[data-toggle="tooltip"]').tooltip();
    };
    
    $scope.toggleFeed = function(feed) {
      
      if (feed.status == 'deactivated') {
        var update = feed.$update({ token: user.token, id: feed.id, rss_feed: { active: true } });
      } else if(feed.status == 'active') {
        var deactivated_on = new Date();
        feed.$update({ token: user.token, id: feed.id, rss_feed: { active: false, deactivated_on:  deactivated_on } });
      };
    };
    
    $scope.toggleActiveSetting = function(id) {
      //This is not ideal, Jquery stuff in here, this could be a directive
      $('.tab-pane.active').removeClass('active');
      $('#' + id).addClass('active');
    };
    
  })

  // EDIT
  .controller('EditRssFeedController', function (user, $state, $scope, $filter, $stateParams, RssFeedService, outletsService, lodash) {
    if (user == null) {
      $state.go('login'); // There has to be a better way to do this
    };    
    
    $scope.outlets = outletsService.outlets;
    $scope.lodash = lodash;
    $scope.feedCount = null;
    $scope.notSaved = true;
    $scope.dropDownOptions = [
      'Low',
      'Medium',
      'High'
    ];
    
    var feed = RssFeedService.get({ token: user.token, id: $stateParams.id }, function(feed) {
      $scope.lodash.forEach($scope.outlets, function(outlet) {
        $scope.lodash.forEach(feed.settings, function(item) {
          if(item.name == outlet.name) {
            outlet.freqSelected = item.frequency.charAt(0).toUpperCase() + item.frequency.slice(1);
            outlet.durationSelected = item.duration.charAt(0).toUpperCase() + item.duration.slice(1);
            outletsService.setDuration(outlet);
            outletsService.setFrequency(outlet);
          }
        });
      });
      
      $scope.totals = outletsService.reCalculate($scope.outlets, $scope.feedCount);
    });
    
    $scope.feed = feed;
    
    $scope.updateRssFeed = function() {
      var settings = $scope.outlets.map(function (outlet) {
        var rObj = {};
        if(outlet.enabled && (outlet.durationSelected != null) && (outlet.freqSelected != null)) {
          rObj[outlet.name.toLowerCase()] = { reach: outlet.durationSelected.toLowerCase(), freq: outlet.freqSelected.toLowerCase() };
        } else {
          rObj[outlet.name.toLowerCase()] = { reach: '', freq: '' };
        }
        return rObj;
      });

      $scope.feed.$save({ token: user.token, rss_feed: { id: $scope.feed.id, url: $scope.feed.url, name: $scope.feed.name }, settings: JSON.stringify(settings) }, function() {
          $scope.notSaved = false;
          $scope.saved = true;
      });
    };
    
    $scope.selectFrequency = function(outlet) {
      outletsService.setFrequency(outlet);
    };
    
    $scope.selectDuration = function(outlet) {
      outletsService.setDuration(outlet);
    };
    
    $scope.toggleSelection = function(outlet) {
      outletsService.reCalculate($scope.outlets, $scope.feedCount);
    };
  })
  
  
  //NEW
  .controller('NewRssFeedController', function (user, outletsService, $scope, RssFeedService, $stateParams, $state, FeedParserService, localStorageService, lodash) {
    if (user == null) {
      $state.go('login'); // There has to be a better way to do this
    };
    
    $scope.outlets = outletsService.outlets;
    $scope.feed = new RssFeedService();
    $scope.localStorageService = localStorageService;
    $scope.lodash = lodash;
    $scope.totals = 0;
    $scope.defaults = $scope.localStorageService.get('defaults');
    $scope.displayDefaultCheckbox = true;
    
    $scope.date = '20140313T00:00:00';
    
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

      $scope.feed.$create({ token: user.token, rss_feed: { url: $scope.feed.url, name: $scope.feed.name }, settings: JSON.stringify(settings) }, function() {
          $state.go('rssFeeds');
      });
    };
    
    $scope.dropDownOptions = [
      'Low',
      'Medium',
      'High'
    ];
    
    $scope.calculate = function() {
      angular.forEach($scope.outlets, function(value, key) {
        if(value.freqValue != null && value.durationValue != null && value.status != 'disabled') {
          var hours = value.durationValue * 24;
          var posts = Math.round(hours / value.freqValue);
          var postsPerMonth = parseInt($scope.feedCount);
          // debugger;
          if($scope.feedCount == null) {
            value.monthlyPosts = 0;
            value.perPost = 0;
          } else {
            value.monthlyPosts = posts * postsPerMonth;
            value.perPost = posts;
          };
        };
      });
       
      $scope.addProductTotals();
    };
    
    $scope.addProductTotals = function() {
      var totals = 0;
      
      angular.forEach($scope.outlets, function(value, key) {
        // debugger;
        if(value.monthlyPosts != null && value.status != 'disabled') {
          totals += value.monthlyPosts;
        } else if(value.monthlyPosts != null && value.status == 'disabled') {
          totals - value.monthlyPosts;
        }
      });
      
      $scope.totals = totals;
    };
    
    $scope.selectFrequency = function(outlet) {
      var text = null;
      var val = null;
      
      switch(outlet.freqSelected) {
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
      outlet.display = $scope.displayFooter(outlet);
      $scope.calculate();
    };
    
    $scope.toggleSelection = function(outlet) {
      $scope.calculate();
    };
    
    $scope.selectDuration = function(outlet){
      var text = null;
      var val = null;
      
      switch(outlet.durationSelected) {
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
      outlet.display = $scope.displayFooter(outlet);
      $scope.calculate();
    };
    
    $scope.displayFooter = function(outlet){
      return outletsService.shouldDisplayFooter(outlet);
    };
    
    
    // RSS Feed Parsing
    $scope.inputChanged = function() {
      FeedParserService.parse($scope.feed.url).then(function(res){
        if(res.data.responseStatus == 200) {
          $scope.feedBroken = false;
          $scope.feedOk = true;
          $scope.feed.name = $scope.decodeHtml(res.data.responseData.feed.title); //TODO: Parse
          $scope.feedCount = res.data.responseData.feed.entries.length;
          $scope.calculate();
          $scope.displayCalculations = true;
        } else {
          $scope.feedBroken = true;
          $scope.feedOk = false;
        }          
      });
    };
    
    $scope.decodeHtml = function(html){
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    };
    
    $scope.setDefault = function(outlet) {
      //save the defaults somewhere and set them
      if($scope.localStorageService.get('defaults') == null) {
        var defaults = [];
        defaults.push({
          "name": outlet.name,
          "durationSelected" : outlet.durationSelected,
          "freqSelected" : outlet.freqSelected
        });
        
        $scope.localStorageService.set('defaults', defaults);
        console.log(defaults);
      } else {
        var defaults = $scope.localStorageService.get('defaults');
        
        $scope.lodash.forEach(defaults, function(item, index) {
          if(item.name == outlet.name) {
            defaults[index] = {
              "name": outlet.name,
              "durationSelected" : outlet.durationSelected,
              "freqSelected" : outlet.freqSelected
            }
          } else {
            defaults.push({
              "name": outlet.name,
              "durationSelected" : outlet.durationSelected,
              "freqSelected" : outlet.freqSelected
            })
          }
          
          $scope.localStorageService.set('defaults', defaults);
          console.log($scope.localStorageService.get('defaults'));
        });
      }
    };
    
    // This loads the defaults for each outlet
    $scope.mergeDefaults = function() {
      $scope.lodash.forEach($scope.outlets, function(outlet) {
        $scope.lodash.forEach($scope.defaults, function(item) {
          if(item.name == outlet.name) {
            outlet.freqSelected = item.freqSelected;
            outlet.durationSelected = item.durationSelected;
            $scope.selectDuration(outlet);
            $scope.selectFrequency(outlet);
          }
        });
      });
      
      $scope.calculate();
    };    
    
  });
})();
