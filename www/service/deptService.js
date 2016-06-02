angular.module('starter.services')


.service('deptService', function($filter, $rootScope, $localStorage){
    

    var deptList = [ 
            {id: '0', name: "土木" , value: "土木", img: "img/dept/Tower.png"},
            {id: '1', name: "机械" , value: "机械", img: "img/dept/gear.png"},
            {id: '4', name: "力学" , value: "力学", img: "img/dept/momentum.png"},
            {id: '2', name: "运输" , value: "运输", img: "img/dept/train.png"},
        
            {id: '6', name: "地学" , value: "地学", img: "img/dept/globe.png"},
            {id: '7', name: "物理" , value: "物理", img: "img/dept/genius.png"},
            {id: '3', name: "建筑" , value: "建筑", img: "img/dept/circlecompass.png"},
            {id: '5', name: "材料" , value: "材料", img: "img/dept/recycle.png"},

            {id: '8', name: "信息" , value: "信息", img: "img/dept/computer.png"},
            {id: '9', name: "电气" , value: "电气", img: "img/dept/Microchip.png"},
            {id: '20', name: "数学" , value: "数学", img: "img/dept/calculator.png"},	
            {id: '15', name: "图书馆" , value: "图书馆", img: "img/dept/bookshelf.png"},
        
        
            {id: '12', name: "经管" , value: "经管", img: "img/dept/Money-Graph.png"},
            {id: '14', name: "公共" , value: "公共", img: "img/dept/Graph-Magnifier.png"},
            {id: '11', name: "人文" , value: "人文", img: "img/dept/lightbulb.png"}, 
            {id: '16', name: "外语" , value: "外语", img: "img/dept/typography.png"},

            {id: '17', name: "工业" , value: "工业", img: "img/dept/factory.png"},
            {id: '13', name: "体育" , value: "体育", img: "img/dept/biker.png"},
            {id: '18', name: "心理" , value: "心理", img: "img/dept/Heart-Watch.png"},
            {id: '19', name: "思政" , value: "思政", img: "img/dept/megaphone2.png"},
        
            {id: '21', name: "生命" , value: "生命", img: "img/dept/Dna.png"},	
            {id: '22', name: "艺术" , value: "艺术", img: "img/dept/art.png"},
            {id: '23', name: "马院" , value: "马院", img: "img/dept/flag.png"},
            {id: '24', name: "武装部" , value: "武装部", img: "img/dept/rocket.png"}
    ];

    this.getDeptList = function() {
        return deptList;
    };
    
    this.getDeptImageHash = function() {
        var deptImageHash = {};
        for (var i=0; i<deptList.length; i++) {
            deptImageHash[deptList[i].value] = deptList[i].img;
        }
        return deptImageHash;
    };    
    
    
})