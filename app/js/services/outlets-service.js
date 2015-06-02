angular
  .module('socialExplosionAdmin')
  .service('outletsService', function(){
    var outlets = 
    [ 
      { "name": "Diigo",
                 "status": "enabled",
                 "duration": null,
                 "durationValue": null,
                 "freq": null, 
                 "freqSelected": null,  
                 "freqValue": null,
                 "durationSelected": null,
                 "monthlyPosts": null,
                 "perPost": null },
      { "name": "Delicious",
                 "status": "enabled", 
                 "duration": null,
                 "durationValue": null, 
                 "freq": null, 
                 "freqSelected": null, 
                 "freqValue": null,
                 "durationSelected": null,
                 "monthlyPosts": null,
                 "perPost": null },
      { "name": "Pinterest",
                 "status": "enabled", 
                 "duration": null,
                 "durationValue": null,
                 "freq": null, 
                 "freqSelected": null, 
                 "freqValue": null,
                 "durationSelected": null,
                 "monthlyPosts": null,
                 "perPost": null },
      { "name": "Twitter",
                 "status": "enabled", 
                 "duration": null, 
                 "durationValue": null,
                 "freq": null, 
                 "freqSelected": null, 
                 "freqValue": null,
                 "durationSelected": null,
                 "monthlyPosts": null,
                 "perPost": null } 
    ];
    
    return {
      outlets: outlets
    }
  });
