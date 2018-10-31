/**
 * 자바스크립트 클로져
 * 함수 add()가 호출되면서 안에있는 지역변수 count를 0으로 저장해놓고
 * history()이름의 클로저 함수를 만들고 변수없이 증감, 리턴한 뒤 클로저 함수 종료 후  add함수 종료
 * add()안의 지역변수 count는 함수가 종료되어도 클로저 함수가 변수를 사용하고 있어서 변수의 값 유지
 * @param a
 * @param b
 * @param callback
 * @returns
 */

function add(a, b, callback) {
	var result = a+b;
	callback(result);
	
	var count = 0;
	var history = function() {
		count++ ;
		return count + ' : ' + a + ' + ' + b + ' = ' + result;
	};
	
	return history;
}

var add_history = add(10, 10, function(result) {
	console.log('callback function');
	console.log('add result : %d', result);
});

console.log('return func result : ' + add_history());
console.log('return func result : ' + add_history());
console.log('return func result : ' + add_history());
