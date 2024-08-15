require('dotenv').config();
const express = require('express');
const apps = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT;
const path = require('path');
const mysql = require('mysql2');
var md5 = require('md5');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pdes"
});


apps.use(bodyParser.json())
apps.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

apps.use(cors());
apps.use(express.static('public'));

apps.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/login.html'));
})

apps.get('/dashboard', (req, res) => {
    res.sendFile(path.resolve('./views/dashboard.html'));
})

apps.get('/aus', (req, res) => {
    res.sendFile(path.resolve('./views/aus.html'));
})

apps.get('/shu', (req, res) => {
    res.sendFile(path.resolve('./views/iph/shu.html'));
})

apps.get('/kih', (req, res) => {
    res.sendFile(path.resolve('./views/iph/kih.html'));
})

apps.post('/act_login', (req, res) => {
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
})
  
apps.get("/logout", (req, res) => {
    res.redirect("/");
});

apps.listen(port);