var express = require('express')//Criar objeto modulo Express

var app = express() //Executa o express

const rotas = require('./routes/router')//Fazer o include do modulo router

const axios = require('axios')

const bodyParser = require('body-parser')// Cria o objeto bordyParser para ler dados de formulario
const bd_comentarios = require('./database/bd_comentarios.js')
const bd_usuarios = require('./database/bd_usuarios.js')
const bd_pontos = require('./database/bd_pontos.js')


const path = require('path')
const multer = require('multer')
const upload = multer({dest: path.join(__dirname, 'public/uploads')})
app.use(upload.single('foto')) 



const redText = (text) => '\x1b[31m' + text + '\x1b[0m';
const greenText = (text) => '\x1b[32m' + text + '\x1b[0m';
const yellowText = (text) => '\x1b[33m' + text + '\x1b[0m';
/*
express.json() analisa os dados do formulario que  ficam no corpo de solicitação (POST),
também chamado de request de entrada, para ser enviado ao servidor web
 */
app.use(express.json())
/* utiliza o objeto rotas que define os caminhos das páginas*/
app.use('/', rotas)

/* bodyParser serve para trabalhar com os dados vindo do formulario, ou seja, ele transforma
e formata esse pacote de dados para o formato de objeto Javacript
 */
app.use(bodyParser.urlencoded({extended:false}))

/* include (utilizar) um arquivo externo */
app.use(express.static(__dirname +'/public'))

/* desmontrar que será utilizado o objeto ejs para interpretarvo template HTML no servidor web */
app.set('view engine', 'ejs')

/* Cadastrar comentario no banco de dados */
app.post('/comentar', function(req,res) { 
    
    console.log(yellowText("CADASTRANDO COMENTARIO"))

    var textoComentario = req.body.textoComentario
    // console.log(textoComentario.length)
    // console.log(textoComentario)

    if (textoComentario.length>0) // Verificando se textarea nao esta vazio
    {
        console.log(greenText("### COMENTARIO VÁLIDO ###"))
        
        bd_comentarios.create({ // Criando coluna no banco de dados
            texto_comentario : req.body.textoComentario
        })
        res.redirect('/')
        

    }else // Se estiver vazio
    {
        console.error(redText("Comentario inválido"))
        res.redirect('/')
    }

    
})
/* */

// Cadastrar Novo Usuario no banco de dados
app.post('/cadastrarUsuario', function(req, res) {
    // Variáveis do usuário
    console.log(yellowText("CADASTRANDO USUARIO"));
    var nome = req.body.nomeUsuario;
    var email = req.body.emailUsuario;
    var telefone = req.body.telefoneUsuario;
    var senha = req.body.senhaUsuario;
    var confirmaSenha = req.body.confirmaSenha;
    var foto = req.file ? req.file.filename : 'default.jpeg';
    var i = 0
    var e = 0 

    console.log(`NOME : ${nome}`);
    console.log(`EMAIL : ${email}`);
    console.log(`SENHA : ${senha}`);
    console.log(`TELEFONE : ${telefone}`);
    console.log(`FOTO : ${foto}`);

    // Autenticação de senha
    if (senha != confirmaSenha) {
        i = 1
       return res.render('../views/cadastro/usuario.ejs', {e : e, i : i, nome : nome, email : email, telefone : telefone }); //Caso a senha seja diferente é retornado o erro
    }

    // Verificando se o email já nao esta cadastrado
    
    bd_usuarios.findOne({where : {email : email}}).then(tabelaUsuarios =>{
        if(tabelaUsuarios) // Se existe o email no sistema
        {
            console.log(yellowText("EMAIL JA CADASTRADO NO SISTEMA"))
            e = 1

            res.render('../views/cadastro/usuario.ejs', {e:e, i : i,nome : nome, email : email, telefone : telefone})
        } else ( // se nao
            console.log(yellowText("EMAIL NAO CADASTRADO NO SISTEMA"))
        )
    })
    
    // Criação do usuário no banco de dados caso esteja tudo certo
    bd_usuarios.create({
        nome: nome,
        email: email,
        telefone: telefone,
        senha: senha,
        foto: foto
    }).then(function() {
        console.log(greenText("### USUARIO CADASTRADO COM SUCESSO NO BANCO DE DADOS ###"));
        res.render('../views/login.ejs')
    }).catch(function(error) {
        console.error(redText("ERRO AO CADASTRAR USUARIO: " + error));
        res.status(500).send("Erro ao cadastrar usuário");
    });
});
// 

