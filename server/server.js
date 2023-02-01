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
  let filename = "test";
  fs.writeFileSync(`./codefile/${filename}.${newFile.option}`, data, "utf-8");
  file.push(newFile);
  console.log(file);
  child_process.exec("autopush.sh", function (error, stdout, stderr) {
    console.log(stdout);
  });
  const shell = require('shelljs');
  shell.exec('./autopush.sh');
});

// React Router 사용
app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "../app/build/index.html"));
});
