
const express = require("express");
const app = express();
const path = require("path");
var file = [];
var child_process = require("child_process");
let fs = require("fs");
const shell = require('shelljs');
var mysql = require("mysql2");
const { Console } = require('console');
const bcrypt = require("bcrypt")
const session = require('express-session');
const saltRounds = 10;
const cookieParser = require("cookie-parser");
var MySQLStore = require('express-mysql-session')(session);
app.use(cookieParser('asdfasffdas'));
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
var connection = mysql.createConnection({
  host: "10.0.20.120",
  user: "manager",
  password: "pw123",
  database: "AlgoDB"
});
connection.connect();
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
    option: request.body.selectedOption,
    quizId: request.body.quizId
  };
  let data = newFile.text;
  let filename = "main";
  let lang = ""
  let username = "12345"
  let quiznum = newFile.quizId
  let timelimit = "5"
  let time = ""
  let now = new Date();
  const nowtime = `${now.getFullYear()}.${now.getMonth()+1}.${now.getDate()}.${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}` 
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
  shell.exec(`./autopush.sh ${lang} ${quiznum} ${username} ${timelimit}`);
  connection.query(`INSERT into solve(questionnum, submitter, language, submissiontime) VALUES(${quiznum},"${username}","${lang}","${nowtime}")`, function(error,results){
    if (error) throw error;
  })
});
//manger 출제문제 받아오기
app.get("/manager/sel", (req, res) => {
  console.log(req.query.presenter)
  connection.query(`SELECT * from question where presenter="${req.query.presenter}"`, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});
// managerM 에서 db 정보 받아오기
app.get("/manager/modi", (req, res) => {
  connection.query(`SELECT * from question where questionnum=${req.query.questionnum}`, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});
//managerN 작성 완료 후 추가
app.get('/manager/insert', async (req, res) => {
  let now = new Date();
  let nowtime = `${now.getFullYear()}.${now.getMonth()+1}.${now.getDate()}.${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}` 
  let [results] = await connection.promise().query(`INSERT INTO question(
    title, trynum, correctnum, timelimit, memlimit, explanation, creationtime, presenter,input,output)
  VALUES ("${req.query.title}","0","0","${req.query.timelimit}","${req.query.memlimit}","${req.query.explanation}","${nowtime}","${req.query.presenter}","${req.query.input}","${req.query.output}");
    `)
  //   , function (error, results, fields) {
  //   if (error) throw error;
  // });
//  connection.query(`SELECT questionnum from question where title="${req.query.title}" ORDER BY creationtime DESC LIMIT 1`
//     ,function (error, results, fields) {
//     if (error) throw error;
//     console.log(results)
//     shell.exec(`./mkdir.sh ${results.questionnum}`);
//  });
  connection.query(`SELECT input,output from question where title="${req.query.title}" order by creationtime desc limit 1`,function(error, results, fields) {
    if (error) throw error;
    res.json(results);
    console.log(results[0].input);
    // fs.writeFileSync(`../../../case/test/in1.txt`, results.in, "utf-8");
  });
});
app.get("/manager/tc",(req,res) =>{
  console.log(req.query.title)
  connection.query(`SELECT questionnum,input,output from question where title="${req.query.title}" order by creationtime desc limit 1`,function (error, results, fields) {
    if (error) throw error;
    shell.exec(`./mkdir.sh ${results[0].questionnum}`);
    fs.writeFileSync(`../../../case/${results[0].questionnum}/in1.txt`, results[0].input, "utf-8");
    fs.writeFileSync(`../../../case/${results[0].questionnum}/out1.txt`, results[0].output, "utf-8");
    fs.writeFileSync(`../../../case/${results[0].questionnum}/result1.txt`, "", "utf-8");
  });
})
//managerM 수정완료후 db update
//수정후 테스크 케이스 1번 추가해야댐
app.get("/manager/modi/run", (req, res) => {
  connection.query(`UPDATE question SET title="${req.query.title}", timelimit="${req.query.timelimit}", memlimit="${req.query.memlimit}", input="${req.query.input}", output="${req.query.output}", explanation="${req.query.explanation}" WHERE questionnum = ${req.query.questionnum};`, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
    fs.writeFileSync(`../../../case/${req.query.questionnum}/in1.txt`, req.query.input, "utf-8");
    fs.writeFileSync(`../../../case/${req.query.questionnum}/out1.txt`, req.query.output, "utf-8");
  });
});
//manager 해당 데이터 삭제
// 테스트케이스도 삭제하는 행 추가해야됌
app.get("/manager/del", (req, res) => {
  connection.query(`DELETE FROM question WHERE questionnum = ${req.query.questionnum};`, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
  // fs.rmdirSync(`../../../case/${req.query.questionnum}`, {recursive : true});
});
app.get("/testcase/add",(req, res) => {
  dir = `../../../case/${req.query.questionnum}`
  fs.readdir(dir, (err, files) => {
  const filenum = parseInt(files.length/3)+1
  fs.writeFileSync(`${dir}/in${filenum}.txt`, req.query.input, "utf-8");
  fs.writeFileSync(`${dir}/out${filenum}.txt`, req.query.output, "utf-8");
  fs.writeFileSync(`${dir}/result${filenum}.txt`, "", "utf-8");
    //파일 이름`in${files.length/3+2}` 내용 req.query.input
    //파일 이름`out${files.length/3+2}` 내용 req.query.output
    //파일 이름`result${files.length/3+2}` 내용 ""
  });
});
//파일 읽어오기
app.get("/testcase/read",(req, res) =>{
  filePath = `../../../case/${req.query.questionnum}`
  const response = {input:"",output:""}
  let data1 = fs.readFileSync(`${filePath}/in${req.query.num}.txt`,'utf-8');
  let data2 = fs.readFileSync(`${filePath}/out${req.query.num}.txt`,'utf-8');
  response.input = data1
  response.output = data2
  res.json(response)
})
//파일 수정
app.get("/testcase/modi",(req, res) =>{
  fs.writeFileSync(`../../../case/${req.query.questionnum}/in${req.query.num}.txt`, req.query.input, "utf-8");
  fs.writeFileSync(`../../../case/${req.query.questionnum}/out${req.query.num}.txt`, req.query.output, "utf-8");
})
app.get("/solveDB", (req, res) => {
  console.log(req.query)
  connection.query(`SELECT * from solve where questionnum = ${req.query.questionnum} and submitter="${req.query.submitter}" order by submissiontime desc limit 1`, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});
app.get("/solveDB/insert",(req, res) =>{
  let now = new Date();
  const nowtime = `${now.getFullYear()}.${now.getMonth()+1}.${now.getDate()}.${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}`
  connection.query(`INSERT into solve(questionnum, submitter, language, submissiontime) VALUES(${req.query.questionnum},${req.query.questionnum},${req.query.language},${nowtime})`, function(error,results){
    if (error) throw error;
  })
  console.log(nowtime)
})
app.get("/DBcheck", (req, res) => {
  connection.query(`SELECT * from solve`, function (error, results, fields) {
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
                console.log(request.session.uid)
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
    window.localStorage.clear();
    req.session.destroy();
    console.log('session destroy');
  }
})
app.use(
  session({
    secret: '@codestates',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.post("/duplicate", (req, res) => {
  console.log('duplicate')
  console.log(req)
  connection.query(`SELECT * from user where id="${req.query.id}"`, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});