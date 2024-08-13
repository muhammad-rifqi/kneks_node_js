require('dotenv').config();
const express = require('express');
const apps = express();
const bodyParser = require('body-parser')
const port = process.env.PORT;
const path = require('path');
const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'kneks',
    password: 'Barlok15@',
    port: 5432,
})

apps.use(bodyParser.json())
apps.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

apps.use(express.static('public'));

apps.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/index.html'));
})


apps.get('/detail/:id', (req, res) => {
    res.sendFile(path.resolve('./views/detail.html'));
    // const idTx = req.params.id;
    // console.log(idTx)
})

apps.get('/posts', (req, res) => {
    pool.query('SELECT * FROM posts ORDER BY id DESC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})


apps.get('/posts/type/:name', (req, res) => {
    const names = req.params.name;
    pool.query('SELECT * FROM posts WHERE type = $1 ' , [names] , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})

apps.post('/do_login', (req, res) => {
    const email = req?.body?.email;
    const password = req?.body?.password;
    pool.query('SELECT * FROM users where email = $1 AND password = $2',  [email , password] , (error, results) => {
        if (error) {
            throw error
        }
    if(results?.rows?.length > 0){
        res.status(200).json(results.rows)
    }else{
        res.status(200).json({"success": false})
    }
        
    })
})


apps.listen(port);