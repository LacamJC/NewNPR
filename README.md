# Natureza Prioridade Renovada - NPR

## Sobre
<p>Uma aplicação web com foco em medidas de sustentabilidade para a organização social sobre a coleta de lixo em Barueri.</p>

## Funcionalidades
<ul>
  <li>Cadastro de Usuário</li>
  <li>Cadastro de Pontos de Coleta</li>
  <li>Mapa com Pontos de Coleta Oficiais</li>
  <li>Feedback</li>
</ul>

## Tecnologias

<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>EJS</li>
  <li>Node.js</li>
  <li>Javascript</li>
  <li>MySQL</li>
  <li>Sequelize</li>
</ul>


#### Como rodar o projeto

### Como Rodar o Projeto

#### Instale as Dependências (se necessário)
```bash
npm install axios
npm install ejs
npm install sequelize
npm install mysql2




Configuração do Banco de Dados
Acesse o diretório do banco de dados para fazer conexão com seu banco.
Abra o arquivo conexao.js e altere as informações para refletir as configurações do seu banco de dados:

const Sequelize = require('sequelize')

const sequelize = new Sequelize("<nome_do_banco>","<nome_do_usuario>","<senha>", {
   dialect: "mysql",
   host: "<nome_do_seu_host>",
   port: <sua_porta>
})

module.exports = sequelize

Não se esqueça de alterar as informações pelas referentes ao seu banco.

