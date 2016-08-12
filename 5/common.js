var http=require('http');
var querystring=require('querystring');//序列化对象

var postData=querystring.stringify({
	'content':'一起期待下一期的课程',
	'cid':8837
});
var options={
	hostname:'www.imooc.com',
	port:80,
	path:'course/docomment',
	method:'POST',
	headers:{
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=ff5e5568-6519-4d92-8e75-1fe77ddaaa95; imooc_isnew_ct=1458536706; loginstate=1; apsid=M2NDE3NmNkNWVlMDYyNzczZTNjMjc1YTM4MTE3NDMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjE3MDE3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3ODQ5NzUxMjhAcXEuY29tAAAAAAAAAAAAAAAAAAAAAGJhMTdiMWM1MWRlMmI2OTQ5ZjFiZjkxOGY4YzA2NmQ1wTiHV8E4h1c%3DOT; last_login_username=784975128%40qq.com; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1468672478,1469061443,1469083348,1469160578; PHPSESSID=pcidhlmfelfrpp29l4jqahco13; IMCDNS=0; imooc_isnew=2; cvde=57aaee8a39d0f-42',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/video/8837',
		'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
}

var req=http.request(options,function(res){
	console.log('Status:'+res.statusCode);
	console.log('Status:'+JSON.stringify(res.headers) );
	res.on('data', function(chunk) {
		//数据是buffer类型
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	});
	res.on('end', function() {
		console.log('评论完毕');
	});
});
	req.on('error', function(e) {
		console.log('Error:'+e.message);
	});
	//写入请求体
	req.write(postData);
	req.end();