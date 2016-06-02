angular.module('rank.controllers', [])


.controller('RankCtrl', function($scope, $rootScope, $state, $ionicPopup,
	popupService, deptService) {

	/*----------------------------------------------------------------
	Access Control
	-----------------------------------------------------------------*/
	$scope.$on('$ionicView.enter', function() {
		if (AV.User.current().get('username') === '游客') {
			popupService.showAccessControlAndExit();
		}
	});



	/*----------------------------------------------------------------
	Rank Filtering Options
	-----------------------------------------------------------------*/
	$scope.showDept = false;
	$scope.deptOption = AV.User.current().get('dept');
	$scope.active = 'schoolRank';
	$scope.setFilterOption = function(type) {
		$scope.active = type;
		if (type === 'deptRank') {
			showDeptOptions();
		}
	};
	$scope.isActive = function(type) {
		return type === $scope.active;
	};

	/*----------------------------------------------------------------
	Popup
	-----------------------------------------------------------------*/
	var showDeptOptions = function() {
		var alertPopup = $ionicPopup.alert({
			title: '请选择学院',
			scope: $scope,
			templateUrl: 'tab-rank/popup_dept.html',
			okText: '选完了',
		});
		alertPopup.then(function(res) {
			$scope.showDept = true;
		});
	};

	$scope.deptOptions = deptService.getDeptList();

	var defaultDept = $scope.deptOptions.filter(function(obj) {
		return obj.value == AV.User.current().get('dept');
	});
	defaultDept[0].checked = true;

	$scope.deptCheckChanged = function(dept) {
		if (dept.checked) {
			$scope.deptOption = dept.value;

			var result = $scope.deptOptions.filter(function(obj) {
				return obj.checked === true;
			});
			for (var i = 0; i < result.length; i++) {
				if (result[i].id != dept.id) {
					result[i].checked = false;
				}
			}
		}
	};

	/*----------------------------------------------------------------
	Navigation
	-----------------------------------------------------------------*/
	$scope.gotoRankDetail = function(rankId) {
		if ($scope.active == 'schoolRank') {
			$state.go("tab.rank-detail", {
				'rankId': rankId
			});
		} else {
			$state.go("tab.rank-detail", {
				'rankId': rankId,
				'deptId': $scope.deptOption
			});
		}
	};


	/*----------------------------------------------------------------
	Rank List
	-----------------------------------------------------------------*/
	$scope.rankList = [{
			id: 1,
			title: "综合榜",
			tagline: "按分数和好评率排",
			img: "img/dept/Medal-2.svg"
		}, {
			id: 2,
			title: "热度榜",
			tagline: "按参与评价人数排",
			img: "img/dept/flame.png"
		}, {
			id: 3,
			title: "口碑榜",
			tagline: "按正面标签数量排",
			img: "img/dept/Party-Poppers.svg"
		}, {
			id: 4,
			title: "水课榜",
			tagline: "按水课相关标签数量和数据",
			img: "img/dept/Spongebob.svg"
		}, {
			id: 7,
			title: "差评榜",
			tagline: "那些不想再上第二次的课",
			img: "img/dept/x.png"
		}, {
			id: 5,
			title: "考试榜",
			tagline: "按考试难度排",
			img: "img/dept/caution.png"
		}, {
			id: 6,
			title: "作业榜",
			tagline: "按作业多少排",
			img: "img/dept/compose.png"
		}

	];



})


