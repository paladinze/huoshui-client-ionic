angular.module('me.controllers')


.controller('MeProfileCtrl', function($scope, $state, $localStorage,
	$ionicHistory, $ionicPopup, deptService) {

	$scope.user = {
		username: AV.User.current().get('username'),
		dept: AV.User.current().get('dept'),
		year: AV.User.current().get('year'),
		email: AV.User.current().get('email'),
	};


	/*----------------------------------------------------------------
	Popup
	-----------------------------------------------------------------*/
	$scope.showEditProfile = function() {
		var alertPopup = $ionicPopup.alert({
			title: '修改我的信息',
			scope: $scope,
			templateUrl: 'tab-me/editProfile.html',
			buttons: [{
				text: '<b>取消</b>'
			}, {
				text: '<b>保存</b>',
				type: 'button-positive',
				onTap: function(e) {
					//submit the change
					if ($scope.user.username.length < 2) {
						showFailure();
					} else {
						var user = AV.User.current();
						user.set("username", $scope.user.username);
						user.set("dept", $scope.deptInfo.selectedOption.value);
						user.set("year", $scope.yearInfo.selectedOption.value);
						user.save(null, {
							success: function(res) {
								showSuccess();
								$scope.user.dept = $scope.deptInfo.selectedOption.value;
								$scope.user.year = $scope.yearInfo.selectedOption.value;
							},
							error: function(res, error) {
								showFailure();
								//alert("Error: " + error.code + " " + error.message);
							}
						});
					}
				}
			}, ]
		});
	};

	var showFailure = function() {
		var alertPopup = $ionicPopup.alert({
			title: '保存失败',
			template: '请确认填写信息无误',
			okText: '明白了',
		});
		alertPopup.then(function(res) {});
	};

	var showSuccess = function() {
		var alertPopup = $ionicPopup.alert({
			title: '保存成功',
			okText: '明白了',
		});
		alertPopup.then(function(res) {});
	};



	$scope.yearInfo = {
		allOptions: [{
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
		}, ],
		selectedOption: {
			id: $scope.user.year % 100,
			name: $scope.user.year,
			value: $scope.user.year
		}
	};

	$scope.deptInfo = {
		allOptions: deptService.getDeptList(),
		selectedOption: {
			id: '0',
			name: "土木",
			value: "土木"
		}
	};


})


.controller('MeReviewCtrl', function($scope, $state, $localStorage,
	$ionicHistory) {



	$scope.gotoProfReview = function(review) {
		console.log(review);
		$state.go('tab.listing-detail-2', {
			'listingId': review.profName,
			'deptId': review.dept
		});
	};

	/*----------------------------------------------------------------
	Infinite Scrolling
	-----------------------------------------------------------------*/
	var postStartPoint = 0;
	var postEndPoint = 0;


	$scope.allReviews = [];
	$scope.loadMore = function() {
		var loadLimit = 8;
		var newData = [];
		var Reviews = AV.Object.extend("Reviews");
		var query = new AV.Query(Reviews);
		query.equalTo("authorId", {
			__type: "Pointer",
			className: "_User",
			objectId: AV.User.current().id
		});
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
				console.log("review length: " + results.length);

				for (var i = 0; i < results.length; i++) {
					var object = results[i];

					//give an overall grade based on individual rates
					var overallRating = object.get('rating').overall;
					var grade = 1;
					if (overallRating <= 5) {
						grade = 0;
					} else if (overallRating >= 10) {
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
						authorName: object.get('authorId').get("username"),
						authorDept: object.get('authorId').get("dept"),
						authorYear: object.get('authorId').get("year"),
						dept: object.get('courseId').get("dept"),
						courseName: object.get('courseName'),
						profName: object.get('profName'),
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
						createdTime: object.createdAt
					});
				}
				$scope.allReviews = $scope.allReviews.concat(newData);
				if ($scope.allReviews.length > 0) {
					postStartPoint = $scope.allReviews[0].createdTime;
					postEndPoint = $scope.allReviews[$scope.allReviews.length - 1].createdTime;
				}

				$scope.$broadcast('scroll.infiniteScrollComplete');

				if (results.length < loadLimit) {
					$scope.noOldPosts = true;
					//console.log('stop loading signal sent');
				}

			},
			function(error) {
				alert("Error: " + error.code + " " + error.message);
				$scope.$broadcast('scroll.infiniteScrollComplete');

			}
		);
	};
})


.controller('MeCourseCtrl', function($scope, $state, $localStorage,
	$ionicHistory, deptService) {

	$scope.courses = [];
	var deptImgHash = deptService.getDeptImageHash();

	$scope.gotoProfReview = function(course) {
		$state.go('tab.listing-detail-2', {
			'listingId': course.prof,
			'deptId': course.dept
		});
	};

	$scope.loadMore = function() {
		//check if already liked
		var user = AV.User.current();
		var relation = user.relation("likedCourses");
		var query = relation.query();
		query.find({
			success: function(results) {
				console.log(results.length);
				for (var i = 0; i < results.length; i++) {
					var object = results[i];
					$scope.courses.push({
						objectId: object.id,
						prof: object.get('prof'),
						name: object.get('name'),
						position: object.get('position'),
						deptImg: deptImgHash[object.get('dept')],
						campus: object.get('campus'),
						school: object.get('school'),
						dept: object.get('dept'),
						icon: 'img/science.png', //object.get('icon').thumbnailURL(100, 100),
						createdAt: object.createdAt,
						updatedAt: object.updatedAt
					});
				}
				console.log($scope.courses.length);
				$scope.noOldPosts = true;

				$scope.$apply();
			}
		});
	};



})

.controller('MeVoteCtrl', function($scope, $state, $localStorage, $ionicHistory) {



})


.controller('MeFeedbackCtrl', function($scope, $state, $localStorage,
	$ionicPopup, $ionicHistory) {

	$scope.feedback = {
		name: '',
		phone: '',
		comment: ''
	};

	/*----------------------------------------------------------------
	submission
	-----------------------------------------------------------------*/
	var showConfirm = function() {
		var confirmPopup = $ionicPopup.confirm({
			title: '发送反馈',
			template: '准备好提交反馈了吗？',
			okText: '确定',
			cancelText: '取消'
		});
		confirmPopup.then(function(res) {
			if (res) {
				var Feedback = AV.Object.extend("Feedback");
				var feedback = new Feedback();

				feedback.set("name", $scope.feedback.name);
				feedback.set("phone", $scope.feedback.phone);
				feedback.set('comment', $scope.feedback.comment);

				feedback.save(null, {
					success: function(res) {
						showSuccess();
					},
					error: function(res, error) {
						showFailure();
					}
				});
			}
		});
	};

	//popup (validation failure alert)
	var showAlert = function() {
		var alertPopup = $ionicPopup.alert({
			title: '信息不全',
			template: '请填写反馈意见！',
			okText: '知道了',

		});
		alertPopup.then(function(res) {});
	};

	//popup (submission failure)
	var showFailure = function() {
		var failurePopup = $ionicPopup.alert({
			title: '提交失败，请稍后再试',
			okText: '确定',
		});
		failurePopup.then(function(res) {

		});
	};

	//popup (submission sucess)
	var showSuccess = function() {
		var successPopup = $ionicPopup.alert({
			title: '反馈已收到，谢谢你的参与！',
			okText: '确定',

		});
		successPopup.then(function(res) {
			$ionicHistory.goBack();
		});
	};


	//submission button
	$scope.submitFeedback = function() {
		if ($scope.feedback.comment === '') {
			showAlert();
		} else {
			showConfirm();
		}

	};


});