// Verificacao de login
app.post('/verificaLogin', async function(req, res) {
    console.log("### VERIFICANDO BANCO DE DADOS ");

    var emailLogin = req.body.emailLogin;
    var senhaLogin = req.body.senhaLogin;
    var erros = [];

    // Validação dos campos

    if (!emailLogin || emailLogin.trim().length === 0) {
        erros.push("Email Inválido");
    }

    if (!senhaLogin || senhaLogin.trim().length === 0) {
        erros.push("Senha Inválida");
    }

    if (senhaLogin.length < 6) {
        erros.push("A senha deve conter no mínimo 6 caracteres");
    }

    if (erros.length > 0) {
        return res.render('../views/login.ejs', { erros: erros, emailLogin: emailLogin });
    }

    try {
        const tabelaUsuarios = await bd_usuarios.findOne({ where: { email: emailLogin } });

        if (tabelaUsuarios) {
            console.log("### USUARIO ENCONTRADO NO BANCO DE DADOS");

            // Verificando se coincide
            if (emailLogin === tabelaUsuarios.email && senhaLogin === tabelaUsuarios.senha) {
                console.log("### USUARIO LOGADO ###");
                // res.send("USUARIO EXISTE NO BANCO DE DADOS");

                var sendNome = tabelaUsuarios.nome
                var sendEmail = tabelaUsuarios.email
                var sendTel = tabelaUsuarios.telefone
                var sendFoto = tabelaUsuarios.foto

                console.log(`Nome : ${sendNome}`)
                console.log(`Email : ${sendEmail}`)
                console.log(`Telefone : ${sendTel}`)
                console.log(`Foto : ${sendFoto}`)
                res.render('../views/usuarios/perfil.ejs', {sendNome : sendNome, sendEmail : sendEmail, sendTel : sendTel, sendFoto : sendFoto})
            } else {
                console.log("### USUARIO NAO ENCONTRADO NO BANCO DE DADOS ###");
                erros.push("Sem permissão. Usuário ou senha inválidos");
                res.render('../views/login.ejs', { erros: erros, emailLogin: emailLogin });
            }
        } else {
            console.log("### USUARIO NAO ENCONTRADO NO BANCO DE DADOS ###");
            erros.push("Sem permissão. Usuário ou senha inválidos");
            res.render('../views/login.ejs', { erros: erros, emailLogin: emailLogin });
        }
    } catch (error) {
        console.error("Erro:", error);
        res.status(500).send("Erro interno no servidor");
    }
});



