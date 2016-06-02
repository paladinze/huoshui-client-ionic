angular.module('starter.services')

.service('chatService', function($filter, $rootScope){

    var connectStatus = {
        isConnected: false,
        currRoom: ''
    };
    var chatRooms = [ 
        {count: 0, img:"bookshelf.png", title: "交大小茶室", tagline:"爱在交大", objectId: "565b39c360b28da5665f973e"  },
        //{count: 0, img:"art.png", title: "交大解惑" , tagline:"爱在交大", objectId: "564ba40160b2d1404c65a88c"  },
        {count: 0, img:"hotair.png", title: "管理员偶尔出没" , tagline:"爱在交大", objectId: "564baa3660b2d1404c65bef1"  }
        //{count: 0, img:"compose.png", title: "交大文学" , tagline:"爱在交大", objectId: "564baa6460b2ed36206333d1"  },
        //{count: 0, img:"spaceshuttle.png", title: "交大国防" , tagline:"爱在交大", objectId: "564baad360b2d1404c65c229"  }
	];         
    
    var headCount = {
        "565b39c360b28da5665f973e": 0,
        "564ba40160b2d1404c65a88c": 0,
        "564baa3660b2d1404c65bef1": 0,
        "564baa6460b2ed36206333d1": 0,
        "564baad360b2d1404c65c229": 0
    };
    
    var allMsg = [        {
            text: "你可以等待下一个进入的人，也可以先和自己聊会儿",
            author: "詹天佑",
            date: new Date()
        } ];
    

	/*----------------------------------------------------------------
	getters
	-----------------------------------------------------------------*/  
    this.getClientId = function() {
        return clientId;
    };
    
    this.getAllRooms = function() {
        return chatRooms;
    };       
    
    this.getAllMsg = function() {
        return allMsg;
    };       
        
    this.getConnectStatus = function() {
        return connectStatus;
    };
    this.getHeadCount = function() {
        return headCount;
    };    
    
    
    
	/*----------------------------------------------------------------
    chat server connection
	-----------------------------------------------------------------*/ 
    var appId = 'zwjjm3MbxDYRKny9f31amkXq';
    var clientId = AV.User.current().get('username');  
    var rt = AV.realtime({
        appId: appId,
        clientId: clientId,
        secure: false
    });    
    
	/*----------------------------------------------------------------
    chat server monitoring
	-----------------------------------------------------------------*/     
    // on server connected
    rt.on('open', function() {
        console.log('chat server connected！');
        connectStatus.isConnected = true;
        $rootScope.$apply();

        //update all headCount
        /*
           rt.query({
               limit   : 1000,
               compact : false
           },function(data) {
               console.log(data);
              for (var i=0; i<data.length; i++) {
                  var chatRoom = $filter('where')(chatRooms,{'objectId': data[i].objectId})[0];
                  if (chatRoom) {
                      chatRoom.count = data[i].m.length;
                  }
              }
           });   
        */
	        
        
    // 监听所有用户加入的情况
    rt.on('membersjoined', function(data) {
        console.log('user entered：', data);
    });


    // 监听所有用户离开的情况
    rt.on('membersleft', function(data) {
        console.log('user left：', data);
    });		       

        
        
    }); 
    
    rt.on('close', function() {
       console.log('chat server disconnected！');
        connectStatus.isConnected = false;
    });    
    
    rt.on('reuse', function() {
       console.log('server reuse！');
    });

    rt.on('error', function() {
       console.log('server error!');
    });    
    
	/*----------------------------------------------------------------
    chat room connection
	-----------------------------------------------------------------*/    
    this.updateAllHeadCount = function() {
        console.log("update");
        /*
        for (var i=0; i<chatRooms.length; i++){
            chatRooms[i].count = 0;
        }*/
       rt.query({
           limit   : 1000,
           compact : true
       },function(data) {
              console.log(data);
          for (var i=0; i<data.length; i++) {
              var chatRoom = $filter('where')(chatRooms,{'objectId': data[i].objectId})[0];
                  console.log(data);
              if (chatRoom) {
                  chatRoom.count = data[i].m.length;
                  console.log(data[i].m.length);
              }
          }
       });  
    };
    
    
    this.updateRoomHeadCount = function(roomId) {
        rt.room(roomId, function(object) {
          if (object) {
            object.count(function(data) {
                headCount[roomId] = data;
            });
          } 
        });        
    };   
    
    
    this.enterRoom = function (roomId){
        rt.room(roomId, function(object) {
          if (object) {
            connectStatus.currRoom = object;
            connectStatus.currRoom.join(function() {});
            connectStatus.currRoom.receive(function(data) {
                console.log(data);
                var time = data.timestamp;
                var msgReceived = data.msg.text;
                msgReceived = String(msgReceived).replace(/^\s+/, '').replace(/\s+$/, '');
                console.log("msg received: " + msgReceived);
                $rootScope.$broadcast("newReply");
                allMsg.push({
                    text: msgReceived,
                    author: data.fromPeerId,
                    date: new Date()
                });
                $rootScope.$apply();
            });
          } 
        });
    };
    
    this.leaveRoom = function(roomId) {
        if(connectStatus.currRoom) {
            connectStatus.currRoom.leave();
            connectStatus.currRoom = '';
        }
        allMsg = [];
        
    };
    

    
    
 
});


/*
    var COLORS = [
        '#00ACE9', '#F6F6E8', '#f8a700', '#f78b00',
        '#D43F3F', '#D22F3F', '#D22F3F', '#4ae8c4',
        '#B32F1b', '#3824aa', '#a700ff', '#d300e7'
    ];    

    //get text color from username
    function getUsernameColor (username) {
        // Compute hash code
        var hash = 7;
        for (var i = 0; i < username.length; i++) {
            hash = username.charCodeAt(i) + (hash << 5) - hash;
        }
        // Calculate color
        var index = Math.abs(hash % COLORS.length);
        return COLORS[index];
    }    
    
    
      // Display message by adding it to the message list
      function addMessageToList(username,style_type,message){
          var color = style_type ? getUsernameColor(username) : null
          allMsg.push({content: message,style:style_type,username:username,color:color});
      }




*/
