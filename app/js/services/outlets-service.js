angular
  .module('socialExplosionAdmin')
  .service('outletsService', function(){
    var outlets = 
    [ 
      { "name": "Diigo",
        "enabled": true,
        "duration": null,
        "durationSelected": null,
        "durationValue": null,
        "freq": null, 
        "freqSelected": null,  
        "freqValue": null,
        "monthlyPosts": null,
        "perPost": null,
        "display": false },
      { "name": "Delicious",
        "enabled": true, 
        "duration": null,
        "durationSelected": null,
        "durationValue": null, 
        "freq": null, 
        "freqSelected": null, 
        "freqValue": null,
        "monthlyPosts": null,
        "perPost": null,
        "display": false },
      { "name": "Pinterest",
        "enabled": true, 
        "duration": null,
        "durationSelected": null,
        "durationValue": null,
        "freq": null, 
        "freqSelected": null, 
        "freqValue": null,
        "monthlyPosts": null,
        "perPost": null,
        "display": false }
    ];
    
    var setDuration = function(outlet){
      var text = null;
      var val = null;
      
      switch(outlet.durationSelected.toLowerCase()) {
        case 'low':
          text = '2-4'
          val = 3;
          break;
        case 'medium':
          text = '6-8'
          val = 7;
          break;
        case 'high':
          text = '12-15'
          val = 14;
          break;
      };
      
      outlet.duration = text;
      outlet.durationValue = val;
      outlet.display = this.shouldDisplayFooter(outlet);
    };
    
    var setFrequency = function(outlet) {
      var text = null;
      var val = null;

      switch(outlet.freqSelected.toLowerCase()) {
        case 'low':
          text = '23-25'
          val = 24;
          break;
        case 'medium':
          text = '11-13'
          val = 12;
          break;
        case 'high':
          text = '5-7'
          val = 6;
          break;
      };
      
      outlet.freq = text;
      outlet.freqValue = val;
      outlet.display = this.shouldDisplayFooter(outlet);
    };
    
    var reCalculate = function(outlets, feedCount) {
      angular.forEach(outlets, function(value, key) {
        if(value.freqValue != null && value.durationValue != null && value.status != 'disabled') {
          var hours = value.durationValue * 24;
          var posts = Math.round(hours / value.freqValue);
          var postsPerMonth = parseInt(feedCount);

          if(feedCount == null) {
            value.monthlyPosts = 0;
            value.perPost = 0;
          } else {
            value.monthlyPosts = posts * postsPerMonth;
            value.perPost = posts;
          };
        };
      });
       
      return this.addProductTotals(outlets);
    };
    
    var addProductTotals = function(outlets) {
      var totals = 0;
      
      angular.forEach(outlets, function(value, key) {
        // debugger;
        if(value.monthlyPosts != null && value.status != 'disabled') {
          totals += value.monthlyPosts;
        } else if(value.monthlyPosts != null && value.status == 'disabled') {
          totals - value.monthlyPosts;
        }
      });
      
      return totals;
    };
    
    var shouldDisplayFooter = function(outlet) {
      return outlet.enabled === true && outlet.freq != null && outlet.duration != null;
    };
    
    return {
      outlets: outlets,
      reCalculate: reCalculate,
      shouldDisplayFooter: shouldDisplayFooter,
      setDuration: setDuration,
      setFrequency: setFrequency,
      addProductTotals: addProductTotals
    }
  });
