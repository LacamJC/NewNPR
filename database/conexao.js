



const Sequelize = require('sequelize')

const sequelize = new Sequelize("railway","root","EaF35be-d14G121fAeHCb4CFc25a-cGf", {
    dialect: "mysql",
    host: "viaduct.proxy.rlwy.net",
    port: 22039
})

module.exports = sequelize



// const Sequelize = require('sequelize')

// const sequelize = new Sequelize("NewNPR","ramajo","123456", {
//     dialect: "mysql",
//     host: "localhost",
//     port: 3306
// })

// module.exports = sequelize
