angular.module('review.controllers', [])



.controller('ReviewCtrl', function($ionicModal, $localStorage, $ionicPopup,
  $ionicHistory, $ionicScrollDelegate, tagList,
  $scope, $rootScope, $state, $stateParams, $filter, popupService) {

  $scope.$on('course-add-success', function(event, args) {
    $scope.startSearch();
  });
  $scope.showUserAddCourseForm = function() {

    if (AV.User.current().get('username') === '游客') {
      popupService.showAccessControl();
    } else {
      popupService.showUserAddCourseForm();
    }
  };

  /*----------------------------------------------------------------
  Access Control
  -----------------------------------------------------------------*/
  $scope.$on('$ionicView.enter', function() {
    if (AV.User.current().get('username') === '游客') {
      popupService.showAccessControlAndExit();
    }
  });



  /*----------------------------------------------------------------
  Initialization
  -----------------------------------------------------------------*/

  //get localStorage
  $storage = $localStorage;

  //get URL state params
  $scope.reviewTarget = {};

  //enumerate options
  $scope.tagOptions = [];
  angular.copy(tagList, $scope.tagOptions);


  /*----------------------------------------------------------------
  search control
  -----------------------------------------------------------------*/
  $scope.showUserAddCoursePrompt = false;
  $scope.$storage = $localStorage;
  $scope.searchText = {};
  var filterdCourses = [];
  $scope.displayCourses = [];
  $scope.noMorePost = false;
  $scope.showPromoContent = true;
  var loadLength = 15;

  $scope.cancelSearch = function() {
    console.log("cancel search");
    $scope.searchText.text = '';
    $scope.showPromoContent = true;
    $scope.noMorePost = true;
  };

  $scope.startSearch = function() {
    filterdCourses = $filter('filter')($scope.$storage.courses, $scope.searchText
      .text);
    $scope.displayCourses = filterdCourses.slice(0, loadLength);
    $scope.noMorePost = false;
    if ($scope.searchText.text.length !== 0) {
      $scope.showPromoContent = false;
    } else {
      $scope.showPromoContent = true;
      $scope.noMorePost = true;
    }
    console.log("attempt searching, course length:" + filterdCourses.length);

  };

  $scope.loadMore = function() {
    var resultLength = filterdCourses.length;
    var displayLength = $scope.displayCourses.length;
    console.log("result length:" + filterdCourses.length);
    console.log("display length:" + $scope.displayCourses.length);

    if (displayLength == resultLength) {
      $scope.noMorePost = true;
      $scope.showUserAddCoursePrompt = true;
      console.log("no more to add");
    } else {
      $scope.showUserAddCoursePrompt = false;
      var newData = filterdCourses.slice(displayLength, displayLength +
        loadLength);
      for (var i = 0; i < newData.length; ++i) {
        $scope.displayCourses.push(newData[i]);
      }
      $scope.$broadcast('scroll.infiniteScrollComplete');
      console.log("add more, new length is: " + $scope.displayCourses.length);
      //$scope.noMorePost = false;
    }

  };



  /*----------------------------------------------------------------
  Model Data
  -----------------------------------------------------------------*/

  $scope.birdInfo = {
    allOptions: [{
      id: '0',
      name: "未填",
      value: 0
    }, {
      id: '1',
      name: "绝非水课",
      value: 1
    }, {
      id: '2',
      name: "正常水平",
      value: 2
    }, {
      id: '3',
      name: "有点水分",
      value: 3
    }, {
      id: '4',
      name: "水得不行",
      value: 4
    }, ],
    selectedOption: {
      id: '0',
      name: "未填",
      value: 0
    }
  };


  $scope.attendanceInfo = {
    allOptions: [{
      id: '0',
      name: "未填",
      value: 0
    }, {
      id: '1',
      name: "无",
      value: 1
    }, {
      id: '2',
      name: "少",
      value: 2
    }, {
      id: '3',
      name: "中",
      value: 3
    }, {
      id: '4',
      name: "多",
      value: 4
    }, ],
    selectedOption: {
      id: '0',
      name: "未填",
      value: 0
    }
  };

  $scope.homeworkInfo = {
    allOptions: [{
      id: '0',
      name: "未填",
      value: 0
    }, {
      id: '1',
      name: "无",
      value: 1
    }, {
      id: '2',
      name: "少",
      value: 2
    }, {
      id: '3',
      name: "中",
      value: 3
    }, {
      id: '4',
      name: "多",
      value: 4
    }, ],
    selectedOption: {
      id: 0,
      name: "未填",
      value: 0
    }
  };

  $scope.examInfo = {
    touched: false,
    examprep: {
      id: '0',
      name: '划重点',
      checked: false,
      touched: false
    },
    openbook: {
      id: '1',
      name: '开卷',
      checked: false,
      touched: false
    },
    oldquestion: {
      id: '2',
      name: '原题',
      checked: false,
      touched: false
    },
    easiness: {
      id: '3',
      name: '给分',
      checked: false,
      touched: false
    }
  };
  $scope.examSetTouched = function(inputId) {
    console.log("exam modified");
    $scope.examInfo.touched = true;
    if (inputId == 'A') {
      $scope.examInfo.examprep.touched = true;
    }
    if (inputId == 'B') {
      $scope.examInfo.openbook.touched = true;
    }
    if (inputId == 'C') {
      $scope.examInfo.oldquestion.touched = true;
    }
    if (inputId == 'D') {
      $scope.examInfo.easiness.touched = true;
    }
  };
  $scope.examReset = function(examEnabled) {
    $ionicScrollDelegate.scrollBottom(true);
    console.log(examEnabled);
    if (!examEnabled) {
      $scope.examInfo.examprep.checked = false;
      $scope.examInfo.openbook.checked = false;
      $scope.examInfo.oldquestion.checked = false;
      $scope.examInfo.easiness.checked = false;
    } else {}
  };



  $scope.grade = 1;
  $scope.reviewRating = {
    rate1: 3,
    rate2: 3,
    rate3: 3,
    overall: 9
  };
  $scope.reviewGrade = '中评';
  $scope.updateOverallRating = function() {
    $scope.reviewRating.overall = ($scope.reviewRating.rate1 + $scope.reviewRating
      .rate2 + $scope.reviewRating.rate3);

    if ($scope.reviewRating.overall <= 7) {
      $scope.grade = 0;
      $scope.reviewGrade = '差评';
    } else if ($scope.reviewRating.overall >= 11) {
      $scope.grade = 2;
      $scope.reviewGrade = '好评';
    } else {
      $scope.grade = 1;
      $scope.reviewGrade = '中评';
    }


  };



  $scope.reviewComment = {
    text: '',
  };
  $scope.reviewTags = [];


  /*----------------------------------------------------------------
  Modal Target Selection
  -----------------------------------------------------------------*/
  $ionicModal.fromTemplateUrl('tab-review/modal_target.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal_target = modal;
  });

  $scope.modalTargetComplete = function() {
    $scope.modal_target.hide();
  };
  $scope.setReviewTarget = function(course) {
    $scope.reviewTarget = course;
    $scope.modal_target.hide();
  };


  /*----------------------------------------------------------------
  Modal Tags
  -----------------------------------------------------------------*/

  //modal:tags selection
  $scope.limit = 3;
  $scope.checked = 0;
  $scope.checkChanged = function(tag) {
    if (tag.checked) {
      $scope.checked++;
      $scope.reviewTags.push(tag);
    } else {
      $scope.checked--;
      var index = $scope.reviewTags.indexOf(tag);
      if (index > -1) {
        $scope.reviewTags.splice(index, 1);
      }
    }
    console.log($scope.reviewTags);
  };
  $ionicModal.fromTemplateUrl('tab-listing/modal_tag.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal_tag = modal;
  });

  $scope.modalTagComplete = function() {
    $scope.modal_tag.hide();
  };


  /*----------------------------------------------------------------
  submission
  -----------------------------------------------------------------*/
  //popup (submission confirmation)
  var showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: '发送评价',
      template: '一位老师的课只能评一次，你的发言将成为大家的参考，请认真对待噢！',
      okText: '确定',
      cancelText: '取消'
    });
    confirmPopup.then(function(res) {
      if (res) {

        //check if courseId exist in users' past reviews
        var user = AV.User.current();
        var relation = user.relation("myReviews");
        var query = relation.query();
        query.equalTo("courseId", {
          "__type": "Pointer",
          "className": "Courses",
          "objectId": $scope.reviewTarget.objectId
        });
        query.find({
          success: function(list) {
            if (list.length === 0) {
              //submit the review
              var Review = AV.Object.extend("Reviews");
              var review = new Review();
              review.set('authorId', {
                "__type": "Pointer",
                "className": "_User",
                "objectId": AV.User.current().id
              });
              review.set('courseId', {
                "__type": "Pointer",
                "className": "Courses",
                "objectId": $scope.reviewTarget.objectId
              });
              review.set("profName", $scope.reviewTarget.prof);
              review.set("courseName", $scope.reviewTarget.name);
              review.set('rating', $scope.reviewRating);
              review.set('tags', angular.fromJson(angular.toJson(
                $scope.reviewTags)));
              review.set('bird', $scope.birdInfo.selectedOption);
              review.set('attendance', $scope.attendanceInfo.selectedOption);
              review.set('homework', $scope.homeworkInfo.selectedOption);
              review.set('comment', $scope.reviewComment.text);
              review.set('exam', $scope.examInfo);
              review.set('upVote', 0);
              review.set('downVote', 0);

              review.save(null, {
                success: function(review) {
                  showSuccess();
                  //add review to user relation
                  relation.add(review);
                  user.save();

                  //reset input
                  resetInputs();

                },
                error: function(review, error) {
                  showFailure();
                  //alert("Error: " + error.code + " " + error.message);
                }
              });


            } else {
              //show failure
              showPostDuplicate();
            }
          }
        });

      } else {
        console.log('You are not sure');
      }
    });
  };


  /*----------------------------------------------------------------
  reset input
  -----------------------------------------------------------------*/
  function resetInputs() {
    $scope.reviewTarget = {};
    $scope.grade = 1;
    $scope.reviewGrade = '中评';
    $scope.reviewRating = {
      rate1: 3,
      rate2: 3,
      rate3: 3,
      overall: 9
    };
    $scope.reviewComment.text = '';
    $scope.reviewTags = [];

    $scope.tagOptions = [];
    angular.copy(tagList, $scope.tagOptions);


    $scope.attendanceInfo.selectedOption = {
      id: '0',
      name: "未填",
      value: 0
    };
    $scope.homeworkInfo.selectedOption = {
      id: '0',
      name: "未填",
      value: 0
    };
    $scope.birdInfo.selectedOption = {
      id: '0',
      name: "未填",
      value: 0
    };

    $scope.examInfo.touched = false;
    $scope.examInfo.examprep.touched = false;
    $scope.examInfo.openbook.touched = false;
    $scope.examInfo.oldquestion.touched = false;
    $scope.examInfo.easiness.touched = false;

    $scope.examInfo.examprep.checked = false;
    $scope.examInfo.openbook.checked = false;
    $scope.examInfo.oldquestion.checked = false;
    $scope.examInfo.easiness.checked = false;

  }


  //popup (validation failure alert)
  var showAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: '信息不全',
      template: '请填写短评选项！',
      okText: '知道了',

    });
    alertPopup.then(function(res) {});
  };

  //popup (submission failure)
  var showFailure = function() {
    var failurePopup = $ionicPopup.alert({
      title: '提交失败，请稍后再试',
      //template: '请填写短评选项！',
      okText: '确定',

    });
    successPopup.then(function(res) {

    });
  };

  //popup (submission failure)
  var showPostDuplicate = function() {
    var failurePopup = $ionicPopup.alert({
      title: '提交失败，每节课只能点评一次',
      //template: '请填写短评选项！',
      okText: '确定',

    });
    successPopup.then(function(res) {

    });
  };


  //popup (submission sucess)
  var showSuccess = function() {
    var successPopup = $ionicPopup.alert({
      title: '评价已收到，谢谢你的参与！',
      template: '感谢你为民主事业添砖加瓦！',
      okText: '确定',

    });
    successPopup.then(function(res) {
      $ionicHistory.goBack();
    });
  };


  //submission button
  $scope.submitEntry = function() {
    if ($scope.reviewComment.text === '') {
      showAlert();
    } else {
      showConfirm();
    }

  };



});
