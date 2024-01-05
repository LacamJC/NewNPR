



// const Sequelize = require('sequelize')

// const sequelize = new Sequelize("railway","root","gb4Edd2-1h-34-hhfCge3hDEEFh-HdG5", {
//     dialect: "mysql",
//     host: "monorail.proxy.rlwy.net",
//     port: 54154
// })

// module.exports = sequelize



const Sequelize = require('sequelize')

const sequelize = new Sequelize("NewNPR","ramajo","", {
    dialect: "mysql",
    host: "localhost",
    port: 3306
})

module.exports = sequelize
