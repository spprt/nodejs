var fs = require('fs');
/*
var infile = fs.createReadStream('./output.txt', {flags:'r'});
var outfile = fs.createWriteStream('./output2.txt', {flags:'w'});

infile.on('data', function(data) {
    console.log('읽어들인 데이터', data);
    outfile.write(data);
});

infile.on('end', function() {
   console.log('파일 읽기 종료');
    outfile.end(function() {
       console.log('파일 쓰기 종료'); 
    });
});



var inname = './output.txt';
var outname = './output2.txt';

fs.exists(outname, function(exists) {
   if (exists) {
       fs.unlink(outname, function(err) {
          if(err) throw err;
           console.log('기존 파일 [' + outname + '] 삭제함.');
       });
   }
    
    var infile = fs.createReadStream(inname, {flags:'r'});
    var outfile = fs.createWriteStream(outname, {flags:'w'});
    infile.pipe(outfile);
    console.log('파일 복사 [' + inname + '] ->' + outname + ']');
});

*/

var http = require('http');
var server = http.createServer(function(req, res) {
    var instream = fs.createReadStream('./output.txt');
    instream.pipe(res);
});
server.listen(7001, '127.0.0.1');
