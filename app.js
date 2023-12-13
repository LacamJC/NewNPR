var express = require('express')//Criar objeto modulo Express

var aplicacao = express() //Executa o express

const rotas = require('./routes/router')//Fazer o include do modulo router

const bodyParser = require('body-parser')// Cria o objeto bordyParser para ler dados de formulario
const bd_comentarios = require('./database/bd_comentarios.js')
const bd_usuarios = require('./database/bd_usuarios.js')

/*
express.json() analisa os dados do formulario que  ficam no corpo de solicitação (POST),
também chamado de request de entrada, para ser enviado ao servidor web
 */
aplicacao.use(express.json())
/* utiliza o objeto rotas que define os caminhos das páginas*/
aplicacao.use('/', rotas)

/* bodyParser serve para trabalhar com os dados vindo do formulario, ou seja, ele transforma
e formata esse pacote de dados para o formato de objeto Javacript
 */
aplicacao.use(bodyParser.urlencoded({extended:false}))

/* include (utilizar) um arquivo externo */
aplicacao.use(express.static(__dirname +'/public'))

/* desmontrar que será utilizado o objeto ejs para interpretarvo template HTML no servidor web */
aplicacao.set('view engine', 'ejs')

/* Cadastrar comentario no banco de dados */
aplicacao.post('/comentar', function(req,res) { 
    console.log("Enviando comentario")

    var textoComentario = req.body.textoComentario
    console.log(textoComentario.length)
    console.log(textoComentario)

    if (textoComentario.length>0) // Verificando se textarea nao esta vazio
    {
        console.log("### COMENTARIO VÁLIDO ###")
        
        bd_comentarios.create({ // Criando coluna no banco de dados
            texto_comentario : req.body.textoComentario
        })
        res.send("Comentario enviado com sucesso, <a href='/'>clique aqui para voltar</>")
    }else // Se estiver vazio
    {
        res.render('../views/index.ejs')
    }
})
/* */

// Cadastrar Novo Usuario no banco de dados
aplicacao.post('/cadastrarUsuario', function(req, res) {
    // Variáveis do usuário
    console.log("CADASTRANDO USUARIO");
    var nome = req.body.nomeUsuario;
    var email = req.body.emailUsuario;
    var telefone = req.body.telefoneUsuario;
    var senha = req.body.senhaUsuario;
    var confirmaSenha = req.body.confirmaSenha;
    var foto = req.body.fotoUsuario;

    console.log(`NOME : ${nome}`);
    console.log(`EMAIL : ${email}`);
    console.log(`SENHA : ${senha}`);
    console.log(`TELEFONE : ${telefone}`);
    console.log(`FOTO : ${foto}`);

    // Autenticação de senha
    if (senha != confirmaSenha) {
        console.log("SENHAS DIFERENTES ERRO")
        i = 1
       return res.render('../views/cadastro/usuario.ejs', { i : i, nome : nome, email : email, telefone : telefone }); //Caso a senha seja diferente é retornado o erro
    }

    // Criação do usuário no banco de dados caso esteja tudo certo
    bd_usuarios.create({
        nome: nome,
        email: email,
        telefone: telefone,
        senha: senha,
        foto: foto
    }).then(function() {
        console.log("### USUARIO CADASTRADO COM SUCESSO NO BANCO DE DADOS ###");
        res.render('../views/login.ejs')
    }).catch(function(error) {
        console.error("ERRO AO CADASTRAR USUARIO: " + error);
        res.status(500).send("Erro ao cadastrar usuário");
    });
});
// 

// Verificacao de login
aplicacao.post('/verificaLogin', function(req,res) {
    console.log("### VERIFICANDO BANCO DE DADOS ")

    var emailLogin = req.body.emailLogin
    var senhaLogin = req.body.senhaLogin 
    var erros = []
    // Validação dos campos

    // // Verificando se nao esta com espaço vazio
    if(emailLogin.length < 1 || emailLogin == undefined || emailLogin == null)
    {
        erros.push("Email Inválido")
    }

    if(senhaLogin.length < 1 || senhaLogin == undefined || senhaLogin == null)
    {
        erros.push("Senha Inválida")
    }

    if (senhaLogin.length < 6)
    {
        erros.push("A senha deve conter no mínimo 6 digitos")
    }

    if(erros.length > 0)
    {
        console.log(erros)
        return res.render('../views/login.ejs', {erros : erros, emailLogin : emailLogin})
    }

    try {
        bd_usuarios.findOne({ where: { email: emailLogin } }).then(tabelaUsuarios => {
            if (tabelaUsuarios !== null) {
                console.log("### USUARIO ENCONTRADO NO BANCO DE DADOS");
                
                // Verificando se coincide

                if(emailLogin === tabelaUsuarios.email & senhaLogin === tabelaUsuarios.senha)
                {
                    // Coincide
                    console.log("###USUARIO LOGADO###")
                    res.send("USUARIO EXISTE NO BANCO DE DADOS")
                } 
            }  else {
                console.log("### USUARIO NAO ENCONTRADO NO BANCO DE DADOS ###")
                erros.push("Sem permissao. Usuario ou senha inválidos")

                res.render('../views/login.ejs', {erros:erros, emailLogin : emailLogin})
            }
        }).catch(error => {
            console.error("Erro: " + error);
        });
    } catch (error) {
        console.error("Erro no bloco try: " + error);
    }

})

/* servidor web fica na escuta da solicitação do cliente (computador q possui navegador) na  porta 3000 */
aplicacao.listen(3000, function(req, res) {
    console.log("##########")
    console.log("Servidos aberto")
    console.log("##########")
})