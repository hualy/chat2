var pet={
	words:'...',
	speak:function(say){
		console.log(say+' '+this.words);
	}
}

//pet.speak('Speak');


var dog={
	words:'wang'
}
//call改变的this指向的上下文（原来是pet），指向了dog
//call是参数列表，apply是参数数组
pet.speak.call(dog,'Speak');