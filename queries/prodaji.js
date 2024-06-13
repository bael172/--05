const  {Tovar,Sklad,Prodaji} = require("../db/modals")

class Sold{
    async add(req,res){
        const {data, article, quantity} = req.body
        const found = await Prodaji.findAll({
            where:{
                data
            }
        })
        if(!found){
            const created = await Prodaji.create({
                tovar_article: article,
                quantity
            })
            return res.json(created)
        }
        else res.status(200).send(`Запись c таким артикулом уже существует`)
    }
    async update(req,res){
        const {data, article, quantity} = req.body
        const found = await Prodaji.findAll({
            where:{
                data:req.params.data
            }
        })
        if(found){
            const upd = await Prodaji.update({
                article,quantity
            },{
                where:{
                    data
            }})
            if(upd[0]=='1' || upd[0]>=1) return res.json(upd)
            else res.status(200).send("Не удалось обновить таблицу")
        }
        else res.status(200).send(`Запись по ${req.query.data} не найдена`)
    }
    async whereData(req,res){
        const found = await Prodaji.findAll({
            where:{
                data:req.params.data
            }
        })
        if(found){
            res.json(found)
        }
    }
    async whereArticle(req,res){
        const found = await Prodaji.findAll({
            where:{
                tovar_article:req.params.article
            }
        })
        if(found){
            res.json(found)
        }
    }
    async getAll(req,res){
        const found = await Prodaji.findAll({
        })
        res.json(found)
    }
    async destroyWhereData(req,res){
        const found = await Prodaji.findAll({
            where:{
                data:req.params.data
            }
        })
        if(found){
            const destroyed = await Prodaji.destroy({
                where:{
                    data:req.params.data
                }
            })
            if( destroyed[0]=='1'|| destroyed[0]>=1) return res.json("Запись успешно удалена")
            else res.status(200).send("Удаление не выполнено")
        }

    }
}
module.exports = new Sold()