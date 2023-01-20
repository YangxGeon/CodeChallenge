const express = require("express");
const app = express();
const path = require("path");

app.listen(8080, function () {
	console.log("listening on 8080");
});

app.use(express.static(path.join(__dirname, "../app/build")));

app.get("/", function (request, response) {
	response.sendFile(path.join(__dirname, "../app/build/index.html"));
});

// React Router 사용
app.get("*", function (request, response) {
	response.sendFile(path.join(__dirname, "../app/build/index.html"));
});
