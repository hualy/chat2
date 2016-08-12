function learn(something){
	console.log(something);
}

function we(callback,something){
	something+='is cool';
	callback(something);
}

//具名函数
we(learn,'Nodejs');
//匿名函数
we(function(something){
	console.log(something);
},'Jade')

var c=0;
function printIt(){
	console.log(c);
}
function plus(callback){
	setTimeout(function(){
		c+=1;
		callback();
	},1000);
}
plus(printIt);