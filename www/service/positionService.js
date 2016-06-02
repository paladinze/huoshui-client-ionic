angular.module('starter.services')


.service('positionService', function($filter, $rootScope, $localStorage){
    

    var positionList = [ 
            {id: '0', name: "教授" , value: "教授"},
            {id: '1', name: "副教授" , value: "副教授"},
            {id: '2', name: "讲师" , value: "讲师"},
            {id: '3', name: "助教" , value: "助教"},
            {id: '4', name: "不详" , value: "不详"}
    ];

    this.getPositionList = function() {
        return positionList;
    };
    
    
})