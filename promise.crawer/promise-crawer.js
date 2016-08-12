var http=require('http');
var Promise=require('Promise');
var cheerio=require('cheerio');
var baseUrl='http://www.imooc.com/learn/';
var url='http://www.imooc.com/learn/348';
var videoIds=[348,259,197,134,75];

function filterChapters(html){
	//装载内容
	var $=cheerio.load(html);
	//拿到章(这是个数组)
	var chapters=$('.chapter');

	var title=$('#page_header .path span').text();
	//拿到i标签的数组，再封装节点才有text（）
	//trim（）去掉多余的空格
	//字符串改为数值型 parseInt（字符串，10）
	var number=parseInt($($('.info_num i')[0]).text().trim(),10);
	// courseData={
	// 	title:title,
	// 	number:number,
	// 	videos:[{
	// 		chapterTitle:'',
	// 		videos:[{
	// 			title:'',
	// 			id:''
	// 		}]
	// 	}]
	// }
	var courseData={
		title:title,
		number:number,
		videos:[]
	}
	//遍历数组
	chapters.each(function(item) {
		//拿到单独的每一章
		var chapter=$(this);
		//找到某个选择器，选择内容text（）
		var chapterTitle=chapter.find('strong').text();
		//拿到ul再拿到li（这是个数组）
		var videos=chapter.find('.video').children('li');

		var chapterData={
			chapterTitle:chapterTitle,
			videos:[]
		}
		//遍历数组
		videos.each(function(item) {
			//拿到a标签
			var video=videos.find('.studyvideo');
			//拿到a标签里面的内容
			var videoTitle=video.text();
			//split里面的内容作为分隔符
			var id=video.attr('href').split('video/')[1];
			//往数组里面放东西
			chapterData.videos.push({
				title:videoTitle,
				id:id
			});
		});
		//往数组里面放内容
		courseData.videos.push(chapterData);
	});
	return courseData;
}

function printCourseInfo(coursesData){
	//each与foreach的区别？？？
	coursesData.forEach(function(courseData){
		console.log(courseData.number+'人学过'+courseData.title+'\n');
	})
	courseData.forEach(function(item){
		console.log('###'+courseData.title+'\n');
		courseData.forEach(function(item){
			var chapterTitle=item.chapterTitle;
			console.log(chapterTitle+'\n');
			item.videos.forEach(function(video){
				console.log('['+video.id+']'+video.title+'\n');
			})
		})
	})
}



function getPageAsync(url){
	//返回一个[promise对象]
	//里面有一个回调函数
	return new Promise(function(resolve,reject){
		console.log('正在爬取'+url);
		http.get(url,function(res){
			var html='';//字符串缓存，通过拼接
			res.on('data', function(data) {
				html+=data;
			});
			res.on('end', function(event) {
				resolve(html);


				//console.log(html);
				//进行数据过滤
				//var courseData=filterChapters(html);
				//打印出来
				//printCourseInfo(courseData);
			});
		}).on('error', function(e) {
			reject(e);
			console.log('获取内容出错');
			});
		})
}
//取得好几个promise

var fetchCourseArray=[];
//每个课程的ID进行遍历
videoIds.forEach(function(id){
	//组建数组
	fetchCourseArray.push(getPageAsync(baseUrl+id));
})
//并发控制，同时爬取
Promise
	.all([fetchCourseArray])
	.then(function(pages){
		//对多个页面的数据的处理
		var courseData=[];
		pages.forEach(function(html){
			var courses=filterChapters(html);
			courseData.push(courses);
		});
		coursesData.sort(function(a,b){
			return a.number<b.number
		});
		printCourseInfo(coursesData);
	})









