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
		option: request.body.selectedOption,
	};
	var fs = require("fs");
	var data = newFile.text;
	fs.writeFileSync(`./codefile/test.${newFile.option}`, data, "utf-8");
	file.push(newFile);
	console.log(file);
	child_process.exec("autopush.bat", function (error, stdout, stderr) {
		console.log(stdout);
	});
});

// React Router 사용
app.get("*", function (request, response) {
	response.sendFile(path.join(__dirname, "../app/build/index.html"));
});
