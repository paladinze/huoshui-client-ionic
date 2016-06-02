angular.module('me.controllers')

.controller("MeChatListCtrl", function($scope, $rootScope, $state, $stateParams,
	$ionicScrollDelegate, $timeout, chatService, $interval) {

	//navigation
	$scope.connectStatus = chatService.getConnectStatus();
	$scope.chatRooms = chatService.getAllRooms();
	$scope.gotoRoom = function(roomId) {
		$state.go("tab.me-chat-detail", {
			'roomId': roomId
		});
	};

	//handle entering
	$scope.$on('$ionicView.beforeEnter', function() {
		if (chatService.getConnectStatus().isConnected) {
			//chatService.getAllHeadCount();
			//$scope.$apply();
		}
	});

})


.controller("MeChatDetailCtrl", function($scope, $rootScope, $stateParams,
	$ionicScrollDelegate, $interval, $timeout, chatService) {
	var roomId = $stateParams.roomId;
	var clientId = chatService.getClientId();
	var chatRooms = chatService.getAllRooms();
	$scope.connectStatus = chatService.getConnectStatus();
	$scope.allMsg = chatService.getAllMsg();


	$scope.clientId = clientId;
	$scope.userPic = "img/profile.png";
	$scope.touserPic = "img/good.png";
	var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
	var footerBar;
	var scroller;
	var txtInput;

	$scope.$on('$ionicView.enter', function() {
		$timeout(function() {
			footerBar = document.body.querySelector(
				'#userMessagesView .bar-footer');
			scroller = document.body.querySelector(
				'#userMessagesView .scroll-content');
			txtInput = angular.element(footerBar.querySelector('textarea'));
		}, 0);
	});
	// this keeps the keyboard open on a device only after sending a message, it is non obtrusive
	function keepKeyboardOpen() {
		console.log('keepKeyboardOpen');
		txtInput.one('blur', function() {
			console.log('textarea blur, focus back on it');
			txtInput[0].focus();
		});
	}


	//get roomId
	$scope.roomTitle = "讨论组";
	for (var i = 0; i < chatRooms.length; i++) {
		if (chatRooms[i].objectId === roomId)
			$scope.roomTitle = chatRooms[i].title;
	}

	//handle entering
	$scope.$on('$ionicView.beforeEnter', function() {
		console.log("entering chat room");
		$rootScope.hideTabs = 'tabs-item-hide';
		chatService.enterRoom(roomId);

	});

	//handle leaving
	$scope.$on('$ionicView.beforeLeave', function() {
		console.log("leaving chat room");
		$rootScope.hideTabs = '';
		chatService.leaveRoom(roomId);
	});


	/*----------------------------------------------------------------
	Send Message
	-----------------------------------------------------------------*/
	$scope.newMsg = '';
	$scope.disableInput = false;
	$scope.sendMessage = function() {
		if (!chatService.getConnectStatus().isConnected) {
			//alert('server is still connecting！');
		} else if (!String($scope.newMsg).replace(/^\s+/, '').replace(/\s+$/, '')) {
			//alert('input cannot be empty！');
		} else {
			console.log("sending: " + $scope.newMsg);
			$scope.disableInput = true;

			if ($scope.connectStatus.currRoom) {
				$scope.connectStatus.currRoom.send({
					text: $scope.newMsg
				}, {
					type: 'text'
				}, function(data) {
					console.log("message sent successful");
					console.log(data);
					$scope.disableInput = false;
					$scope.allMsg.push({
						text: $scope.newMsg,
						author: clientId,
						date: new Date()
					});

					$timeout(function() {
						keepKeyboardOpen();
						viewScroll.scrollBottom(true);
					}, 0);
					$scope.newMsg = '';
					$scope.$apply();
				});
			}
		}
	};

	$scope.$on('newReply', function(event, args) {
		console.log('newReply broadcase received');
		viewScroll.scrollBottom(true);
	});

	window.addEventListener('native.keyboardshow', keyboardShowHandler);

	function keyboardShowHandler(e) {
		viewScroll.scrollBottom(true);
	}


});
