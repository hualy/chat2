var flow = require('nimble');
/*
setTimeout(function(){
  console.log('i execute first.');
  setTimeout(function(){
    console.log('i execute next');
    setTimeout(function(){
      console.log('i execute last');
    },100)
  },500)
},1000)
*/
//给Nimble一个函数数组，让它一个接一个地执行
flow.series([
  function (callback) {
    setTimeout(function() {
      console.log('I execute first.');
      callback();
    }, 1000);
  },
  function (callback) {
    setTimeout(function() {
      console.log('I execute next.');
      callback();
    }, 500);
  },
  function (callback) {
    setTimeout(function() {
      console.log('I execute last.');
      callback();
    }, 100);
  }
]);