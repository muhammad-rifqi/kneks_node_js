require('dotenv').config();
const express = require('express');
const apps = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT;
const path = require('path');
const mysql = require('mysql2');
var md5 = require('md5');
// const Pool = require('pg').Pool

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'kneks',
//     password: 'Barlok15@',
//     port: 5432,
// })

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kneks"
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

apps.get('/detail/:id', (req, res) => {
    res.sendFile(path.resolve('./views/detail.html'));
    // const idTx = req.params.id;
    // console.log(idTx)
})

apps.get('/posts', (req, res) => {
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM news ORDER BY id DESC", function (err, result) {
            if (err) throw err;
            res.status(200).json(result)
        });
    });
})

apps.get('/posts/type/:name', (req, res) => {
    const names = req.params.name;
    con.connect(function (err) {
        if (err) throw err;
        con.query('SELECT * FROM news_' + names + '', function (err, result) {
            if (err) throw err;
            res.status(200).json(result)
        });
    });
})

apps.post('/do_login', (req, res) => {
    const email = req?.body?.email;
    const password = md5(req?.body?.password);

    con.connect(function (err) {
        if (err) throw err;
        con.query('SELECT * FROM users where email = ? AND password = ? ', [email, password], (error, results) => {
            if (error) {
                throw error
            }
            if (results?.length > 0) {
                res.status(200).json(results)
            } else {
                res.status(200).json({ "success": false })
            }
        });
    })
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