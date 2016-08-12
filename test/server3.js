var http=require('http');
var formidable=require('formidable');

var server=http.createServer(function(req,res){
	switch (req.method) {
		case 'GET':
			show(req,res);
			break;
		case 'POST':
			upload(req,res);
			break;
	}
}).listen(3000);
function show(req,res){
	var html=''
		+'<form method="post" action="/" enctype="multipart/form-data">'
		+'<p><input type="text" name="name" /></p>'
		+'<p><input type="file" name="file" /></p>'
		+'<p><input type="submit" value="Upload" /></p>'
		+'</form>';
	res.setHeader('Content-Type','text/html');
	res.setHeader('Content-Length',Buffer.byteLength(html));
	res.end(html);
}
function upload(req,res){
	if(!isFormData(req)){
		res.statusCode=400;
		res.end('Bad Request:expecting multipart/form-data');
		return;
	}
	//这是一个文件上传请求
	var form=new formidable.IncomingForm();//初始化一个新的表单
	form.parse(req,function(err,fields,files){
		console.log(fields);
		console.log(files);
		res.end('upload complete');
	});
	form.on('progress', function(bytesReceived,byteExpected) {
		var percent=Math.floor(bytesReceived/byteExpected*100);
		console.log(percent);
	});
}
function isFormData(req){
	var type=req.headers['content-type']||'';
	//采用String.indexOf()方法检查请求头中的Content-Type字段
	//断言它的值是以multipart/form-data开头的
	return 0==type.indexOf('multipart/form-data');
}