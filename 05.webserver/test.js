var http = require('http');
var fs = require('fs');

// 웹 서버 객체 생성
var server = http.createServer();

// 웹 서버 시작하여 5800포트에서 대기
var port = 5800;
server.listen(port, function() {
	console.log('웹서버 시작 : %d', port);
});

// 클라이언트 연결 이벤트 처리
server.on('connection', function(socket) {
	var addr = socket.address();
	console.log('클라이언트가 접속했습니다. : %s, %d', addr.address, addr.port);
});

// 클라이언트 요청 이벤트 처리
server.on('request', function(req, res) {
	console.log('클라이언트 요청');
	var filename = '1100.png';
	fs.readFile(filename, function(err, data) {
		res.writeHead(200, {'Content-Type' : 'image/png'});
		res.write(data);
		res.end();
	});
});

// 서버 종료 이벤트 처리
server.on('close', function() {
	console.log('서버 종료');
});
