const crypto = require("crypto");

class Crypt {
	constructor(key) {
		this.key = key;
	}
	encryptIV(data) {
		if (!this.key || !data) {
			return "";
		}
		if (Object.prototype.toString.call(data) !== "[object String]") {
			data = JSON.stringify(data);
		}
		let cipher;
		// let iv = new Buffer("1234567812345678");
		let iv = Buffer.from("1234567812345678");
		try {
			cipher = crypto.createCipheriv("aes-256-cbc", String(this.key), iv);
		} catch (err) {
			if (err) {
				console.log("err", err);
				console.log(`encrypt createCipher err : key(${this.key}) data(${data}) `);
				return "";
			}
		}
		let encrypted = cipher.update(String(data), "utf8", "hex");
		encrypted += cipher.final("hex");
		return encrypted;
	}

	decryptIV(data) {
		if (!this.key || !data || Object.prototype.toString.call(data) !== "[object String]") {
			return "";
		}
		// let iv = new Buffer("1234567812345678");
		let iv = Buffer.from("1234567812345678");
		let decipher = crypto.createDecipheriv("aes-256-cbc", String(this.key), iv);
		let decrypted;
		try {
			decrypted = decipher.update(data, "hex", "utf8");
		} catch (err) {
			if (err) {
				console.log(`decrypt decipher.update err : key(${this.key}) data(${data}) decrypted(${decrypted})`);
				return "";
			}
		}
		try {
			decrypted += decipher.final("utf8");
		} catch (err) {
			if (err) {
				console.log(`decrypt decipher.final err : key(${this.key}) data(${data}) decrypted(${decrypted})`);
				return "";
			}
		}
		return decrypted;
	}
}

let rt = new Crypt("%^%082uyyy3ebnYTE@$12328*&34n7fh");
let ey = rt.encryptIV("hello world");
console.log("加密 ====>>: %s", ey);
let dy = rt.decryptIV(ey);
console.log("解密 ====>>:", dy);
