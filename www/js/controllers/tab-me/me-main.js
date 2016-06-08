angular.module('me.controllers')


.controller('MeCtrl', function($scope, $state, $localStorage, $ionicHistory,
  popupService, $timeout) {

  /*----------------------------------------------------------------
  Access Control
  -----------------------------------------------------------------*/
  $scope.$on('$ionicView.enter', function() {
    if (AV.User.current().get('username') === '游客') {
      popupService.showAccessControlAndExit();
    }
  });



  /*----------------------------------------------------------------
  Navigation
  -----------------------------------------------------------------*/
  $scope.gotoProfile = function() {
    $state.go("tab.me-profile");
  };
  $scope.gotoReview = function() {
    $state.go("tab.me-review");
  };
  $scope.gotoLikedCourses = function() {
    $state.go("tab.me-course");
  };
  $scope.gotoVote = function() {
    $state.go("tab.me-vote");
  };
  $scope.gotoFeedback = function() {
    $state.go("tab.feedback");
  };
  $scope.gotoChatList = function() {
    $state.go("tab.me-chat-list");
  };
  /*----------------------------------------------------------------
  Initialization
  -----------------------------------------------------------------*/
  $scope.user = {
    username: AV.User.current().get('username'),
    dept: AV.User.current().get('dept'),
    year: AV.User.current().get('year'),
    email: AV.User.current().get('email'),
  };


  /*----------------------------------------------------------------
  Logout control
  -----------------------------------------------------------------*/
  $scope.logout = function() {
    console.log("logout!");

    AV.User.logOut();

    //forget this view after logged out
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });

    $timeout(function() {
      $ionicHistory.clearCache();
      $ionicHistory.clearHistory();
    }, 300);


    //$ionicHistory.clearHistory();
    //$ionicHistory.clearCache();
    $state.go("login");
  };

});
