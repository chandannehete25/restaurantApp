const model = require("../models/regModel.js");

class RegService {
    acceptRegData(name, email, contact, username, password, callback) {
        if (email.endsWith("@gmail.com")) {
            const regData = [name, email, contact, username, password];
            model.saveUser(regData, (err, result) => {
                if (err) {
                    console.log("Insert failed:", err);
                    return callback("Registration failed");
                } else {
                    console.log("Insert success:", result.insertId);
                    return callback("Registration success");
                }
            });
        } else {
            return callback("You are not a Gmail user");
        }
    }
}

module.exports = new RegService();
