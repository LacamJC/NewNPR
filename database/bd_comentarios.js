const Sequelize = require('sequelize')
const database = require('./conexao')

const bd_comentarios = database.define('bd_comentarios', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    texto_comentario: {
        type: Sequelize.TEXT
    }
})

// bd_comentarios.sync({force:true})

module.exports = bd_comentarios