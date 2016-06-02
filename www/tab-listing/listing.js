angular.module('listing.controllers', [])


.controller('ListingCtrl', function($scope, $rootScope, $state, $timeout,
  $localStorage, $filter,
  reviewService, popupService, $ionicScrollDelegate) {


  $scope.$storage = $localStorage;


  /*----------------------------------------------------------------
  refresh floating button
  -----------------------------------------------------------------*/
  $scope.refreshButton = false;
  $scope.refreshNewPost = function() { //ng-click for back to top button
    reviewService.clearNewPost();
    reviewService.fetechMoreNewPost();


  };


  /*----------------------------------------------------------------
  Scroll to top floating button
  -----------------------------------------------------------------*/
  $scope.sttButton = false;
  $scope.scrollToTop = function() { //ng-click for back to top button
    $ionicScrollDelegate.scrollTop(true);
    $scope.sttButton = false; //hide the button when reached top
  };

  $scope.getScrollPosition = function() {
    //monitor the scroll
    var moveData = $ionicScrollDelegate.getScrollPosition().top;
    // console.log(moveData);
    $scope.$apply(function() {
      if (moveData < 100) {
        $scope.refreshButton = true;
        $scope.sttButton = false;
      } else if (moveData > 250) {
        $scope.refreshButton = false;
        $scope.sttButton = true;
      } else {
        $scope.refreshButton = false;
        $scope.sttButton = false;
      }
    }); //apply
  };


  /*----------------------------------------------------------------
  Fetch Data for Preview
  -----------------------------------------------------------------*/
  $scope.newPost = reviewService.getNewPost();
  $scope.goodPost = reviewService.getGoodPost();

  $scope.fetchStatus = reviewService.getFetchStatus();

  $scope.active = 'newPost';
  $scope.isActive = function(type) {
    return type === $scope.active;
  };

  $scope.setFetchOption = function(type) {
    $scope.active = type;
    if (type === 'newPost') {
      $scope.fetechMoreNewPost();
    } else if (type === 'goodPost') {
      $scope.fetechMoreGoodPost();
    }
  };

  $scope.fetechMoreGoodPost = function() {
    console.log("super Good fetch");
    reviewService.fetechMoreGoodPost();
  };

  $scope.fetechMoreNewPost = function() {
    console.log("super New fetch");
    reviewService.fetechMoreNewPost();
  };

  $scope.gotoProfReview = function(review) {
    $state.go('tab.listing-detail', {
      'listingId': review.profName,
      'deptId': review.dept
    });
  };

  /*----------------------------------------------------------------
  search control
  -----------------------------------------------------------------*/
  $scope.showUserAddCoursePrompt = false;
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


})



