angular.module('starter.services')

.service('popupService', function($filter, $rootScope, $localStorage,$ionicPopup, $state, 
                                   deptService, positionService, courseService){
    
    /*----------------------------------------------------------------
    Add course
    -----------------------------------------------------------------*/      
    
    $rootScope.deptInfo = {
        allOptions: deptService.getDeptList(),
        selectedOption: {id: '0', name: "土木" , value: "土木"}
    };     
    
    $rootScope.positionInfo = {
        allOptions: positionService.getPositionList(),
        selectedOption: {id: '0', name: "教授" , value: "教授"}
    };        
    
    $rootScope.userAddCourse = {
        prof: '',
        course: '',
        dept: '',
        position: ''
    };
    
    //User add course form
    this.showUserAddCourseForm = function() {
        
        var confirmPopup = $ionicPopup.confirm({
            title: '添加课程',
            subTitle: '请慎重填写，您的参与会给其他同学带来巨大帮助！',
            templateUrl: 'common/user-add-course-form.html',
            scope: $rootScope,
            okText: '提交',
            cancelText: '取消'
        });
        confirmPopup.then(function(res) {
            if(res) {
                console.log('attempt add course to database');
                $rootScope.userAddCourse.position = $rootScope.positionInfo.selectedOption.value;
                $rootScope.userAddCourse.dept = $rootScope.deptInfo.selectedOption.value;
                
                if ($rootScope.userAddCourse.prof.length <= 1 
                    || $rootScope.userAddCourse.dept.length <= 1 ) {
                    showAddCourseFailInputShort();
                } else {
                    courseService.addCourse($rootScope.userAddCourse);           
                }

            } else {
                console.log('You are not sure');
            }
        });        
    };
    
    
    $rootScope.$on('course-add-success', function(event, args) {
        showAddCourseSuccess();
    });        
    $rootScope.$on('course-add-fail-duplicate', function(event, args) {
        showAddCourseFailDuplicate();
    });    
    $rootScope.$on('course-add-fail-generic', function(event, args) {
        showAddCourseFailGeneric();
    });
    $rootScope.$on('course-add-fail-prof-not-exist', function(event, args) {
        showAddCourseFailProfNotExist();
    });    
    
    
    //Course added
    var showAddCourseSuccess = function() {
        var alertPopup = $ionicPopup.alert({
            title: '课程添加成功！',
            okText: '知道了',
        });
        alertPopup.then(function(res) {
        });
    };	     
    var showAddCourseFailDuplicate = function() {
        var alertPopup = $ionicPopup.alert({
            title: '课程添加失败！',
            template: '该课程和老师已经存在',
            okText: '知道了',
        });
        alertPopup.then(function(res) {
        });
    };	
    var showAddCourseFailGeneric = function() {
        var alertPopup = $ionicPopup.alert({
            title: '课程添加失败！',
            template: '请稍候再试',
            okText: '知道了',
        });
        alertPopup.then(function(res) {
        });
    };	
    var showAddCourseFailProfNotExist = function() {
        var alertPopup = $ionicPopup.alert({
            title: '课程添加失败！',
            template: '很抱歉，数据库中没有找到匹配的老师，因而无法添加。检查一下是不是输错字了？（也可以在设置中反馈问题）',
            okText: '知道了',
        });
        alertPopup.then(function(res) {
        });
    };	    
    var showAddCourseFailInputShort = function() {
        var alertPopup = $ionicPopup.alert({
            title: '课程添加失败！',
            template: '课程和老师名字需不少于两个字',
            okText: '知道了',
        });
        alertPopup.then(function(res) {
        });
    };	    
    
    
    /*----------------------------------------------------------------
    Access Control
    -----------------------------------------------------------------*/   
    this.showAccessControl = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: '游客模式',
            template: '您目前处于游客模式，如果希望发表评论或关注，请先注册。每个声音都有力量！',
            okText: '快捷注册',
            cancelText: '继续游览'
        });
        confirmPopup.then(function(res) {
            if(res) {
                console.log('go to signup');
				$state.go('signup');

            } else {
                console.log('You are not sure');
            }
        });
    };    
    //Access control for the review tab
    this.showAccessControlAndExit = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: '游客模式',
            template: '您目前处于游客模式，如果希望发表评论或关注，请先注册。每个声音都有力量！',
            okText: '快捷注册',
            cancelText: '继续游览'
        });
        confirmPopup.then(function(res) {
            if(res) {
                console.log('go to signup');
				$state.go('signup');
            } else {
				$state.go('tab.listing');
                console.log('You are not sure');
            }
        });
    };    
    
    
    
    
    
})