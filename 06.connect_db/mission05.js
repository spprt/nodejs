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

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

// 클라이언트에서 ajax로 요청했을 때 CORS(다중 서버 접속) 지원
//app.use(cors());

// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

// 라우팅 함수 등록
router.route('/process/memo').post(function(req, res) {
   console.log('/process/memo 호출됨.');
    
    try {
        console.log(req.body);
        console.log(req.query);
        var paramName = req.body.name || req.query.name;
        var paramDate = req.body.date || req.query.date;
        var paramContent = req.body.content || req.query.content;
    
        console.log('작성자 : ' + paramName);
        console.log('작성일자 : ' + paramDate);
        console.log('내용 : ' + paramContent);
        
        // 클라이언트에 응답 전송
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h3>나의 메모</h3>');
        res.write('<hr/>');
        res.write('<p>메모가 저장되었습니다.</p>');
        res.write('<br><br><a href="/public/mission05.html">다시 작성</a>');
        res.end();
    } catch(err) {
        console.dir(err.stack);
    }
});

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
