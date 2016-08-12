var globalVariable = 'this is global variable';//全局变量

//全局函数
function globalFunction(){
	var localVariable='this is local variable';//局部变量
	console.log('visit global/local variable');
	console.log(globalVariable);
	console.log(localVariable);

	//修改全局变量
	globalVariable='this is change global variable';
	console.log(globalVariable);

	//局部函数
	function localFunction(){
		var innerLocalVariable='this is innerLocalVariable';
		console.log('visit global/local/innerlocal variable');
		console.log(globalVariable);
		console.log(localVariable);
		console.log(innerLocalVariable);
	}
	//在局部调用
	localFunction();

}

//在全局调用
globalFunction();