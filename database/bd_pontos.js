const Sequelize = require('sequelize')
const database = require('./conexao')

const bd_pontos = database.define('bd_pontos', {
    id: {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },

    email_usuario: 
    {
        type:Sequelize.STRING 
    },

    nome_instituicao: 
    {
        type:Sequelize.STRING
    },

    cep:
    {
        type:Sequelize.STRING
    },

    cidade:
    {
        type:Sequelize.STRING
    },

    bairro:
    {
        type:Sequelize.STRING
    },

    rua:
    {
        type:Sequelize.STRING
    },

    foto:
    {
        type:Sequelize.TEXT
    },

    descricao:
    {
        type:Sequelize.TEXT
    },
    tipo: {
        type: Sequelize.JSON,

      },
})

 bd_pontos.sync({force:true})

module.exports = bd_pontos
