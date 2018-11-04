var url = require('url');

var curURL = url.parse('http://m.search.naver.com/search.naver?query=test');

var curStr = url.format(curURL);

console.log('%s', curStr);
console.dir(curURL);