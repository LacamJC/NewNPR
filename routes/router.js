const express = require('express')

const router = express.Router()

router.get('/', function(req,res) {
    res.render('../views/index.ejs') // Envia o usuario para a home page ao abrir
})

router.get('/mapa', function(req,res ){
    res.render('../views/mapa.ejs') // Envia o usuario para a tela de mapa
}) 

var i;
router.get('/cadastroUsuario', function (req,res ){
    res.render('../views/cadastro/usuario.ejs', {i : i})
})


module.exports = router