const {User} = require('../db/modals')

class Userok{
    async reg(req,res){
        const {login,passwd} = req.body
        const found = await User.findOne({
            where:{
                login
            }
        })
        if(!found){
            const created = await User.create({
                login,passwd
            })
            res.json(created)
        }
        else res.send("Пользователь с таким логином уже существует")
    }
     async auth(req,res){
        const {login, passwd} = req.body // Получаем переменные login, passwd из json,который отправляем с помощью insomnia
        if (!login){
            res.send("Неверные данные")
        }
        const user = await User.findOne({where:{login}}) // User это таблица в базе данных
        if (passwd != user.passwd){
            res.send("Неверные данные")
        }
        if (passwd == user.passwd){
            res.send("OK")
        }
    }
    async get(req,res){
        const user = await User.findOne({where:req.params.id})
        res.json(user)
    }
    async destroy(req,res){
        const del = await User.destroy({
            where:{id:req.params.id}
        })
        if(del[0]==1 || del[0]=="1") res.send("Запись удалена")
        else res.send("Запись не удалена")
    }
}

module.exports = new Userok()