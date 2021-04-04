const express = require('express')
const cookieparse = require('cookie-parser')
const session = require('express-session')
const router = require('./modules/router')
const bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieparse())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
app.set('view engine', 'ejs');
app.use(router)





app.listen(2502)