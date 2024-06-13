const {Sequelize} = require("sequelize")

const DB = new Sequelize(
    "Tovarooborot", "postgres", "0000",{
        dialect: "postgres",
        host: "localhost",
        port: "5432"
    }
)
module.exports = DB