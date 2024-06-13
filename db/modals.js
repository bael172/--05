const DB = require('./connect.js')
const {DataTypes,Sequelize} = require("sequelize")

const Sklad = DB.define('sklad',{
    ID_place:{type:DataTypes.INTEGER, primaryKey:true, allowNull:false, autoIncrement:true},
    shelf:{type:DataTypes.INTEGER, allowNull:false},
    row:{type:DataTypes.INTEGER, allowNull:false},
    //article:{type:DataTypes.STRING},
    quantity:{type:DataTypes.STRING, defaultValue:0}
})
const Tovar = DB.define('tovar',{
    article:{type:DataTypes.STRING, primaryKey:true, allowNull:false},
    name:{type:DataTypes.STRING, allowNull:false},
    price:{type:DataTypes.DECIMAL(10,2)}
})
const Prodaji = DB.define('prodaji',{
    data:{type:DataTypes.DATE, primaryKey:true},
    //article:{type:DataTypes.STRING},
    quantity:{type:DataTypes.INTEGER, allowNull:false, defaultValue:1}
})
const User = DB.define('user',{
        id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        login:{type: DataTypes.STRING, unique: true},
        passwd: {type:DataTypes.STRING},
        role: {type:DataTypes.STRING, defaultValue: "Student"},
})

Tovar.hasMany(Sklad, {
    foreignKey:"tovar_article",
    sourceKey: "article"
})
//Sklad.belongsTo(Sklad)

Tovar.hasMany(Prodaji,{
    foreignKey:"tovar_article",
    sourceKey: "article"
})
//Prodaji.belongsTo(Tovar)

module.exports = {
    Sklad, Tovar, Prodaji, User
}