



const Sequelize = require('sequelize')

const sequelize = new Sequelize("railway","root","a6Bd6-hC2Cad4BFAeg2ahH12hCcHc63b", {
    dialect: "mysql",
    host: "viaduct.proxy.rlwy.net",
    port: 52417
})

module.exports = sequelize



// const Sequelize = require('sequelize')

// const sequelize = new Sequelize("NewNPR","ramajo","123456", {
//     dialect: "mysql",
//     host: "localhost",
//     port: 3306
// })

// module.exports = sequelize
