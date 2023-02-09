let now = new Date();
const nowtime = `${now.getFullYear()}.${now.getMonth()+1}.${now.getDate()}.${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}`
const express = require("express");
const app = express();
const path = require("path");
var file = [];
var child_process = require("child_process");
let fs = require("fs");
const shell = require('shelljs');
var mysql = require("mysql2");
const { Console } = require('console');

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
  console.log(request)
  let data = newFile.text;
  let filename = "main";
  let lang = ""
  let username = "12345"
  let quiznum = newFile.quizId
  console.log(quiznum)
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
  shell.exec(`./autopush.sh ${lang} ${quiznum} ${username} ${timelimit}`);
  console.log(nowtime)
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
  connection.query(`SELECT * from solve where questionnum = "${req.query.questionnum}" and submitter="${req.query.submitter}"`, function (error, results, fields) {
    if (error) throw error;
    res.json(results);
  });
});
app.get("/solveDB/insert",(req, res) =>{
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
