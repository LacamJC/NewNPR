const Sequelize = require('sequelize')

const sequelize = new Sequelize("railway","root","YJYPPJwRYZGuUtqwVRbjaATbQcuzlPft", {
    dialect: "mysql",
    host: "junction.proxy.rlwy.net",
    port: 23043
})






// const sequelize = new Sequelize("newnpr","root","", {
//     dialect: "mysql",
//     host: "localhost",
//     port: 3306
// })
module.exports = sequelize