app.post('/cadastrarPonto', function(req,res) {
    console.log(greenText("### CADASTRANDO PONTO ###"))

    var emailUsuario = req.body.textEmail
    var senhaUsuario = req.body.textPassword
    var nomeInstituicao = req.body.textInstituicao
    var cep = req.body.textCep
    var foto =  req.file ? req.file.filename : 'default.jpeg'
    var descricao = req.body.textDescricao
    var tipo = []
    
    var usuarioNao = "Usuario nao encontrado, verifique o email ou a senha"

    var cidade =req.body.textCidade
    var bairro =  req.body.textBairro
    var rua = req.body.textRua

    // Configuracao dos tipos de ponto

        var eletronico = req.body.lixoEletronico
        var reciclavel = req.body.lixoReciclavel 
        var oleo = req.body.lixoOleo
        var organico = req.body.lixoOrganico

        eletronico === "on" ? tipo.push("Eletrônico") : false
        reciclavel === "on" ? tipo.push("Reciclável") : false 
        oleo === "on" ? tipo.push("Óleo") : false 
        organico === "on" ? tipo.push("Orgânico") : false 

    // console.log(`EMAIL : ${emailUsuario}`)
    // console.log(`SENHA : ${senhaUsuario}`)
    // console.log(`INSTITUICAO : ${nomeInstituicao}`)
    // console.log(`CEP : ${cep}`)
    // console.log(`DESCRICAO : ${descricao}`)
    // console.log(`FOTO : ${foto}`)

    // Procurando se usuario existe no banco  de dados
    bd_usuarios.findOne({where : {email : emailUsuario, senha : senhaUsuario}}).then(tabelaUsuarios => {
        if(tabelaUsuarios)
        {
            console.log(greenText("### USUARIO ENCONTRADO ###"))
            console.log(greenText("### CEP ENCONTRADO ###"))
                // console.log(`EMAIL : ${emailUsuario}`)
                // console.log(`SENHA : ${senhaUsuario}`)
                // console.log(`INSTITUICAO : ${nomeInstituicao}`)
                // console.log(`CEP : ${cep}`)
                // console.log(`DESCRICAO : ${descricao}`)
                // console.log(`FOTO : ${foto}`)
              // Criando nova coluna nos pontos de coleta
                tipo.length == 0 ? tipo.push("TIPO NÃO ESPECIFICADO") : false
                  bd_pontos.create({
                    email_usuario : emailUsuario,
                    nome_instituicao : nomeInstituicao,
                    cep : cep,
                    cidade : cidade,
                    bairro : bairro,
                    rua : rua,
                    foto : foto,
                    descricao : descricao,
                    tipo : tipo
                })
                console.log(greenText(`### PONTO DE COLETA ${nomeInstituicao} CADASTRADO ###`))
                // res.send("FUNCIONA")

                // res.render('/listaPontos')

                bd_pontos.findAll({
                    attributes: ['nome_instituicao', 'cep', 'cidade', 'bairro', 'rua', 'foto', 'descricao', 'tipo']
                }).then(pontoColeta => {
                    const valoresNomeInstituicao = pontoColeta.map(ponto => ponto.nome_instituicao)
                    const valoresCep =             pontoColeta.map(ponto => ponto.cep) 
                    const valoresCidade =          pontoColeta.map(ponto => ponto.cidade)
                    const valoresBairro =          pontoColeta.map(ponto => ponto.bairro)
                    const valoresRua =             pontoColeta.map(ponto => ponto.rua) 
                    const valoresFoto =            pontoColeta.map(ponto => ponto.foto)
                    const valoresDescricao =       pontoColeta.map(ponto => ponto.descricao)
                    const valoresTipo =            pontoColeta.map(ponto => ponto.tipo)
                    console.log((pontoColeta.length))        
                    res.render('../views/pontosDeColeta/lista.ejs', {instituicao : valoresNomeInstituicao, cep : valoresCep, cidade : valoresCidade, bairro : valoresBairro, rua : valoresRua, foto : valoresFoto, descricao : valoresDescricao, tipo : valoresTipo})
                
                })

                // res.render('../views/pontosDeColeta/lista.ejs')

                // res.send("SUCESSO")
        } else 
        {
            console.log(redText("### USUARIO NAO ENCONTRADO ###"))
            
            res.render('../views/cadastro/ponto.ejs', {usuarioNao : usuarioNao})
        }
    })
    // 



})



app.post('/alterarEmail', function(req, res) {
    console.log(yellowText("ALTERANDO EMAIL"))
    var msg = ""
    var emailAtual = req.body.emailAtual 
    res.render('../views/usuarios/alterar/email.ejs', {emailAtual : emailAtual, msg : msg})
})

app.post('/alterarTelefone', function(req,res) {
    console.log(yellowText("ALTERANDO TELEFONE"))
    var msg = ""
    var telefoneAtual = req.body.telefoneAtual

    console.log(yellowText(`TELEFONE ATUAL : ${telefoneAtual}`))

    res.render('../views/usuarios/alterar/telefone.ejs', {telefoneAtual : telefoneAtual, msg :msg})
})

