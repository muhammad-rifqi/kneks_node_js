const mysql = require('mysql2');
const md5 = require('md5');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pdes"
});

const do_login = (req, res) => {
    const email = req?.body?.email;
    const password = md5(req?.body?.password);
    console.log(email, password)
    con.connect(function (err) {
        if (err) throw err;
        con.query('SELECT * FROM users where email = ? AND password = ? ', [email, password], (error, results) => {
            if (error) {
                throw error
            }
            if (results?.length > 0) {
                console.log(results)
                res.redirect("/dashboard");
            } else {
                res.redirect("/");
            }
        });
    })
}

const do_logout = (req, res) => {
    res.redirect("/");
}

module.exports = {
    do_login,
    do_logout
  }
