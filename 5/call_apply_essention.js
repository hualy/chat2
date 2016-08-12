function Pet(words){
	this.words=words;
	this.speak=function(){
		console.log(this.words)
	}
}
function Dog(words) {
	//call改变了Pet中的this的上下文（原本是Pet）后来变成了Dog
	Pet.call(this,words);
	//Pet.apply(this,arguments)   arguments是一个数组
}

var dog = new Dog('Wang');
dog.speak();