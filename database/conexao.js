



// const Sequelize = require('sequelize')

// const sequelize = new Sequelize("railway","root","fG1A3hDeD4Hcefa5h1HBcG3bHBGe6G4e", {
//     dialect: "mysql",
//     host: "roundhouse.proxy.rlwy.net",
//     port: 56019
// })

// module.exports = sequelize



const Sequelize = require('sequelize')

const sequelize = new Sequelize("NewNPR","ramajo","123456", {
    dialect: "mysql",
    host: "localhost",
    port: 3306
})

module.exports = sequelize
