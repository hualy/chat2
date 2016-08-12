var http=require('http');
var server=http.createServer(function(req,res){
	var url='http://google.com';
	var body='<p>Readirectiong to<a href="'+url+'">'+url+'</a></p>';
	res.setHeader('Location',url);
	res.setHeader('Content-Lenght', body.length);
	res.setHeader('Content-Type','text/plain');
	res.statusCode=200;
	res.end(body);
});
server.listen(3000);