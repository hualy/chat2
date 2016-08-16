/**
 * Created by Hualy on 2016/8/15.
 */
var http = require('http');
var jade = require('jade');
// var template = 'strong #{message}';
// var content = {message:'hello template'};
// var template = 'a(href = url)';
// var content = {url:'http://google.com'};
var fs = require('fs');
http.createServer(function (req,res) {
    res.writeHead(200,{'Content-Type':'text/html'})
    //1.compile(source，options)
    //jade.compile 返回一个函数，生成html
    // var fn = jade.compile('div #{course}',{});
    // var html = fn({course:'jade'});
    // var templateFile = './page.jade';//读取模板
    // var iterTemplate = fs.readFileSync(templateFile);
    // var content = {messages:[
    //     'you have logged in successfully.',
    //     'welcome back'
    // ]};//读取内容
    // var iterFn = jade.compile(iterTemplate,{filename:templateFile});//生成模板的函数
    // var html = iterFn(content);//函数生成内容
    var template = fs.readFileSync('./page.jade');
    var content = {messages:[
        'you have logged in successfully.',
        'welcome back'
    ]};//读取内容
    var fn = jade.compile(template,{filename:'./page.jade'});//模板生成函数
    var html = fn(content);
    console.log(html);
    res.end(html);
}).listen(1337);
console.log('server running at 1337');