app.post('/alterarEmailConfirm', function(req,res) {
    console.log(yellowText("ALTERANDO EMAIL CONFIRMADO"))

    var emailAtual = req.body.emailAtual 
    var emailNovo = req.body.emailNovo
    var senhaUsuario = req.body.senha 
    var msg = ""

    console.log(`Senha de usuario: ${senhaUsuario}`)
    console.log(`Email atual : ${emailAtual}`)

    console.log(`Email atual : ${emailNovo}`)

    

    bd_usuarios.findOne({where : {email : emailAtual, senha : senhaUsuario}}).then(tabelaUsuarios => {
        if(tabelaUsuarios)
        {
            tabelaUsuarios.update({ email : emailNovo}).then(() => {
                console.log(greenText("### EMAIL ALTERADO COM SUCESSO ###"))
                res.send("Email alterado")
            }).catch(error => {
                console.send(redText("Erro ao alterar email"))
            })
        } else 
        {
            console.log(redText("USUARIO NAO ENCONTRADO OU SENHA INCORRETA"))
            msg = "USUARIO NAO ENCONTRADO OU SENHA INCORRETA"
            res.render('../views/usuarios/alterar/email.ejs', {emailAtual : emailAtual, msg : msg})
        }

    })
})

app.post('/alterarTelefoneConfirm', function(req,res) {
    console.log(yellowText("ALTERANDO TELEFONE CONFIRM"))

    var telefoneAtual = req.body.telefoneAtual 
    var telefoneNovo = req.body.telefoneNovo
    var senhaUsuario = req.body.senha 
    var msg = ""

    console.log(yellowText(`TELEFONE ATUAL : ${telefoneAtual}`))

    console.log(yellowText(`TELEFONE NOVO : ${telefoneNovo}`))

    console.log(yellowText(`SENHA : ${senhaUsuario}`))

    bd_usuarios.findOne({where : {telefone : telefoneAtual, senha : senhaUsuario}}).then(tabelaUsuarios => {
        if(tabelaUsuarios)
        {
            tabelaUsuarios.update({telefone : telefoneNovo}).then(() => {
                console.log(greenText("### TELEFONE ALTERADO COM SUCESSO ###"))
                
                res.render('../views/usuarios/alterar/sucesso.ejs')
            }).catch(error => {
                console.log(redText("Erro ao alterar Telefone"))
                msg = "USUARIO NAO ENCONTRADO VERIFIQUE O NUMERO OU A SENHA"
                res.render('../views/usuarios/alterar/telefone.ejs', {msg : msg})
            })
        } else 
        {
            console.log(redText("USUARIO NAO ENCONTRADO OUU SENHA INCORRETA"))
            msg = "USUARIO NAO ENCONTRADO VERIFIQUE O NUMERO OU A SENHA"
            res.render('../views/usuarios/alterar/telefone.ejs', {msg : msg, telefoneAtual : telefoneAtual})
        }
    })
})

app.post('/VerlistaPontos', function(req,res){
    
    bd_pontos.findAll({
        attributes: ['nome_instituicao', 'cep', 'cidade', 'bairro', 'rua', 'foto', 'descricao', 'tipo']
    }).then(pontoColeta => {
        const valoresNomeInstituicao = pontoColeta.map(ponto => ponto.nome_instituicao)
        const valoresCep =             pontoColeta.map(ponto => ponto.cep) 
        const valoresCidade =          pontoColeta.map(ponto => ponto.cidade)
        const valoresBairro =          pontoColeta.map(ponto => ponto.bairro)
        const valoresRua =             pontoColeta.map(ponto => ponto.rua) 
        const valoresFoto =            pontoColeta.map(ponto => ponto.foto)
        const valoresDescricao =       pontoColeta.map(ponto => ponto.descricao)
        const valoresTipo =            pontoColeta.map(ponto => ponto.tipo)
        console.log(yellowText(pontoColeta.length))        
        res.render('../views/pontosDeColeta/lista.ejs', {instituicao : valoresNomeInstituicao, cep : valoresCep, cidade : valoresCidade, bairro : valoresBairro, rua : valoresRua, foto : valoresFoto, descricao : valoresDescricao, tipo : valoresTipo})
    
    })


})



/* servidor web fica na escuta da solicitação do cliente (computador q possui navegador) na  porta 3000 */
// app.listen(3000, function(req, res) {
//     console.log(greenText("##########"))
//     console.log(greenText("Servidos aberto"))
//     console.log(greenText("##########"))
// })

//Use PORT provided in environment or default to 3000 
const port = process.env.PORT ||3000;

// Listen on `port` and 0.0.0.0
app.listen(port, "0.0.0.0", function () {
  console.log(`SERVER OPEN ON PORT ${port}`)
});
