const Sequelize = require('sequelize')
const database = require('./conexao')

const bd_usuarios = database.define('bd_usuarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nome: {
        type: Sequelize.STRING, 

    } 
    ,

    email: {
        type: Sequelize.STRING
    },

    telefone: {
        type: Sequelize.STRING
    },

    senha: {
        type: Sequelize.STRING
    },

    foto: {
        type: Sequelize.STRING
    },

    adm: {
        type: Sequelize.STRING
    }

})

// bd_usuarios.sync({force:true})

module.exports = bd_usuarios