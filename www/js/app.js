// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
  'login.controllers',
  'signup.controllers',
  'listing.controllers',
  'discover.controllers',
  'rank.controllers',
  'review.controllers',
  'me.controllers',
  'ngStorage',
  'customDirectives',
  'starter.services',
  'chart.js',
  'ksSwiper',
  'ionic.rating',
  'angular.filter',
  'nvd3',
  'angularMoment',
  'jett.ionic.filter.bar'
])


.constant('yearList', [{
  id: '0',
  name: "2000",
  value: 2000
}, {
  id: '1',
  name: "2001",
  value: 2001
}, {
  id: '2',
  name: "2002",
  value: 2002
}, {
  id: '3',
  name: "2003",
  value: 2003
}, {
  id: '4',
  name: "2004",
  value: 2004
}, {
  id: '5',
  name: "2005",
  value: 2005
}, {
  id: '6',
  name: "2006",
  value: 2006
}, {
  id: '7',
  name: "2007",
  value: 2007
}, {
  id: '8',
  name: "2008",
  value: 2008
}, {
  id: '9',
  name: "2009",
  value: 2009
}, {
  id: '10',
  name: "2010",
  value: 2010
}, {
  id: '11',
  name: "2011",
  value: 2011
}, {
  id: '12',
  name: "2012",
  value: 2012
}, {
  id: '13',
  name: "2013",
  value: 2013
}, {
  id: '14',
  name: "2014",
  value: 2014
}, {
  id: '15',
  name: "2015",
  value: 2015
}])



.constant('tagList', [{
  id: '0',
  positive: false,
  value: "照本宣科"
}, {
  id: '1',
  positive: false,
  value: "枯燥无味"
}, {
  id: '2',
  positive: true,
  value: "引人入胜"
}, {
  id: '3',
  positive: true,
  value: "富有创新"
}, {
  id: '4',
  positive: true,
  value: "氛围轻松"
}, {
  id: '5',
  positive: false,
  value: "水课一门"
}, {
  id: '6',
  positive: true,
  value: "治学严谨"
}, {
  id: '7',
  positive: true,
  value: "耐心"
}, {
  id: '8',
  positive: true,
  value: "幽默"
}, {
  id: '9',
  positive: false,
  value: "僵化刻板"
}, {
  id: '10',
  positive: true,
  value: "低调"
}, {
  id: '11',
  positive: true,
  value: "仁慈"
}, {
  id: '12',
  positive: true,
  value: "认真负责"
}, {
  id: '13',
  positive: false,
  value: "冷酷无情"
}, {
  id: '14',
  positive: true,
  value: "热情"
}, {
  id: '15',
  positive: true,
  value: "和蔼"
}, {
  id: '16',
  positive: false,
  value: "冷淡"
}, {
  id: '17',
  positive: true,
  value: "博学"
}, {
  id: '18',
  positive: true,
  value: "健谈"
}, {
  id: '19',
  positive: false,
  value: "浮夸"
}, {
  id: '20',
  positive: true,
  value: "深邃"
}, {
  id: '21',
  positive: false,
  value: "张扬"
}, ])



.run(function($ionicPlatform, $ionicPopup, $localStorage, $rootScope, $state,
  courseService) {

  var showNoConnection = function() {
    var alertPopup = $ionicPopup.alert({
      title: '无网络连接',
      template: '请确认网络连接正常后再试',
      okText: '明白了',
    });
    alertPopup.then(function(res) {
      ionic.Platform.exitApp();
    });
  };


  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins
      .Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    //hide tabs on keyboard popup
    window.addEventListener('native.keyboardshow', function() {
      document.querySelector('div.tabs').style.display = 'none';
      angular.element(document.querySelector('ion-content.has-tabs'))
        .css('bottom', 0);
    });
    window.addEventListener('native.keyboardhide', function() {
      var tabs = document.querySelectorAll('div.tabs');
      angular.element(tabs[0]).css('display', '');
    });

    if (window.Connection && navigator.connection.type == Connection.NONE) {
      showNoConnection();
    } else {
      // Initailze Leancloud MBaSS
      AV.initialize('zwjjm3MbxDYRKny9f31amkXq',
        'PczcQb9HEBCLtLj4ohJ7ePj5');

      var currentUser = AV.User.current();
      if (currentUser) {
        console.log("user info available in cache");
        $state.go("tab.listing");
      } else {
        console.log("no existing user info, go to signin/signup");
        $state.go("login");
      }

      //fetch all courses
      courseService.updateAllCourse();
    }

  });
})



.run(function(amMoment) {
  amMoment.changeLocale('zh-cn');
})


.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.tabs.style('standard');
  var jsScrolling = (ionic.Platform.isAndroid()) ? false : true;
  $ionicConfigProvider.scrolling.jsScrolling(jsScrolling);
  $ionicConfigProvider.views.forwardCache(false);
  $ionicConfigProvider.form.toggle('large');
  $ionicConfigProvider.views.transition('ios');
  $ionicConfigProvider.backButton.text('');
})

.config(function($ionicFilterBarConfigProvider) {
  $ionicFilterBarConfigProvider.transition('vertical');
  $ionicFilterBarConfigProvider.theme('positive');
  $ionicFilterBarConfigProvider.placeholder("请输入过滤用的关键词");
})



