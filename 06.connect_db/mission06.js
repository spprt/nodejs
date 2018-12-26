// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');
var path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser');
var static = require('serve-static');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');

//Session 미들웨어 불러오기
var expressSession = require('express-session');

// 오류 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// 파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');

// 클라이언트에서 ajax로 요청했을 때 CORS(다중 서버 접속) 지원
var cors = require('cors');

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-unlencoded 파싱
app.use(bodyParser.urlencoded({extended:false}));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더와 uploads 폴더 오픈
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

// 클라이언트에서 ajax로 요청했을 때 CORS(다중 서버 접속) 지원
app.use(cors());

// multer 미들웨어 사용 : 미들웨어 사용 순서 중요 body-parser -> multer -> router
// 파일 제한:10개, 16
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'uploads')
    },
    filename : function(req, file, callback) {
        callback(null, file.originalname + Date.now())
    }
});

var upload = multer({
    storage : storage,
    limits: {
        files: 10,
        fileSize : 1024 * 1024 * 1024
    }
});

// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

// 라우팅 함수 등록
router.route('/process/memo').post(upload.array('photo', 1), function(req, res) {
   console.log('/process/memo 호출됨.');
    
    try {
        var files = req.files;
        var paramName = req.body.name || req.query.name;
        var paramDate = req.body.date || req.query.date;
        var paramContent = req.body.content || req.query.content;
    
        // 현재의 파일 정보를 저장할 변수 선언
        var originalname = '';
        var filename = '';
        var mimetype = '';
        var size = 0;
        
        if (Array.isArray(files)) {
            console.log('배열에 들어있는 파일 개수 : %d', files.length);
            
            for (var index = 0; index < files.length; index++) {
                originalname = files[index].originalname;
                filename = files[index].filename;
                mimetype = files[index].mimetype;
                size = files[index].size;
            }
        }
        
        console.log('작성자 : ' + paramName);
        console.log('작성일자 : ' + paramDate);
        console.log('내용 : ' + paramContent);
        console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' + size);
        
        // 클라이언트에 응답 전송
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h3>나의 메모</h3>');
        res.write('<hr/>');
        res.write('<p>메모가 저장되었습니다.</p>');
        res.write('<img src="/uploads/' + filename + '">');
        res.write('<br><br><a href="/public/mission04.html">다시 작성</a>');
        res.end();
    } catch(err) {
        console.dir(err.stack);
    }
});

// 등록되지 않은 패스에 대해 페이지 오류 응답
/*
app.all('*', function(req, res) {
   res.status(404).send('<h1>ERROR - 페이지를 찾을 수 없습니다.</h1>'); 
});*/

app.use('/', router);

// 모든 router 처리 끝난 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
   static: {
       '404':'./public/404.html'
   } 
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express 서버가 시작됨');
});
