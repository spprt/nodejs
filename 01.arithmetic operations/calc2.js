/**
 * module.exports : 하나의 변수나 함수 또는 객체 할당
 */
var calc = {};
calc.add = function(a,b) {
	return a + b;
}
calc.sub = function(a,b) {
	return a - b;
}
calc.mul = function(a,b) {
	return a * b;
}
calc.div = function(a,b) {
	return a / b;
}

module.exports = calc;
