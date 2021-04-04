const express = require('express')
var router = express.Router()
var bcrypt = require('bcrypt')
var sql = require('./sql.js')



router.get('/', function(req, res){
    res.send('a')
    console.log(req)
})
router.get('/perfil', function(req, res){
    if(!req.session.loggedin){
        res.redirect('/login')
    }
    res.render('../views/pages/perfil.ejs', {
        datos: {
            username: req.session.username
        }
    })
})
router.get('/register', function(req, res){
    if(req.session.loggedin){res.redirect('/perfil')}
    res.render('../views/pages/register.ejs')
})
router.get('/login', function(req,res){
    if(req.session.loggedin){res.redirect('/perfil')}
    res.render('../views/pages/login.ejs')
})
router.post('/register', async function(req, res){
    let {user, psw1, psw2} = req.body
    if(!user){res.send('Falta usuario')}
    if(!psw1 || !psw2){res.send('Falta repetir la contraseña')}
    if(psw1!=psw2){res.send('Contraseñas no validas')}


    let exist = await sql.query(`SELECT id FROM users WHERE username = "${user}"`)
    if(exist.length!=0){
        res.send('Usuario ya existe')
        console.log(exist.length)
    }else{
        await bcrypt.hash(psw1, 10, async(err, hash) =>{
            let registerReady = await sql.query(`INSERT INTO users(username, passwords) VALUES ("${user}", "${hash}")`)
            if(registerReady){
                req.session.loggedin=true
                req.session.username = user
                res.redirect('/perfil')
            }
        })
    }
})
router.post('/login', function(req, res){
    let {user, psw} = req.body
    console.log(req.body)
    res.redirect('/perfil')
})

module.exports = router;