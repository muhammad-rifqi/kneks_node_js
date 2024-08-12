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
    database: 'postgres',
    password: '123',
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

apps.get('/portofolio', (req, res) => {
    pool.query('SELECT * FROM tbl_portofolio ORDER BY id DESC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})


apps.get('/portofolio/detail/:id', (req, res) => {
    const idTx = req.params.id;
    pool.query('SELECT * FROM tbl_portofolio WHERE id = $1 ' , [idTx] , (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})

apps.listen(5000);