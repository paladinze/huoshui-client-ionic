angular.module('discover.controllers', [])

.controller("DiscoverCtrl", function($scope, $state, $filter, $localStorage, deptService,popupService) {
    
    /*----------------------------------------------------------------
    Access Control
    -----------------------------------------------------------------*/   		    
    $scope.$on('$ionicView.enter', function() {
        if (AV.User.current().get('username') === '游客'){
            popupService.showAccessControlAndExit();
        }            
    });
            
    
    
    $scope.deptList =  deptService.getDeptList();
    
    $scope.gotoDiscoverList = function(deptName) {
      $state.go("tab.discover-list", {deptId: deptName});
    };

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
		filterdCourses = $filter('filter')($scope.$storage.courses, $scope.searchText.text);
		$scope.displayCourses = filterdCourses.slice(0,loadLength);
		$scope.noMorePost = false;
		if ($scope.searchText.text.length != 0 ) {
			$scope.showPromoContent = false;
		} else {
			$scope.showPromoContent = true;
			$scope.noMorePost = true;
		}
		console.log("attempt searching, course length:" + filterdCourses.length );
		
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
			var newData = filterdCourses.slice(displayLength,displayLength+loadLength);
			for (var i=0; i < newData.length; ++i) {
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
        
        if (AV.User.current().get('username') === '游客'){
            popupService.showAccessControl();
        } else {
            popupService.showUserAddCourseForm();
        }
    };
    	    
    
})


.controller("DiscoverListCtrl", function($scope, $state, $stateParams, 
                                          $localStorage, $filter, $ionicFilterBar) {
    

    
    /*----------------------------------------------------------------
    Initialization
    -----------------------------------------------------------------*/       
    $scope.$storage = $localStorage;
	var deptId = $stateParams.deptId;
    
	var filterdCourses = [];
	$scope.displayCourses = [];
	$scope.noMorePost = false;
	var loadLength = 15;    
    
    
	$scope.startSearch = function() {
		filterdCourses = $filter('where')($scope.$storage.courses,{'dept': deptId}  );  
		  filterdCourses = $filter('orderBy')(filterdCourses, 'rate1',true);
        $scope.displayCourses = filterdCourses.slice(0,loadLength);
		$scope.noMorePost = false;
		console.log("attempt searching, course length:" + filterdCourses.length );
	}    
    $scope.startSearch();
    
	$scope.loadMore = function() {
		var resultLength = filterdCourses.length;
		var displayLength = $scope.displayCourses.length;
				console.log("result length:" + filterdCourses.length);
				console.log("display length:" + $scope.displayCourses.length);
		
		if (displayLength == resultLength) {
			$scope.noMorePost = true;
				console.log("no more to add");
		} else {
			var newData = filterdCourses.slice(displayLength,displayLength+loadLength);
			for (var i=0; i < newData.length; ++i) {
				$scope.displayCourses.push(newData[i]);
			}
            $scope.$broadcast('scroll.infiniteScrollComplete');
			console.log("add more, new length is: " + $scope.displayCourses.length);
			//$scope.noMorePost = false;
		}
		
	}    
    
    
    /*----------------------------------------------------------------
    set filter options
    -----------------------------------------------------------------*/     
    $scope.filterOption = 'rate1';
    $scope.isActive = function(option) {
        return $scope.filterOption === option;
    };    
    $scope.setFilterOption = function(option) {
        $scope.filterOption = option;
        var orderDesc = true;
        
        
        filterdCourses = $filter('where')($scope.$storage.courses,{'dept': deptId}  );  
        
        if (option === "rate1") {
		  filterdCourses = $filter('orderBy')(filterdCourses, 'rate1',true);
        } else if (option === "rate2") {
		  filterdCourses = $filter('orderBy')(filterdCourses, 'rate2',true);
        } else if (option === "rate3") {
		  filterdCourses = $filter('orderBy')(filterdCourses, 'rate3',true);
        } else {
		  filterdCourses = $filter('orderBy')(filterdCourses, 'rate1',true);
        }
        
        
        $scope.displayCourses = filterdCourses.slice(0,loadLength);
        $scope.noMorePost = false;
        console.log("attempt searching, course length:" + filterdCourses.length );
        
        
    };

    
    
        
    /*----------------------------------------------------------------
    filter bar control
    -----------------------------------------------------------------*/   	  
    $scope.showFilterBar = function () {
        
        
      var filterBarInstance = $ionicFilterBar.show({
        items: filterdCourses,
        cancelText: '取消',
        cancel: function(){
            //$scope.displayCourses = [];
        },
        update: function (filteredItems, filterText) {
            //the filter approach
            $scope.displayCourses = filteredItems;
        }
      });
    };    
    
    
    
});