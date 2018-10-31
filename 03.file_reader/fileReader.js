/**
 * fs모듈 (file system) : 파일을 다루는 모듈
 * readline모듈 : 문자열을 한 줄씩 읽어들이는 모듈
 */
var fs = require('fs');
var readline = require('readline');
function processFile(filename) {
	// instream 변수에 읽을 파일을 읽기 스트림 형식으로 저장
	var instream = fs.createReadStream(filename);
	// 읽은 스트림을 새로운 인터페이스로 생성하기 위한 변수 reader 선언
	var reader = readline.createInterface(instream, process.stdout);
	var count = 0;
	
	// 한 줄씩 읽어들인 훔에 발생하는 이벤트 정의
	reader.on('line', function(line) {
		console.log('read link : ' + line);
		count += 1;
		var tokens = line.split(' ');
		if (tokens != undefined && tokens.length > 0) {
			console.log('#' + count + '->' + tokens[0]);
		}
	});
	reader.on('close', function(line) {
		console.log('read complete.');
	});
}
var filename = './customer.txt';
processFile(filename);

