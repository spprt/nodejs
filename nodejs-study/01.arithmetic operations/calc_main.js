/**
 * 분리전 결과 
 */
//var calc = {};
//calc.add = function(a,b) {
//	return a + b;
//}
//
//console.log('분리전 결과 : %d', calc.add(10,10));

/**
 * 메인 파일에서 모듈을 불러올 때는 require('./모듈프로젝트파일이름)
 */
var calc = require('./calc');
console.log('calc.add : %d', calc.add(10,10));
console.log('calc.sub : %d', calc.sub(10,10));
console.log('calc.mul : %d', calc.mul(10,10));
console.log('calc.div : %d', calc.div(10,10));

var calc2 = require('./calc2');
console.log('calc2.add : %d', calc2.add(20,10));
console.log('calc2.sub : %d', calc2.sub(20,10));
console.log('calc2.mul : %d', calc2.mul(20,10));
console.log('calc2.div : %d', calc2.div(20,10));
