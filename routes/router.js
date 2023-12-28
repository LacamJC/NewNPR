const express = require('express')
const bd_pontos = require('../database/bd_pontos.js')
const router = express.Router()

router.get('/', function(req,res) {
    res.render('../views/index.ejs') // Envia o usuario para a home page ao abrir
})

router.get('/mapa', function(req,res ){
    res.render('../views/mapa.ejs') // Envia o usuario para a tela de mapa
}) 

var i;
var e;
var nome = ""
var email = ""
var telefone = ""
router.get('/cadastroUsuario', function (req,res ){
    res.render('../views/cadastro/usuario.ejs', {e : e, i : i, nome : nome, email : email, telefone : telefone})
})


var usuarioNao = ""
router.get('/cadastroPonto', function(req,res) {
    res.render('../views/cadastro/ponto.ejs', {usuarioNao : usuarioNao})
})


erros = []
emailLogin = ""
router.get('/login', function(req,res) {
    res.render('../views/login.ejs', {erros : erros, emailLogin : emailLogin})
})


instituicao = []
cep = []
cidade = []
bairro = []
rua = []
foto = []
descricao = []
tipo = []

router.get('/listaPontos', function(req,res) {
    res.render('../views/pontosDeColeta/lista.ejs', {instituicao : instituicao, cep : cep, cidade : cidade,bairro : bairro, rua : rua, foto : foto, descricao : descricao, tipo : tipo})
})

var sendNome = ""
var sendEmail = ""
var sendTel = ""
router.get('/usuarioPerfil', function(req,res) {
    res.render('../views/usuarios/perfil.ejs', {sendNome : sendNome, sendEmail : sendEmail, sendTel : sendTel})
})


var emailAtual = ""
var msg = ""
router.get('/alteraEmail', function(req,res) {
    res.render('../views/usuarios/alterar/email.ejs', {emailAtual : emailAtual, msg:msg})
})

router.get('/sucesso', function(req,res) {
    res.render('../views/usuarios/alterar/sucesso.ejs')
})

// Tentando coisas interessantes
var contadorPonto = 0
router.get('/infoPonto', function(req,res) {
   
    bd_pontos.findAll({
        attributes:['nome_instituicao']
    }).then(pontoColeta => {
        const valoresPontos = pontoColeta.map(ponto => ponto.nome_instituicao)

        console.log(valoresPontos.length)
        contadorPonto = valoresPontos.length
        console.log(`Pontos em analise : ${contadorPonto}` )
        res.render('../views/info_pontoColeta.ejs', {contadorPonto : contadorPonto})
    })


})

module.exports = router