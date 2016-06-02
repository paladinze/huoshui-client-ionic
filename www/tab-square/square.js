angular.module('square.controllers', [])

.controller('SquareCtrl', function($scope, $state,$http, $localStorage, $filter,
									$ionicPopup, $ionicModal, $ionicActionSheet) {

    /*----------------------------------------------------------------
    Handle Top Bottoms
    -----------------------------------------------------------------*/   
	
	$scope.shortcutButtons = [
		{id: 1, img: "search.png", title: "发起议题", state: "tab.listing"},
		{id: 2, img: "feedback.png", title: "候选议题", state: "tab.listing"},
		{id: 3, img: "vote.png", title: "过往议题", state: "tab.me"},
		//{img: "gift.png", title: "神秘礼物", state: "tab.me"}	
	];

	$scope.handleButtonClick= function (buttonId) {
		if (buttonId == 1) {
			$scope.modal_topic.show();
		} else if (buttonId == 2) {
			$state.go('tab.debate-candidate');	
		} else if (buttonId == 3) {
			$state.go('tab.debate-history');	
		}
		
	}
	

    /*----------------------------------------------------------------
    Navigation
    -----------------------------------------------------------------*/       
	$scope.gotoDebateDetail = function(){
        $state.go('tab.debate-detail');  
    };


    /*----------------------------------------------------------------
    Modal:new topic
    -----------------------------------------------------------------*/   	
    $ionicModal.fromTemplateUrl('tab-square/modal_topic.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal_topic = modal;
    });
    
    $scope.modalTopicComplete = function () {
        $scope.modal_topic.hide();
    };	
	
	

    /*----------------------------------------------------------------
    Random Test
    -----------------------------------------------------------------*/   
	$scope.orders = [
    { id:1, customer: { name: 'John', id: 10 } },
    { id:2, customer: { name: 'William', id: 20 } },
    { id:3, customer: { name: 'John', id: 10 } },
    { id:4, customer: { name: 'William', id: 20 } },
    { id:5, customer: { name: 'Clive', id: 30 } }
  ];
    


 // Triggered on a button click, or some other target
 $scope.showActionsheet = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>Share</b> This' },
       { text: 'Move' }
     ],
     destructiveText: 'Delete',
     titleText: 'Modify your album',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       return true;
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 2000);

 };
    
    
    
    
})


.controller('DebateDetailCtrl', function($scope, $state,$http, $localStorage, $filter,$ionicPopup, $ionicModal, $ionicActionSheet) {

    
    $ionicModal.fromTemplateUrl('tab-square/modal_vote.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal_vote = modal;
    });
    
    $scope.modalTagComplete = function () {
        $scope.modal_vote.hide();
    };
    
    
    
})


.controller('DebateCandidateCtrl', function($scope, $state,$http, $localStorage, $filter,$ionicPopup, $ionicModal, $ionicActionSheet) {


    
    
})



.controller('DebateHistoryCtrl', function($scope, $state,$http, $localStorage, $filter,$ionicPopup, $ionicModal, $ionicActionSheet) {


    
    
})