.controller('ListingDetailCtrl', function($scope, $rootScope, $state,
  $stateParams, $localStorage, $ionicPopup, $filter, popupService,
  $location) {

  /*----------------------------------------------------------------
  parse stateParams
  -----------------------------------------------------------------*/



  /*----------------------------------------------------------------
  no post placeholder
  -----------------------------------------------------------------*/
  $scope.showNoPostPlaceholder = false;



  /*----------------------------------------------------------------
  show sharing options
  -----------------------------------------------------------------*/
  $scope.sharingOptions = {
    img: 'http://localhost:8100/img/logo.png',
    prof: $stateParams.listingId
  };

  $scope.showSharingOptions = function() {
    var alertPopup = $ionicPopup.alert({
      title: '分享选项',
      scope: $scope,
      templateUrl: 'common/sharing-options.html',
      okText: '分享完成',
    });
    alertPopup.then(function(res) {});
  };



  /*----------------------------------------------------------------
  Add course to personal collection
  -----------------------------------------------------------------*/

  $scope.addToCollection = function() {

    //access control
    var username = AV.User.current().get('username');
    if (username === '游客') {
      popupService.showAccessControl();
    } else {
      console.log("try adding course to collection");
      var currCourse = $filter('filterBy')($storage.courses, ['prof'],
        $scope.listingId)[0];
      console.log(currCourse.objectId);


      var user = AV.User.current();
      var relation = user.relation("likedCourses");

      var Courses = AV.Object.extend("Courses");
      var query = new AV.Query(Courses);
      query.equalTo("objectId", currCourse.objectId);
      query.find({
        success: function(course) {
          relation.add(course);
          user.save();
          showAddedToCollection();
        },
        error: function(course, error) {
          showAddToCollectionFailure();
          //alert("Error: " + error.code + " " + error.message);
        }
      });
    }

  };
  //popup (submission sucess)
  var showAddedToCollection = function() {
    var successPopup = $ionicPopup.alert({
      title: '关注成功！',
      template: '您可以在“设置”页面查看关注内容',
      okText: '知道了',

    });
    successPopup.then(function(res) {});
  };
  var showAddToCollectionFailure = function() {
    var successPopup = $ionicPopup.alert({
      title: '喔喔，关注失败',
      template: '请稍后再试',
      okText: '知道了',

    });
    successPopup.then(function(res) {});
  };



  /*----------------------------------------------------------------
  Like and dislike control
  -----------------------------------------------------------------*/

  $scope.upVoteIncrement = function(review, isLike) {

    var username = AV.User.current().get('username');
    if (username === '游客') {
      popupService.showAccessControl();
    } else {
      var reviewId = review.id;
      var Post = AV.Object.extend("Reviews");
      var query = new AV.Query(Post);

      query.get(reviewId, {
        success: function(post) {

          if (isLike && !review.voted) {
            //optimistically update local view
            review.upVote++;
            review.voted = true;
            $scope.$apply();


            //check if already liked
            var user = AV.User.current();
            var relation = user.relation("likedReviews");
            var query = relation.query();
            query.equalTo("objectId", reviewId);
            query.find({
              success: function(list) {
                if (list.length === 0) {
                  //alert("upvote successful");
                  //increment like counter
                  post.increment("upVote");
                  post.save();

                  //add post to user relation
                  relation.add(post);
                  user.save();
                } else {
                  //alert("already upvoted");
                  showAlreadyLikedDisliked();
                  review.upVote--;
                  $scope.$apply();
                }
              }
            });


          } else if (!isLike && !review.voted) {

            review.downVote++;
            review.voted = true;
            $scope.$apply();

            //check if already disliked
            var user = AV.User.current();
            var relation = user.relation("dislikedReviews");
            var query = relation.query();
            query.equalTo("objectId", reviewId);
            query.find({
              success: function(list) {
                if (list.length === 0) {
                  //alert("downvote successful");
                  //increment like counter
                  post.increment("downVote");
                  post.save();

                  //add post to user relation
                  relation.add(post);
                  user.save();
                } else {
                  //alert("already downvoted");
                  showAlreadyLikedDisliked();
                  review.downVote--;
                  $scope.$apply();
                }
              }
            });
          }
        },
        error: function(object, error) {
          console.log(object);
        }
      });
    }
  };

  //popup (submission sucess)
  var showAlreadyLikedDisliked = function() {
    var successPopup = $ionicPopup.alert({
      title: '抱歉，您已经赞或踩过一次了！',
      //template: '请填写短评选项！',
      okText: '知道了',

    });
    successPopup.then(function(res) {});
  };


  /*----------------------------------------------------------------
  Initialization and Navigation
  -----------------------------------------------------------------*/
  $storage = $localStorage;
  var postStartPoint = 0;
  var postEndPoint = 0;
  $scope.listingId = $stateParams.listingId;
  $scope.deptId = $stateParams.deptId;
  console.log($stateParams);


  $scope.gotoDetailReview = function(currTab) {
    //access control
    var username = AV.User.current().get('username');
    if (username === '游客') {
      popupService.showAccessControl();
    } else {
      if (currTab === 'listing') {
        $state.go('tab.listing-detail-review', {
          'listingId': $scope.listingId,
          'deptId': $scope.deptId
        });
      } else if (currTab === 'discover') {
        $state.go('tab.listing-detail-review-4', {
          'listingId': $scope.listingId,
          'deptId': $scope.deptId
        });
      } else if (currTab === 'rank') {
        $state.go('tab.listing-detail-review-3', {
          'listingId': $scope.listingId,
          'deptId': $scope.deptId
        });
      }
    }

  };



  // $scope.profCourses = $filter('filterBy')($storage.courses,['prof'],$scope.listingId);

  $scope.profCourses = $filter('where')($storage.courses, {
    'prof': $scope.listingId
  });
  if ($scope.deptId) {
    $scope.profCourses = $filter('where')($scope.profCourses, {
      'dept': $scope.deptId
    });
  }



  $scope.noOldPosts = false;

  $scope.reviewStats = {
    "ratingOverall": 0,
    "ratingCount": 0,
    "rate1Avg": 0,
    "rate2Avg": 0,
    "rate3Avg": 0,
    "rateGoodCount": 0,
    "rateMidCount": 0,
    "rateBadCount": 0,
    "birdOverall": "未知",
    "attendanceOverall": "未知",
    "homeworkOverall": "未知",
    "examOverall": "未知"
  };

  var updateReviewStats = function() {
    AV.Cloud.run('getProfStats', {
      "profName": $scope.listingId,
      "dept": $scope.deptId
    }, {
      success: function(res) {
        $scope.reviewStats.ratingOverall = res.rating.rateOverall;
        $scope.reviewStats.ratingCount = res.rating.rateCount;
        $scope.reviewStats.rate1Avg = $filter('number')(res.rating.rate1Avg,
          1);
        $scope.reviewStats.rate2Avg = $filter('number')(res.rating.rate2Avg,
          1);
        $scope.reviewStats.rate3Avg = $filter('number')(res.rating.rate3Avg,
          1);

        $scope.reviewStats.rateGoodCount = res.rating.rateGoodCount;
        $scope.reviewStats.rateMidCount = res.rating.rateMidCount;
        $scope.reviewStats.rateBadCount = res.rating.rateBadCount;
        var goodRatio = $scope.reviewStats.rateGoodCount / $scope.reviewStats
          .ratingCount;
        goodRatio = $filter('number')(goodRatio, 2);

        var birdOverall = Math.round(res.bird.overall);
        if (birdOverall == 4) {
          $scope.reviewStats.birdOverall = "超级水";
        } else if (birdOverall == 3) {
          $scope.reviewStats.birdOverall = "较高";
        } else if (birdOverall == 2) {
          $scope.reviewStats.birdOverall = "正常";
        } else if (birdOverall == 1) {
          $scope.reviewStats.birdOverall = "不水";
        }

        var attendanceOverall = Math.round(res.attendance.overall);
        if (attendanceOverall == 4) {
          $scope.reviewStats.attendanceOverall = "点名狂";
        } else if (attendanceOverall == 3) {
          $scope.reviewStats.attendanceOverall = "时常";
        } else if (attendanceOverall == 2) {
          $scope.reviewStats.attendanceOverall = "偶尔";
        } else if (attendanceOverall == 1) {
          $scope.reviewStats.attendanceOverall = "不点";
        }

        var homeworkOverall = Math.round(res.homework.overall);
        if (homeworkOverall == 4) {
          $scope.reviewStats.homeworkOverall = "没有";
        } else if (homeworkOverall == 3) {
          $scope.reviewStats.homeworkOverall = "较少";
        } else if (homeworkOverall == 2) {
          $scope.reviewStats.homeworkOverall = "较多";
        } else if (homeworkOverall == 1) {
          $scope.reviewStats.homeworkOverall = "堆成山";
        }

        var examOverall = Math.round(res.exam.overall);
        if (examOverall == 4) {
          $scope.reviewStats.examOverall = "容易";
        } else if (examOverall == 3) {
          $scope.reviewStats.examOverall = "正常";
        } else if (examOverall == 2) {
          $scope.reviewStats.examOverall = "较难";
        } else if (examOverall == 1) {
          $scope.reviewStats.examOverall = "费劲";
        }

        $scope.barData = [
          [$scope.reviewStats.rate1Avg, $scope.reviewStats.rate2Avg,
            $scope.reviewStats.rate3Avg
          ]
        ];

        $scope.pieData = [{
          key: "好评数",
          y: $scope.reviewStats.rateGoodCount
        }, {
          key: "中评数",
          y: $scope.reviewStats.rateMidCount
        }, {
          key: "差评数",
          y: $scope.reviewStats.rateBadCount
        }];

        $scope.pieOption = {
          chart: {
            type: 'pieChart',
            title: goodRatio * 100 + '%',
            donut: true,
            width: 95,
            height: 80,
            x: function(d) {
              return d.key;
            },
            y: function(d) {
              return d.y;
            },
            showLabels: false,
            showLegend: false,
            transitionDuration: 500,
            labelThreshold: 0.01,
            margin: {
              top: 0,
              right: 0,
              left: 0,
              bottom: 0
            },
            color: ['rgba(248,66,67, 1.0)',
              'rgba(143,181,200, 1.0)',
              'rgba(216,216,216, 1.0)'
            ]
          }
        };
        console.log("stats updated!");

        $scope.$apply();
      },
      error: function(err) {
        //alert("Error: " + error.code + " " + error.message);
      }
    });
  };
  //updateReviewStats();



  //on entering view
  $scope.$on('$ionicView.enter', function() {
    //fix to chart disappearing issue
    var event = document.createEvent('Event');
    event.initEvent('resize', true, true);
    window.dispatchEvent(event);

    updateReviewStats();
  });



  /*----------------------------------------------------------------
  Pull to refresh
  -----------------------------------------------------------------*/
  $scope.doRefresh = function() {
    updateReviewStats();

    var refreshLimit = 3;
    var newData = [];
    var Reviews = AV.Object.extend("Reviews");
    var query = new AV.Query(Reviews);
    query.equalTo("profName", $scope.listingId);
    query.limit(refreshLimit);
    query.include("authorId");
    query.descending("createdAt");
    if (postStartPoint !== 0) {
      query.greaterThan("createdAt", postStartPoint);
    }
    query.find().then(
      function(results) {

        if (results.length !== 0)
          postStartPoint = results[0].createdAt;

        for (var i = 0; i < results.length; i++) {
          var object = results[i];
          var overallRating = object.get('rating').overall;
          var grade = 1;
          if (overallRating <= 7) {
            grade = 0;
          } else if (overallRating >= 11) {
            grade = 2;
          }

          //determine if tags field should be displayed
          var showTags = true;
          if (object.get('tags').length > 0) {
            showTags = true;
          } else {
            showTags = false;
          }

          newData.push({
            id: object.id,
            authorName: object.get('authorId').get("username"),
            authorDept: object.get('authorId').get("dept"),
            authorYear: object.get('authorId').get("year"),
            courseName: object.get('courseName'),
            comment: object.get('comment'),
            rating: object.get('rating'),
            grade: grade,
            tags: object.get('tags'),
            showTags: showTags,
            attendance: object.get('attendance'),
            homework: object.get('homework'),
            exam: object.get('exam'),
            upVote: object.get('upVote'),
            downVote: object.get('downVote'),
            voted: false,
            createdTime: object.createdAt
          });
        }
      },
      function(error) {
        //alert("Error: " + error.code + " " + error.message);
      }
    ).then(
      function() {
        $scope.allReviews = newData.concat($scope.allReviews);
        $scope.$broadcast('scroll.refreshComplete');
      }
    );
  };

  /*----------------------------------------------------------------
  Infinite Scrolling
  -----------------------------------------------------------------*/
  $scope.allReviews = [];
  $scope.loadMore = function() {
    var loadLimit = 30;
    var newData = [];
    var Reviews = AV.Object.extend("Reviews");
    var query = new AV.Query(Reviews);
    query.equalTo("profName", $scope.listingId);
    query.limit(loadLimit);
    query.include("authorId");
    query.include("courseId");
    query.descending("createdAt");
    if (postEndPoint !== 0) {
      query.lessThan("createdAt", postEndPoint);
    }
    query.find().then(
      function(results) {
        //console.log("finding prof: " + $scope.listingId);
        //console.log("review length: " + results.length);

        for (var i = 0; i < results.length; i++) {
          var object = results[i];

          //give an overall grade based on individual rates
          var overallRating = object.get('rating').overall;
          var grade = 1;
          if (overallRating <= 7) {
            grade = 0;
          } else if (overallRating >= 11) {
            grade = 2;
          }

          //determine if tags field should be displayed
          var showTags = true;
          if (object.get('tags').length > 0) {
            showTags = true;
          } else {
            showTags = false;
          }
          if ($scope.deptId && $scope.deptId === object.get('courseId')
            .get("dept")) {
            newData.push({
              id: object.id,
              authorName: object.get('authorId').get("username"),
              authorDept: object.get('authorId').get("dept"),
              authorYear: object.get('authorId').get("year"),
              dept: object.get('courseId').get("dept"),
              courseName: object.get('courseName'),
              comment: object.get('comment'),
              rating: object.get('rating'),
              grade: grade,
              tags: object.get('tags'),
              showTags: showTags,
              attendance: object.get('attendance'),
              homework: object.get('homework'),
              exam: object.get('exam'),
              upVote: object.get('upVote'),
              downVote: object.get('downVote'),
              voted: false,
              createdTime: object.createdAt
            });
          }

        }
        $scope.allReviews = $scope.allReviews.concat(newData);
        if ($scope.allReviews.length > 0) {
          postStartPoint = $scope.allReviews[0].createdTime;
          postEndPoint = $scope.allReviews[$scope.allReviews.length - 1]
            .createdTime;
        }

        $scope.$broadcast('scroll.infiniteScrollComplete');

        if (results.length < loadLimit) {
          $scope.noOldPosts = true;
          //console.log('stop loading signal sent');
          if ($scope.allReviews.length === 0) {
            $scope.showNoPostPlaceholder = true;
          }
        }

      },
      function(error) {
        //alert("Error: " + error.code + " " + error.message);
        $scope.$broadcast('scroll.infiniteScrollComplete');

      }
    );
  };

  /*----------------------------------------------------------------
  Default chart data
  -----------------------------------------------------------------*/
  $scope.pieOption = {
    chart: {
      type: 'pieChart',
      title: '0%',
      donut: true,
      width: 95,
      height: 80,
      x: function(d) {
        return d.key;
      },
      y: function(d) {
        return d.y;
      },
      showLabels: false,
      showLegend: false,
      transitionDuration: 500,
      labelThreshold: 0.01,
      margin: {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      },
      color: ['rgba(248,66,67, 1.0)', 'rgba(143,181,200, 1.0)',
        'rgba(216,216,216, 1.0)'
      ]
    }
  };

  $scope.pieData = [{
    key: "好评率",
    y: 0
  }, {
    key: "中评率",
    y: 0
  }, {
    key: "差评率",
    y: 0
  }];

  $scope.barOption = {
    chart: {
      type: 'discreteBarChart',
      height: 120,
      showLabels: false,
      showXAxis: true,
      showYAxis: false,
      x: function(d) {
        return d.label;
      },
      y: function(d) {
        return d.value;
      },
      showValues: true,
      valueFormat: function(d) {
        return d3.format(',.1f')(d);
      },
      transitionDuration: 500,
      margin: {
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
      },
      color: ['rgba(143,181,200, 1.0)', 'rgba(143,181,200, 1.0)',
        'rgba(143,181,200, 1.0)'
      ]
    }
  };



  $scope.barLabels = ["专业", "表达", "友好"];
  $scope.barSeries = ['打分'];
  $scope.barData = [
    // [3, 3, 3]
  ];


})