.controller('RankDetailCtrl', function($scope, $rootScope, $state, $stateParams,
	tagList,
	$filter, $ionicPopup, $localStorage, popupService) {

	$scope.alert = function() {
		alert("Hello");
	};

	//----------------------------------------------------------------
	//Navigation
	//----------------------------------------------------------------

	var rankId = $stateParams.rankId;
	var deptId = $stateParams.deptId;

	$scope.gotoProfReview = function(course) {
		$state.go('tab.listing-detail-3', {
			'listingId': course.prof,
			'deptId': course.dept
		});

	};

	$scope.title = "排行榜";
	switch (rankId) {
		case "1":
			$scope.title = "综合榜";
			break;
		case "2":
			$scope.title = "热度榜";
			break;
		case "3":
			$scope.title = "口碑榜";
			break;
		case "4":
			$scope.title = "水课榜";
			break;
		case "5":
			$scope.title = "考试榜";
			break;
		case "6":
			$scope.title = "作业榜";
			break;
		case "7":
			$scope.title = "差评榜";
			break;
		default:
			$scope.title = "排行榜";
	}



	/*----------------------------------------------------------------
	Add course to personal collection
	-----------------------------------------------------------------*/

	$scope.addToCollection = function(courseId) {
		//access control
		var username = AV.User.current().get('username');
		if (username === '游客') {
			popupService.showAccessControl();
		} else {
			var user = AV.User.current();
			var relation = user.relation("likedCourses");

			var Courses = AV.Object.extend("Courses");
			var query = new AV.Query(Courses);
			query.equalTo("objectId", courseId);
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

	//----------------------------------------------------------------
	//Infinite Scrolling
	//----------------------------------------------------------------

	var filterdCourses = [];
	$scope.displayCourses = [];
	var displayLength = 25;
	$scope.showNotFoundMsg = false;


	//filter by dept name
	if (deptId) {
		filterdCourses = $filter('filter')($localStorage.courses, deptId);
	} else {
		filterdCourses = $localStorage.courses;
	}
	//filter by rank type
	if (rankId == 1) {

		for (var i = 0; i < filterdCourses.length; ++i) {
			filterdCourses[i].rankOverall = filterdCourses[i].rateOverall +
				filterdCourses[i].reviewCount * 0.5;
		}
		filterdCourses = $filter('orderBy')(filterdCourses, ['rankOverall',
			'rateOverall'
		], true);

		/*
        var tempArr = [];
        for (var i=0; i < filterdCourses.length; ++i) {
            if (filterdCourses[i].reviewCount >= 1 && filterdCourses[i].rateOverall > 3 ) {
                tempArr.push(filterdCourses[i]);
            }
        }
        filterdCourses = tempArr;
		filterdCourses = $filter('orderBy')(filterdCourses, ['rateOverall','reviewCount'],true);
        */
	} else if (rankId == 2) {
		filterdCourses = $filter('orderBy')(filterdCourses, 'reviewCount', true);
	} else if (rankId == 3) {
		for (var i = 0; i < filterdCourses.length; i++) {
			var course = filterdCourses[i];
			var tags = course.tags;
			var positiveTagCount = 0;
			for (var j = 0; j < tags.length; j++) {
				if (tagList[j].positive)
					positiveTagCount += tags[j];
			}
			course.positiveTagCount = positiveTagCount;
		}

		filterdCourses = $filter('orderBy')(filterdCourses, 'positiveTagCount',
			true); // tag number
	} else if (rankId == 4) {
		filterdCourses = $filter('orderBy')(filterdCourses, ['birdOverall',
			'reviewCount'
		], true);
	} else if (rankId == 5) {
		filterdCourses = $filter('orderBy')(filterdCourses, ['examOverall',
			'reviewCount'
		], true);
	} else if (rankId == 6) {
		filterdCourses = $filter('orderBy')(filterdCourses, ['homeworkOverall',
			'reviewCount'
		], true);
	} else if (rankId == 7) {
		var tempArr = [];
		for (var i = 0; i < filterdCourses.length; ++i) {
			if (filterdCourses[i].rateOverall <= 3 && filterdCourses[i].rateOverall >
				0.01) {
				tempArr.push(filterdCourses[i]);
			}
		}
		filterdCourses = tempArr;
		filterdCourses = $filter('orderBy')(filterdCourses, 'rateOverall', false);
	} else {
		filterdCourses = $filter('orderBy')(filterdCourses, 'rateOverall', true);
	}



	//trim the result
	filterdCourses = filterdCourses.slice(0, displayLength);
	for (var i = 0; i < filterdCourses.length; ++i) {
		if (rankId != 7) {
			if (filterdCourses[i].rateOverall > 1) {
				$scope.displayCourses.push(filterdCourses[i]);
			}
		} else {
			$scope.displayCourses.push(filterdCourses[i]);
		}
		$scope.noOldPost = true;
	}

	//handle if no result
	if ($scope.displayCourses.length === 0) {
		$scope.showNotFoundMsg = true;
	}

});
