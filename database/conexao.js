



const Sequelize = require('sequelize')

const sequelize = new Sequelize("railway","root","a6H1CB4Ec-6AgEae5FdeBC5FgH46542A", {
    dialect: "mysql",
    host: "roundhouse.proxy.rlwy.net",
    port: 38970
})

module.exports = sequelize



// const Sequelize = require('sequelize')

// const sequelize = new Sequelize("NewNPR","ramajo","123456", {
//     dialect: "mysql",
//     host: "localhost",
//     port: 3306
// })

// module.exports = sequelize
