const express = require("express");
const router = express.Router();

const multer = require("multer");
const fs = require("fs");
const path = require("path");

var upload = multer({
	dest: "images/"
});

router.post("/img", upload.single("test"), (req, res) => {
	fs.readFile(req.file.path, (err, data) => {
		if (err) res.send("上传失败");

		let rt = Date.now() + parseInt(Math.random() * 999) + parseInt(Math.random() * 2222) + "." + req.file.mimetype.split("/")[1];
		fs.writeFile(path.join(__dirname, "./public/" + rt), data, error => {
			if (error) res.send("写入失败");
			return res.send({ err: 0, msg: "上传ok", data: "/public/" + rt });
		});

		fs.readdir("./images", (err, data) => {
			if (err) return res.send("读取文件夹失败");
			console.log("d", data);
			data.forEach(item => {
				if (!item) return;
				fs.unlink(item, err => {
					if (err) return console.log("移除文件失败");
					console.log(`移除 images文件夹下的: ${item} 文件`);
				});
			});
		});
	});
});

module.exports = router;
