/**
 * Created by Hualy on 2016/8/15.
 */
var http = require('http');
var jade = require('jade');
var htlm2jade = require('html2jade');
http.createServer(function (req,res) {
    //纯文本
    res.writeHead(200,{'Content-Type':'text/html'})
    // htlm2jade.convertDocument(document,{},function (err,jade) {
    //    
    //    
    // })
    //1.compile(source，options)
    //jade.compile 返回一个函数，生成html
    // var fn = jade.compile('div #{course}',{});
    // var html = fn({course:'jade'});

    //2.jade.render
    //jade.render(source，options)
    // var html = jade.render('div #{course}',{course:'jade render'})

    //3.jade.renderFile(filename路径,options)
    var html = jade.renderFile('index.jade',{course:'jade renderFile',pretty:true});
    res.end(html);
}).listen(1337,'127.0.0.1');
console.log('Server running at 1337');