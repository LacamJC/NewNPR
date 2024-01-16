# Natureza Prioridade Renovada - NPR

## Sobre
Uma aplicação web com foco em medidas de sustentabilidade para a organização social sobre a coleta de lixo em Barueri.

## Funcionalidades
- Cadastro de Usuário
- Cadastro de Pontos de Coleta
- Mapa com Pontos de Coleta Oficiais
- Feedback

## Tecnologias
- HTML
- CSS
- EJS
- Node.js
- Javascript
- MySQL
- Sequelize

## Como Rodar o Projeto
#### Certifique-se que tenha o Node instalado em sua maquina
### Instale as Dependências (se necessário)
```bash
npm install axios
npm install ejs
npm install sequelize
npm install mysql2
```

Após isso acesse o arquivo conexao.js dentro do diretorio database que seria 
```bash
NewNPR/database/conexao.js
```
E altere as informaçoes de acordo com as configuraçoes do seu Banco de Dados
```javascript
const Sequelize = require('sequelize')

const sequelize = new Sequelize("<nome_do_banco>","<nome_do_usuario>","<senha>", {
   dialect: "mysql",
   host: "<nome_do_seu_host>",
   port: <sua_porta>
})

module.exports = sequelize
```

Após isso execute o comando para inicializar o Projeto 

```bash
node app
```

Vá para o navegador e entre em seu localhost acessando a porta 3000
```
http://localhost:3000/
```

