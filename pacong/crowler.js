var http=require('http');
var cheerio=require('cheerio');
var url='http://www.imooc.com/learn/348';

function filterChapters(html){
	//装载内容
	var $=cheerio.load(html);
	//拿到章(这是个数组)
	var chapters=$('.chapter');
	var courseData=[];
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
		courseData.push(chapterData);
	});
	return courseData;
}

function printCourseInfo(courseData){
	//each与foreach的区别？？？
	courseData.forEach(function(item){
		var chapterTitle=item.chapterTitle;
		console.log(chapterTitle+'\n');
		item.videos.forEach(function(video){
			console.log('['+video.id+']'+video.title+'\n');
		})
	})
}

http.get(url,function(res){
	var html='';//字符串缓存，通过拼接
	res.on('data', function(data) {
		html+=data;
	});
	res.on('end', function(event) {
		//console.log(html);
		//进行数据过滤
		var courseData=filterChapters(html);
		//打印出来
		printCourseInfo(courseData);
	});
}).on('error', function(event) {
	console.log('获取内容出错');
});