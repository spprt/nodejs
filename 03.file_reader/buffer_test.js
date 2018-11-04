var fs = require('fs');


// 동기식 파일 읽기
/*
var data = fs.readFileSync('./package.json', 'utf8');
console.log(data);
*/

// 비동기식 파일 읽기
/*
fs.readFile('./package.json', 'utf8', function(err, data) {
    console.log(data);
});

console.log('비동기식 파일 읽기 요청');
*/

// 파일 write
/*
fs.writeFile('./output.txt', 'Hello World', function(err) {
   if (err) {
       console.log('Error : ' + err);
   }
    console.log('output.txt 쓰기 완료');
});
*/
/*
fs.open('./output.txt', 'w', function(err, fd) {
   if (err) throw err;
    
    var buf = new Buffer('안녕!\n');
    fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer) {
        if (err) throw err;
        console.log(err, written, buffer);
        fs.close(fd, function() {
            console.log('파일 열고 데이터 쓰고 파일 닫기 완료');
        });
    });
});
*/
fs.open('./output.txt', 'r', function(err, fd) {
   if (err) throw err;
    
    var buf = new Buffer(10);
    console.log('버퍼 타입 : %s', Buffer.isBuffer(buf));
    
    fs.read(fd, buf, 0, buf.length, null, function(err, bytesRead, buffer) {
        if (err) throw err;
        
        var inStr = buffer.toString('utf8', 0, bytesRead);
        console.log('파일에서 읽은 데이터 : %s', inStr);
        
        console.log(err, bytesRead, buffer);
        
        fs.close(fd, function() {
           console.log('output.txt 파일 열고 읽기 완료'); 
        });
    });
});