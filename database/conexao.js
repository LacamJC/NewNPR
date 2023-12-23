const Sequelize = require('sequelize')

const sequelize = new Sequelize("railway","root","4dGDh2a2Dd4fFhgeaC-F5fEfEa3E3h34", {
    dialect: "mysql",
    host: "viaduct.proxy.rlwy.net",
    port: 56170
})

module.exports = sequelize



// const Sequelize = require('sequelize')

// const sequelize = new Sequelize("NewNPR","ramajo","", {
//     dialect: "mysql",
//     host: "localhost",
//     port: 3306
// })

// module.exports = sequelize
