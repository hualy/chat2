var http=require('http');
var url='http://www.imooc.com/learn/348';

http.get(url,function(res){
	var html='';//字符串缓存，通过拼接
	res.on('data', function(data) {
		html+=data;
	});
	res.on('end', function(event) {
		console.log(html);
	});
}).on('error', function(event) {
	console.log('获取内容出错');
});