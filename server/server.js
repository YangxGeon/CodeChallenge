const express = require("express");
const app = express();
const path = require("path");
var file = [];
var child_process = require("child_process");
const bcrypt = require("bcrypt")
const session = require('express-session');
const saltRounds = 10;
const cookieParser = require("cookie-parser");
var MySQLStore = require('express-mysql-session')(session);

var options ={      
  host: "10.0.20.120",
  port: 3306,
  user: "manager",
  password: "pw123",
  database: "AlgoDB"
};
var sessionStore = new MySQLStore(options);                  

app.use(session({                                              
  secret:"asdfasffdas",
  resave:false,
  saveUninitialized:true,
  store: sessionStore                                         
}))

app.listen(8080, function () {
  console.log("listening on 8080");
});

app.use(express.json());
var cors = require("cors");
const { writeFile } = require("fs");
app.use(cors());

app.use(express.static(path.join(__dirname, "../app/build")));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "../app/build/index.html"));
});

app.post("/code", function (request, response) {
  var newFile = {
    text: request.body.value,
    option: request.body.selectedOption
  };
  let fs = require("fs");
  let data = newFile.text;
  let filename = "main";
  let lang = ""
  let username = "12345"
  let quiznum = "12345"
  let timelimit = "5"
  let time = ""
  // let memlimit = ""
  if (newFile.option === "py") {
    lang = "python"
    time = `# ${Date.now()}\n`;
  }
  else if (newFile.option === "java"){
    lang = "java" 
    time = `// ${Date.now()}\n`;
  }
  else{
    lang = "cpp"
    time = `// ${Date.now()}\n`;
  }
  fs.writeFileSync(`./codefile/${lang}_pipeline/${filename}.${newFile.option}`, time, "utf-8");
  fs.appendFileSync(`./codefile/${lang}_pipeline/${filename}.${newFile.option}`, data, "utf-8");
  file.push(newFile);
  console.log(file);
  const shell = require('shelljs');
  shell.exec(`./autopush.sh ${lang} ${quiznum} ${username} ${timelimit}`);
});

var mysql = require("mysql2");
app.use(cookieParser());

var connection = mysql.createConnection({
  host: "10.0.20.120",
  user: "manager",
  password: "pw123",
  database: "AlgoDB"
});

connection.connect();

app.get("/duplicate", (req, res) => {
  connection.query(`SELECT * from user where id="${req.query.id}"`, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/solveDB", (req, res) => {
  console.log(req.query)
  connection.query(`SELECT * from solve where questionnum="${req.query.questionnum}" and submitter="${req.query.submitter}" order by submissiontime desc limit 1`, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});

app.get("/quizDB", (req, res) => {
  connection.query("SELECT * from question", function (error, results) {
    if (error) throw error;
    res.json(results);
  })
})

// React Router 사용
app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "../app/build/index.html"));
});


// 회원가입 요청
app.post("/join", async (req, res) => {
  // green1234
  console.log("join")
  let myPlaintextPass = req.body.userpass;
  let myPass = "";
  if (myPlaintextPass != "" && myPlaintextPass != undefined) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(myPlaintextPass, salt, function (err, hash) {
        // Store hash in your password DB.
        myPass = hash;
        console.log(myPass);
        // 쿼리 작성s
        const { username, userid, userstate, usermail, usermanager } = req.body;
        // connection.query 인자 첫번째: 쿼리문, 두번째: 쿼리문에 들어갈 값, 세번째: 처리 되면 하는 애
        connection.query(
          "insert into user(id, pw, name, email, state, manager) values(?,?,?,?,?,?)",
          [userid, myPass, username, usermail, userstate, usermanager],
          (err, result, fields) => {
            console.log(result);
            console.log(err);
            res.send("등록되었습니다.");
          }
        );
      });
    });
  }
});

app.post('/login_process', function (request, response) {
  var username = request.body.loginID;
  var password = request.body.loginPassword;
  console.log("login_process")
  console.log(username)
  console.log(password)
  if (username && password) {             // id와 pw가 입력되었는지 확인
      connection.query(`SELECT pw,manager FROM user WHERE id = "${username}"`, function(error, results, fields){
          if (error) throw error;
          console.log(results)
          if (results.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
              bcrypt.compare(password, results[0].pw, function(err,result){
                console.log(result)
                response.json({message:'success'})
                if(result){
                  request.session.uid = username;
                  request.session.author_id = results[0].manager;
                  request.session.isLogined = true;
                  request.session.save(function(){             
              });
                }
              })
          } 
          else {              
              response.json({messsage:'failed'});   
          }            
      });

  } else {
      response.send(`<script type="text/javascript">alert("아이디와 비밀번호를 입력하세요!"); 
      document.location.href="/auth/login";</script>`);    
  }
});

app.post('/logout', (req, res) => {
  if (!req.session.userId) {
    res.status(400).send({ data: null, message: 'not authorized' });
  } 
  else {
    req.session.destroy();      // 세션 삭제
    res.json({ data: null, message: 'ok' });
  }
})

app.use(
  session({
    secret: '@codestates',
    resave: false,
    saveUninitialized: true,
    cookie: {
      domain: 'localhost',
      path: '/',
      maxAge: 24 * 6 * 60 * 10000,
      sameSite: 'none',
      httpOnly: true,
      secure: true,
    },
  })
);