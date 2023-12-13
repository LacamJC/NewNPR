const Sequelize = require('sequelize')

const sequelize = new Sequelize("railway","root","BEfAG-1hb1a211dC4FhH53EgbCb626Fg", {
    dialect: "mysql",
    host: "monorail.proxy.rlwy.net",
    port: 52009
})

module.exports = sequelize


/*
const Sequelize = require('sequelize')

const sequelize = new Sequelize("NewNPR","ramajo","", {
    dialect: "mysql",
    host: "localhost",
    port: 3306
})

module.exports = sequelize
*/