.config(function($stateProvider, $urlRouterProvider) {


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



    .state('login', {
    url: '/login',
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  })

  .state("signup", {
    url: '/signup',
    templateUrl: "signup/signup.html",
    controller: "SignupCtrl"
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'tabs/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.listing', {
      url: '/listing',
      views: {
        'tab-listing': {
          templateUrl: 'tab-listing/listing.html',
          controller: 'ListingCtrl'
        }
      }
    })
    .state('tab.listing-detail', {
      url: '/listing/{listingId}?deptId',
      views: {
        'tab-listing': {
          templateUrl: 'tab-listing/listing-detail.html',
          controller: 'ListingDetailCtrl'
        }
      }
    })
    .state('tab.listing-detail-review', {
      url: '/listing/{listingId}?deptId/review',
      views: {
        'tab-listing': {
          templateUrl: 'tab-listing/listing-detail-review.html',
          controller: 'ListingDetailReviewCtrl'
        }
      }
    })

  //a copy for the account tab (needed to due to ionic bug of state switching)
  .state('tab.listing-detail-2', {
      url: '/listing/{listingId}?deptId',
      views: {
        'tab-me': {
          templateUrl: 'tab-me/listing-detail-me.html',
          controller: 'ListingDetailCtrl'
        }
      }
    })
    .state('tab.listing-detail-review-2', {
      url: '/listing/{listingId}?deptId/review',
      views: {
        'tab-me': {
          templateUrl: 'tab-me/listing-detail-review-me.html',
          controller: 'ListingDetailReviewCtrl'
        }
      }
    })

  //a copy for the rank tab (needed to due to ionic bug of state switching)
  .state('tab.listing-detail-3', {
      url: '/listing/{listingId}?deptId',
      views: {
        'tab-rank': {
          templateUrl: 'tab-rank/listing-detail-rank.html',
          controller: 'ListingDetailCtrl'
        }
      }
    })
    .state('tab.listing-detail-review-3', {
      url: '/listing/{listingId}?deptId/review',
      views: {
        'tab-rank': {
          templateUrl: 'tab-rank/listing-detail-review-rank.html',
          controller: 'ListingDetailReviewCtrl'
        }
      }
    })


  //a copy for the discover tab (needed to due to ionic bug of state switching)
  .state('tab.listing-detail-4', {
      url: '/listing/{listingId}?deptId',
      views: {
        'tab-discover': {
          templateUrl: 'tab-discover/listing-detail-discover.html',
          controller: 'ListingDetailCtrl'
        }
      }
    })
    .state('tab.listing-detail-review-4', {
      url: '/listing/{listingId}?deptId/review',
      views: {
        'tab-discover': {
          templateUrl: 'tab-discover/listing-detail-review-discover.html',
          controller: 'ListingDetailReviewCtrl'
        }
      }
    })



  .state('tab.discover', {
    url: '/discover',
    views: {
      'tab-discover': {
        templateUrl: 'tab-discover/discover.html',
        controller: 'DiscoverCtrl'
      }
    }
  })

  .state('tab.discover-list', {
    url: '/discover/{deptId}',
    views: {
      'tab-discover': {
        templateUrl: 'tab-discover/discover-list.html',
        controller: 'DiscoverListCtrl'
      }
    }
  })


  .state('tab.rank', {
    url: '/rank',
    views: {
      'tab-rank': {
        templateUrl: 'tab-rank/rank.html',
        controller: 'RankCtrl'
      }
    }
  })

  .state('tab.rank-detail', {
    url: '/rank-detail/{rankId}?deptId',
    views: {
      'tab-rank': {
        templateUrl: 'tab-rank/rank-detail.html',
        controller: 'RankDetailCtrl'
      }
    }
  })



  .state('tab.review', {
    url: '/review',
    views: {
      'tab-review': {
        templateUrl: 'tab-review/review.html',
        controller: 'ReviewCtrl'
      }
    }
  })



  .state('tab.me', {
    url: '/me',
    views: {
      'tab-me': {
        templateUrl: 'tab-me/me.html',
        controller: 'MeCtrl'
      }
    }
  })

  .state('tab.me-profile', {
    url: '/me-profile',
    views: {
      'tab-me': {
        templateUrl: 'tab-me/profile.html',
        controller: 'MeProfileCtrl'
      }
    }
  })

  .state('tab.me-review', {
    url: '/me-review',
    views: {
      'tab-me': {
        templateUrl: 'tab-me/review.html',
        controller: 'MeReviewCtrl'
      }
    }
  })

  .state('tab.me-course', {
    url: '/me-course',
    views: {
      'tab-me': {
        templateUrl: 'tab-me/course.html',
        controller: 'MeCourseCtrl'
      }
    }
  })


  .state('tab.feedback', {
    url: '/feedback',
    views: {
      'tab-me': {
        templateUrl: 'tab-me/feedback.html',
        controller: 'MeFeedbackCtrl'
      }
    }
  })


  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/login.html');

});

/*
//needs server-side modification, otherwise refresh will not work
.config(['$locationProvider', function($locationProvider) {
  if(window.history && window.history.pushState){
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
}])*/
