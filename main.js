require('dotenv').config();
const express = require('express');
const apps = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT;
const path = require('path');
const db = require('./db/query')
const cookieParser = require("cookie-parser");
apps.use(bodyParser.json())
apps.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
apps.use(cookieParser());
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

// ::::::::::::::::::: IPH  ::::::::::::::::::::::::

apps.get('/shu', (req, res) => {
    res.sendFile(path.resolve('./views/iph/shu.html'));
})

apps.get('/kih', (req, res) => {
    res.sendFile(path.resolve('./views/iph/kih.html'));
})

apps.get('/rph', (req, res) => {
    res.sendFile(path.resolve('./views/iph/rph.html'));
})

apps.get('/lph', (req, res) => {
    res.sendFile(path.resolve('./views/iph/lph.html'));
})

apps.get('/hlp', (req, res) => {
    res.sendFile(path.resolve('./views/iph/hlp.html'));
})

apps.get('/iks', (req, res) => {
    res.sendFile(path.resolve('./views/iph/iks.html'));
})

apps.get('/prm', (req, res) => {
    res.sendFile(path.resolve('./views/iph/prm.html'));
})

apps.get('/kph', (req, res) => {
    res.sendFile(path.resolve('./views/iph/kph.html'));
})

// ::::::::::::::::::: JKS  ::::::::::::::::::::::::

apps.get('/lsj', (req, res) => {
    res.sendFile(path.resolve('./views/jks/lsj.html'));
})

apps.get('/kpbus', (req, res) => {
    res.sendFile(path.resolve('./views/jks/kpbus.html'));
})

apps.get('/pas', (req, res) => {
    res.sendFile(path.resolve('./views/jks/pas.html'));
})

apps.get('/pds', (req, res) => {
    res.sendFile(path.resolve('./views/jks/pds.html'));
})

apps.get('/ipl', (req, res) => {
    res.sendFile(path.resolve('./views/jks/ipl.html'));
})

apps.get('/pabs', (req, res) => {
    res.sendFile(path.resolve('./views/jks/pabs.html'));
})

// ::::::::::::::::::: KSS  ::::::::::::::::::::::::

apps.get('/wn', (req, res) => {
    res.sendFile(path.resolve('./views/kss/wn.html'));
})

apps.get('/bmti', (req, res) => {
    res.sendFile(path.resolve('./views/kss/bmti.html'));
})

apps.get('/zisn', (req, res) => {
    res.sendFile(path.resolve('./views/kss/zisn.html'));
})

apps.get('/ku', (req, res) => {
    res.sendFile(path.resolve('./views/kss/ku.html'));
})

// ::::::::::::::::::: BIWIS  ::::::::::::::::::::::::

apps.get('/spu', (req, res) => {
    res.sendFile(path.resolve('./views/biwis/spu.html'));
})

apps.get('/peh', (req, res) => {
    res.sendFile(path.resolve('./views/biwis/peh.html'));
})

apps.get('/pdes', (req, res) => {
    res.sendFile(path.resolve('./views/biwis/pdes.html'));
})

apps.get('/zk', (req, res) => {
    res.sendFile(path.resolve('./views/biwis/zk.html'));
})

apps.get('/pss', (req, res) => {
    res.sendFile(path.resolve('./views/biwis/pss.html'));
})

// ::::::::::::::::::: INSIS  ::::::::::::::::::::::::

apps.get('/riph', (req, res) => {
    res.sendFile(path.resolve('./views/insis/riph.html'));
})

apps.get('/kdeks', (req, res) => {
    res.sendFile(path.resolve('./views/insis/kdeks.html'));
})

apps.get('/bes', (req, res) => {
    res.sendFile(path.resolve('./views/insis/bes.html'));
})

apps.get('/leks', (req, res) => {
    res.sendFile(path.resolve('./views/insis/leks.html'));
})

apps.get('/sdmes', (req, res) => {
    res.sendFile(path.resolve('./views/insis/sdmes.html'));
})

// ::::::::::::::::::: LKS  ::::::::::::::::::::::::

apps.get('/lks', (req, res) => {
    res.sendFile(path.resolve('./views/lks/lks.html'));
})

apps.get('/ps', (req, res) => {
    res.sendFile(path.resolve('./views/lks/ps.html'));
})

apps.get('/pms', (req, res) => {
    res.sendFile(path.resolve('./views/lks/pms.html'));
})


// ::::::::::::::::::: QUERY  ::::::::::::::::::::::::

apps.post('/act_login', db.do_login)
  
apps.get("/logout", db.do_logout);

apps.listen(5000);