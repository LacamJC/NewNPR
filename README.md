# Natureza Prioridade Renovada - NPR

## Sobre
A aplicação NPR é um projeto desenvolvido por um grupo de estudantes com o objetivo de facilitar a coleta de lixo reciclável e apoiar iniciativas de proteção ao meio ambiente. A plataforma visa oferecer assistência e combate ao descarte irregular de resíduos, promovendo o compartilhamento de informações e um sistema de coleta especializada.

## Objetivo
O principal objetivo da aplicação NPR é proporcionar uma plataforma que facilite a coleta de lixo reciclável, combata o descarte irregular de resíduos e apoie a proteção ao meio ambiente.

## Público-Alvo
A aplicação NPR é destinada ao público em geral, atendendo a todos os públicos interessados em contribuir para a proteção do meio ambiente e a coleta eficiente de lixo reciclável.

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
- Bootstrap

## Screenshots
![Texto Alternativo](screenshots/captura_npr.png)


## Como Rodar o Projeto
**Certifique-se de ter o Node instalado em sua máquina.**

### Clone o Repositório e vá para ele
```bash
git clone https://github.com/LacamJC/NewNPR.git
cd NewNPR 
```

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

