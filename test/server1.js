var http = require('http');
var url = require('url');
var items = [];//Javascript数组存放数据【事项数组】

var server = http.createServer(function(req, res){
  switch (req.method) {//请求所用的HTTP方法
    case 'POST':
      var item = '';//为进来的事项设置字符串缓存
      req.setEncoding('utf8');
      req.on('data', function(chunk){
        item += chunk;//将数据拼接到字符串缓存上
      });
      req.on('end', function(){
        items.push(item);//将完整的事项压入事项数组中
        res.end('OK\n');
      });
      break;
    case 'GET':
      var body=items.map(function(item, i) {
        return i+')'+item;
      });
      res.setHeader('Content-Length',Buffer.byteLength(body));
      res.setHeader('Content-Type','text/plain;charset="utf-8"');
      res.end(body);
      break;
    case 'DELETE':
      var path=url.parse(req.url).pathname;
      var i=parsseIn(path.slice(1),10);
      //检查数字是否有效
      if(isNaN(i)){
        res.statusCode=400;
        res.end('Invalid item id');
      }else if(!items[i]){
        res.statusCode=404;
        res.end('Item not found');
      }else{
        items.splice(i,1);
        res.end('OK\n');
      }
      break;
  }
});
server.listen(3000);