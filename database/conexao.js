



// const Sequelize = require('sequelize')

// const sequelize = new Sequelize("railway","root","bFfgEA4Fd-Dag4Fg5f6bEhgD361faec2", {
//     dialect: "mysql",
//     host: "roundhouse.proxy.rlwy.net",
//     port: 59998
// })

// module.exports = sequelize



const Sequelize = require('sequelize')

const sequelize = new Sequelize("NewNPR","ramajo","", {
    dialect: "mysql",
    host: "localhost",
    port: 3306
})

module.exports = sequelize
