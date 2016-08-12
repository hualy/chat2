//变量声明
var http = require('http');//内置的http模块提供了HTTP服务器和客户端功能
var fs  = require('fs');//内置的fs模块提供了与文件系统相关的功能
var path = require('path');//内置的path模块提供了与文件系统路径相关的功能
var mime = require('mime');//附加的mime模块有根据文件扩展名得出MIME类型的能力
var cache = {};//cache是用来缓存文件内容的对象
//三个服务函数提供静态HTTP文件服务
//1。请求文件不存在发送404错误
function send404(response) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write('Error 404: resource not found.');
  response.end();
}
//2.提供文件数据服务
function sendFile(response, filePath, fileContents) {
  response.writeHead(
    200, 
    {"content-type": mime.lookup(path.basename(filePath))}
  );
  response.end(fileContents);
}
//3.缓存静态文件
function serveStatic(response, cache, absPath) {
  if (cache[absPath]) {//检查文件是否缓存在内存中
    sendFile(response, absPath, cache[absPath]);//从内存中返回文件
  } else {
    fs.exists(absPath, function(exists) {//检查文件是否存在
      if (exists) {
        fs.readFile(absPath, function(err, data) {
          if (err) {
            send404(response);
          } else {
            cache[absPath] = data;
            sendFile(response, absPath, data);//从硬盘中读取文件并返回
          }
        });
      } else {
        send404(response);//文件不存在，发送http404响应
      }
    });
  }
}
//创建HTTP服务器，用匿名函数定义对每个请求的处理行为
var server = http.createServer(function(request, response) {
  var filePath = false;

  if (request.url == '/') {
    filePath = 'public/index.html';//确认返回的默认HTML文件
  } else {
    filePath = 'public' + request.url;//确认返回的默认HTML文件
  }

  var absPath = './' + filePath;
  serveStatic(response, cache, absPath);//返回静态文件
});
//启动HTTP服务器
server.listen(3000, function() {
  console.log("Server listening on port 3000.");
  console.log("Server listening on port 3000.");
});

//加载一个定制的Node模块，提供的逻辑来处理基于Socket.IO
//的服务器聊天功能
var chatServer = require('./lib/chat_server');
//启动Socket.IO服务器，提供一个http服务器，就能共享同一个TCP/IP端口
chatServer.listen(server);