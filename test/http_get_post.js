var http = require('http');
var items = [];

var server = http.createServer(function(req, res){
  if ('/' == req.url) {
    switch (req.method) {
      case 'GET':
        show(res);
        break;
      case 'POST':
        add(req, res);
        break;
      default:
        badRequest(res);//非post，get会得到400 Bad Request响应
    }
  } else {//不是‘/’都会得到404响应
    notFound(res);
  }
});

server.listen(3000);
