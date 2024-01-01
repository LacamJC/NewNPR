const Sequelize = require('sequelize')

const sequelize = new Sequelize("railway","root","Afe63BE4DaF3gH4G42F2CEaB1-B61-FC", {
    dialect: "mysql",
    host: "viaduct.proxy.rlwy.net",
    port: 55409
})

module.exports = sequelize



// const Sequelize = require('sequelize')

// const sequelize = new Sequelize("NewNPR","ramajo","", {
//     dialect: "mysql",
//     host: "localhost",
//     port: 3306
// })

// module.exports = sequelize
