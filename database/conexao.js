const Sequelize = require('sequelize')

const sequelize = new Sequelize("railway","root","5HdcA3--1EcF11ech6f1c2-4egc3A1Dg", {
    dialect: "mysql",
    host: "roundhouse.proxy.rlwy.net",
    port: 26711
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