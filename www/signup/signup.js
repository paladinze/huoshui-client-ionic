angular.module('signup.controllers', [])

.controller('SignupCtrl', function($scope, $state, $http, $localStorage,
  $filter,
  yearList, deptService,
  $ionicModal, $ionicPopup, $ionicHistory, $ionicActionSheet, $ionicLoading
) {

  /*----------------------------------------------------------------
  Loading indicator
  -----------------------------------------------------------------*/
  var showLoading = function() {
    $ionicLoading.show({
      content: 'Sending',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
  };

  var hideLoading = function() {
    $ionicLoading.hide();
  };


  /*----------------------------------------------------------------
  Modal Control (year selection)
  -----------------------------------------------------------------*/
  $scope.yearOptions = yearList;
  $scope.yearLimit = 1;
  $scope.yearChecked = 0;
  $scope.yearCheckChanged = function(year) {
    if (year.checked) {
      $scope.yearChecked++;
      $scope.user.year = year.value;
    } else {
      $scope.yearChecked--;
      $scope.user.year = '';
    }
  };

  $ionicModal.fromTemplateUrl('signup/modal_year.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal_year = modal;
  });

  $scope.modalYearComplete = function() {
    $scope.modal_year.hide();
  };

  /*----------------------------------------------------------------
  Modal Control (dept selection)
  -----------------------------------------------------------------*/
  $scope.deptOptions = deptService.getDeptList();
  $scope.deptLimit = 1;
  $scope.deptChecked = 0;
  $scope.deptCheckChanged = function(dept) {
    if (dept.checked) {
      $scope.deptChecked++;
      $scope.user.dept = dept.value;
    } else {
      $scope.deptChecked--;
      $scope.user.dept = '';
    }
  };


  $ionicModal.fromTemplateUrl('signup/modal_dept.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal_dept = modal;
  });

  $scope.modalDeptComplete = function() {
    $scope.modal_dept.hide();
  };



  /*----------------------------------------------------------------
  navigation
  -----------------------------------------------------------------*/

  $scope.gotoLogin = function() {
    $state.go("login");
  };



  /*----------------------------------------------------------------
  signup control
  -----------------------------------------------------------------*/
  $scope.user = {
    dept: '',
    year: '',

  };

  $scope.signup = function() {
    console.log("signup!");
    showLoading();

    var user = new AV.User();
    user.set("username", $scope.user.username);
    user.set("email", $scope.user.email);
    user.set("password", $scope.user.password);
    user.set("dept", $scope.user.dept);
    user.set("year", $scope.user.year);

    user.signUp(null, {
      success: function(user) {
        hideLoading();

        //forget this view after logged in
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        $state.go("tab.listing");

      },
      error: function(user, error) {
        hideLoading();

        console.log("Error: " + error.code + " " + error.message);
        if (error.code === 202) {
          showDuplicateEmailFailure();
          console.log("202");
        } else if (error.code === 203) {
          showDuplicateUsernameFailure();
          console.log("203");
        } else {
          showSignupFailure();
        }
      }
    });

  };

  /*----------------------------------------------------------------
  Popoup : duplicate username failure (error: 202)
  -----------------------------------------------------------------*/
  var showDuplicateEmailFailure = function() {
    var alertPopup = $ionicPopup.alert({
      title: '注册失败',
      template: '该昵称已被占用',
      okText: '明白了',
    });
    alertPopup.then(function(res) {});
  };
  /*----------------------------------------------------------------
    Popoup : duplicate email failure (error: 203)
    -----------------------------------------------------------------*/
  var showDuplicateUsernameFailure = function() {
    var alertPopup = $ionicPopup.alert({
      title: '注册失败',
      template: '该邮箱已被占用',
      okText: '明白了',
    });
    alertPopup.then(function(res) {});
  };
  /*----------------------------------------------------------------
    Popoup : signup failure (general)
    -----------------------------------------------------------------*/
  var showSignupFailure = function() {
    var alertPopup = $ionicPopup.alert({
      title: '注册失败',
      template: '请确认注册信息输入无误',
      okText: '明白了',
    });
    alertPopup.then(function(res) {});
  };


});
