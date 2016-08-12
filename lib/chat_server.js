var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};
//启动Socket.IO服务器
//首先是连接处理逻辑
exports.listen = function(server) {
  //启动Socket.IO服务器，允许搭载在一个已有的HTTP服务器上
  io = socketio.listen(server);
  io.set('log level', 1);
  //定义每一个连接的处理逻辑（监听器）
  io.sockets.on('connection', function (socket) {
    //在用户连接上来时赋予其一个访客名
    guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
    //在用户连接上来时把他放进入聊天室Lobhy中
    joinRoom(socket, 'Lobby');
    //处理用户端消息更名，以及聊天室的创建和变更
    handleMessageBroadcasting(socket, nickNames);
    handleNameChangeAttempts(socket, nickNames, namesUsed);
    handleRoomJoining(socket);
    //用户发出请求时，向其提供已被占用的聊天室的列表
    socket.on('rooms', function() {
      socket.emit('rooms', io.sockets.manager.rooms);
    });
    //定义用户断开连接后的清除逻辑
    handleClientDisconnection(socket, nickNames, namesUsed);
  });
};
//其次是这个处理程序 所需要的辅助函数
//分配昵称
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
  //生成新的昵称
  var name = 'Guest' + guestNumber;
  //把用户昵称跟客户端连接ID关联上
  nickNames[socket.id] = name;
  //让用户知道他们的昵称
  socket.emit('nameResult', {
    success: true,
    name: name
  });
  //存放已被占用的昵称
  namesUsed.push(name);
  //增加用来生成昵称的计数器
  return guestNumber + 1;
}
//进入聊天室
function joinRoom(socket, room) {
  //让用户进入房间
  socket.join(room);
  //记录用户当前的房间
  currentRoom[socket.id] = room;
  //让用近乎知道他们进入了新的房间
  socket.emit('joinResult', {room: room});
  //让房间里的其他用户知道有新的用户进来
  socket.broadcast.to(room).emit('message', {
    text: nickNames[socket.id] + ' has joined ' + room + '.'
  });
  //确定有哪些用户在这个房间里
  var usersInRoom = io.sockets.clients(room);
  //如果不止一个用户在这个房间，汇总一下都是谁
  if (usersInRoom.length > 1) {
    var usersInRoomSummary = 'Users currently in ' + room + ': ';
    for (var index in usersInRoom) {
      var userSocketId = usersInRoom[index].id;
      if (userSocketId != socket.id) {
        if (index > 0) {
          usersInRoomSummary += ', ';
        }
        usersInRoomSummary += nickNames[userSocketId];
      }
    }
    usersInRoomSummary += '.';
    //将房间里其他用户的汇总发送给这个用户
    socket.emit('message', {text: usersInRoomSummary});
  }
}
//处理昵称变更请求
function handleNameChangeAttempts(socket, nickNames, namesUsed) {
  //添加nameAttempt事件（监听器）
  socket.on('nameAttempt', function(name) {
    //昵称不能以Guest开头
    if (name.indexOf('Guest') == 0) {
      socket.emit('nameResult', {
        success: false,
        message: 'Names cannot begin with "Guest".'
      });
    } else {
      //如果用户还没注册就注册上
      if (namesUsed.indexOf(name) == -1) {
        var previousName = nickNames[socket.id];
        var previousNameIndex = namesUsed.indexOf(previousName);
        namesUsed.push(name);
        nickNames[socket.id] = name;
        //删除之前用的昵称，让其他用户可以使用
        delete namesUsed[previousNameIndex];
        socket.emit('nameResult', {
          success: true,
          name: name
        });
        socket.broadcast.to(currentRoom[socket.id]).emit('message', {
          text: previousName + ' is now known as ' + name + '.'
        });
      } else {
        //如果昵称已经被占用，交给客户端发送错误消息
        socket.emit('nameResult', {
          success: false,
          message: 'That name is already in use.'
        });
      }
    }
  });
}
//发送聊天信息
function handleMessageBroadcasting(socket) {
  //message监听器
  socket.on('message', function (message) {
    //转发信息
    socket.broadcast.to(message.room).emit('message', {
      text: nickNames[socket.id] + ': ' + message.text
    });
  });
}
//创建房间
function handleRoomJoining(socket) {
  socket.on('join', function(room) {
    socket.leave(currentRoom[socket.id]);
    joinRoom(socket, room.newRoom);
  });
}
//用户断开连接
function handleClientDisconnection(socket) {
  socket.on('disconnect', function() {
    var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
    delete namesUsed[nameIndex];
    delete nickNames[socket.id];
  });
}
