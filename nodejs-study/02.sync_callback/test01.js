function add(a, b, callback) {
	var result = a+b;
	callback(result);
	
	var history = function() {
		return a + ' + ' + b + ' = ' + result;
	};
	
	return history;
}

var add_history = add(10, 10, function(result) {
	console.log('callback function');
	console.log('add result : %d', result);
});

console.log('return func result : ' + add_history());
