angular.module('login.controllers', [])

.controller('LoginCtrl', function($scope, $state, $http, $localStorage, $filter,
	$ionicPopup, $ionicHistory, $ionicActionSheet, $ionicLoading) {

	/*----------------------------------------------------------------
	Popoup : login failure
	-----------------------------------------------------------------*/
	//popup (submission failure)
	var showLoginFailure = function() {
		var alertPopup = $ionicPopup.alert({
			title: '登录失败',
			//cssClass: 'login-popup',
			template: '请确认用户名和密码输入正确',
			okText: '明白了',
		});
		alertPopup.then(function(res) {
			//
		});
	};

	var showNoConnection = function() {
		var alertPopup = $ionicPopup.alert({
			title: '无网络连接',
			template: '请确认网络连接正常后再试',
			okText: '明白了',
		});
		alertPopup.then(function(res) {
			//
		});
	};


	/*----------------------------------------------------------------
	Login control
	-----------------------------------------------------------------*/
	$scope.user = {
		email: '',
		password: ''
	};

	$scope.headlines = [{
		to: "许义文－思想道德修养与法律基础",
		from: "哈哈～",
		content: "无法适应他那南通口音的普通话，印象最深刻的就是他把“狗”念成“gěi”。还有秒杀一切的犀利眼神。"
	}, {
		to: "陈晓红－英语I",
		from: "能量女王",
		content: "老师非常好，很漂亮，上课很轻松，没有一次犯困过！"
	}, {
		to: "张国琳－通用学术英语",
		from: "风の钢琴师",
		content: "张国琳老师是一个典型的文艺女青年，上她的英语课时就像在听一场唯美的故事会。她用她的文艺，以及她流利的英语征服了我"
	}, {
		to: "曹中清－机械工程中的仿真",
		from: "怪咖先生",
		content: "几乎每一个周五的晚上，我都要听他吹自己当年如何厉害，其他人如何一般，自己做过某公司亚洲老总，随便一个项目上千万如何……"
	}, {
		to: "王金栋－金属切削理论与刀具设计",
		from: "杨西米",
		content: "大四专业课讲的最细最清楚的，西安交大来的新老师。"
	}, {
		to: "范美坤－能源与环境",
		from: "我是小公举",
		content: "超热情，除了期末论文防抄袭之外，一切完美！见过的第一个用Google查重的老师"
	}, {
		to: "师明星－工程力学C",
		from: "abcd",
		content: "师老师极其负责任，为学生着想，尽自己所能为学生解决学习之外的后顾之忧。"
	}, {
		to: "董洁－大学生心理健康",
		from: "劼帅",
		content: "董洁老师说实话并不像是一个老师，而更像是一个学姐的身份来上课。课程本身十分轻松，想要了解些心理学知识或水过的同学可以选择"
	}, {
		to: "何洪涛－思想道德修养与法律基础",
		from: "249301961",
		content: "口头禅：“老师刚从England回来”“老师下学期要去England”。上课不用中文喜欢说英文装B"
	}];



	var shuffleArray = function(array) {
		var m = array.length,
			t, i;

		// While there remain elements to shuffle
		while (m) {
			// Pick a remaining element…
			i = Math.floor(Math.random() * m--);

			// And swap it with the current element.
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	};

	shuffleArray($scope.headlines);

	var showLoading = function() {
		$ionicLoading.show({
			content: 'Sending',
			//templateUrl: 'loading-indicators/global.html',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});
	};

	var hideLoading = function() {
		$ionicLoading.hide();
	};


	$scope.login = function() {
		showLoading();

		if (window.Connection && navigator.connection.type == Connection.NONE) {
			hideLoading();
			showNoConnection();
		} else {
			AV.User.logIn($scope.user.email, $scope.user.password, {
				success: function(user) {
					console.log("login success!");
					hideLoading();

					//forget this view after logged in
					$ionicHistory.nextViewOptions({
						disableAnimate: true,
						disableBack: true
					});

					//default first page
					$state.go("tab.listing");

				},
				error: function(user, error) {
					hideLoading();
					console.log("login failed!");
					//alert("Error: " + error.code + " " + error.message);
					showLoginFailure();

				}
			});
		}

	};

	$scope.guestLogin = function() {
		showLoading();
		AV.User.logIn("guest@huoshui.com", "123", {
			success: function(user) {
				console.log("login success!");
				hideLoading();

				//forget this view after logged in
				$ionicHistory.nextViewOptions({
					disableAnimate: true,
					disableBack: true
				});

				//default first page
				$state.go("tab.listing");

			},
			error: function(user, error) {
				hideLoading();
				console.log("login failed!");
				//alert("Error: " + error.code + " " + error.message);
				showLoginFailure();

			}
		});
	};


	$scope.gotoSignup = function() {
		console.log("go to signup page now!");
		$state.go("signup");

	};



});
