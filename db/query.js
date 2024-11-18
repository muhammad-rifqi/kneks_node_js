const mysql = require('mysql2');
const md5 = require('md5');

// host: process.env.DB_HOST,
// user: process.env.DB_USER,
// password: process.env.DB_PASSWORD,
// database: process.env.DB_NAME

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "S#g=qGHo7i<t5",
    database: "kneks"
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
                const isLogin = true;
                res.cookie("islogin", isLogin);
                res.cookie("id", results[0]?.id);
                res.cookie("name", results[0]?.name);
                res.redirect("/dashboard");
            } else {
                res.redirect("/");
            }
        });
    })
}

const do_logout = (req, res) => {
    res.clearCookie("islogin");
    res.clearCookie("name");
    res.clearCookie("id");
    res.redirect("/");
}

module.exports = {
    do_login,
    do_logout
}
