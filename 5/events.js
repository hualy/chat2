var EventEmitter=require('events').EventEmitter;
//生成实例
var life= new EventEmitter();
//加上事件监听：addListener==on
//（事件，回调函数）
life.setMaxListeners(11);

function water(who){
	console.log('给'+who+'倒水');
}
life.on('求安慰', water);

life.on('求安慰', function(who) {
	console.log('给'+who+'倒水1');
});
life.on('求安慰', function(who) {
	console.log('给'+who+'倒水2');
});
life.on('求安慰', function(who) {
	console.log('给'+who+'倒水3');
});
life.on('求安慰', function(who) {
	console.log('给'+who+'倒水4');
});
life.on('求安慰', function(who) {
	console.log('给'+who+'倒水5');
});
life.on('求安慰', function(who) {
	console.log('给'+who+'倒水6');
});
life.on('求安慰', function(who) {
	console.log('给'+who+'倒水7');
});
life.on('求安慰', function(who) {
	console.log('给'+who+'倒水8');
});
life.on('求安慰', function(who) {
	console.log('给'+who+'倒水9');
});
life.on('求安慰', function(who) {
	console.log('给'+who+'倒水10');
});
life.on('求溺爱', function(who) {
	console.log('gei'+who+'买衣服');
});
life.on('求溺爱', function(who) {
	console.log('gei'+who+'交工资');
});

//移除事件
//匿名函数
// life.removeListener('求安慰', function(who){
// 	console.log('给'+who+'倒水');
// })
//具名函数
life.removeListener('求安慰',water);
//批量移除[event]
// life.removeAllListeners();
life.removeAllListeners('求安慰');


//触发（事件，参数）
var hasComfortListener=life.emit('求安慰','汉子');
var hasLovedListener=life.emit('求溺爱','妹子');

//打印监听
console.log(life.listeners('求安慰').length);
console.log(life.listeners('求溺爱').length);
//另一种打印出某个事件的监听数量，(实例的名字，事件)
//console.log(EventEmitter.listenerCount(life,'求安慰'));



// var hasPlayedListener=life.emit('求玩坏','汉子和妹子');

// console.log(hasComfortListener);
// console.log(hasLovedListener);
// console.log(hasPlayedListener);