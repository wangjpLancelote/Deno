const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "./public")));

const upload = require("./upload");

app.all("*", function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild");
	res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");

	if (req.method == "OPTIONS") {
		res.send(200);
	} else {
		next();
	}
});

app.use("/upload", upload);
app.listen(2222, () => {
	console.log("==============>>>>>server upload image 开启 ....");
});