.controller('ListingDetailReviewCtrl', function($ionicModal, $localStorage,
  $ionicPopup, $ionicHistory, tagList,
  $scope, $rootScope, $state, $stateParams, $filter, $ionicScrollDelegate) {


  /*----------------------------------------------------------------
  Initialization
  -----------------------------------------------------------------*/

  //get localStorage
  $storage = $localStorage;

  //get URL state params
  $scope.listingId = $stateParams.listingId;
  $scope.deptId = $stateParams.deptId;

  //enumerate options
  $scope.tagOptions = [];
  angular.copy(tagList, $scope.tagOptions);


  /*----------------------------------------------------------------
  Model Data
  -----------------------------------------------------------------*/
  $scope.courseOptions = $filter('where')($storage.courses, {
    'prof': $scope.listingId
  });
  if ($scope.deptId) {
    $scope.courseOptions = $filter('where')($scope.courseOptions, {
      'dept': $scope.deptId
    });
  }


  //$scope.courseOptions = $filter('filterBy')($storage.courses,['prof'],$scope.listingId);
  $scope.courseInfo = {
    allOptions: $scope.courseOptions,
    selectedOption: $scope.courseOptions[0]
  };

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
      name: "水分较多",
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
    }
  };


  $scope.reviewRating = {
    rate1: 3,
    rate2: 3,
    rate3: 3,
    overall: 9
  };

  $scope.grade = 1;
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
  View Control
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
          "objectId": $scope.courseInfo.selectedOption.objectId
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
                "objectId": $scope.courseInfo.selectedOption
                  .objectId
              });
              review.set("profName", $scope.courseInfo.selectedOption
                .prof);
              review.set("courseName", $scope.courseInfo.selectedOption
                .name);
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
      title: '评价已收到！',
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



})


.filter('appendZero', function() {
  return function(input) {
    if (input < 10) {
      input = '0' + input;
    }

    return input;
  };
});
