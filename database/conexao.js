



const Sequelize = require('sequelize')

const sequelize = new Sequelize("railway","root","1366gDc3F1GD6A13h5FGCcE23h6B1Edd", {
    dialect: "mysql",
    host: "viaduct.proxy.rlwy.net",
    port: 45737
})

module.exports = sequelize



// const Sequelize = require('sequelize')

// const sequelize = new Sequelize("NewNPR","ramajo","", {
//     dialect: "mysql",
//     host: "localhost",
//     port: 3306
// })

// module.exports = sequelize
