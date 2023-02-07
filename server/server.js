const express = require("express");
const app = express();
const path = require("path");
var file = [];
var child_process = require("child_process");

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

var connection = mysql.createConnection({
  host: "10.0.20.120",
  user: "manager",
  password: "pw123",
  database: "AlgoDB"
});

connection.connect();

app.get("/solveDB", (req, res) => {
  connection.query("SELECT * from solve order by submissiontime desc limit 1", function (error, results, fields) {
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

