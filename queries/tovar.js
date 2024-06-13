const {Tovar,Sklad,Prodaji} = require("../db/modals")

class Good{
    async add(req,res){
        const {article,name,price} = req.body
        let keys=Object.keys(req.body)
        keys.forEach((item)=>{if(item!=article || item!=name || item!=price) {
            return res.send("Впишите article, name, price")
        }})
        const found = await Tovar.findAll({
            where:{
                article
            }
        })
        if(!found){
            const created = await Tovar.create({
                article,name,price
            })
            return res.json(created)
        }
        else res.status(900).send(`Запись c таким атрикулом уже существует`)
    }
    async update(req,res){
        const {article,name,price} = req.body
        const found = await Tovar.findAll({
            where:{
                article:req.params.article
            }
        })
        if(found){
            const upd = await Tovar.update({
                article,name,upd
            },{
                where:{
                    article:req.params.article
            }})
            if(upd[0]=='1' || upd[0]>=1) return res.json(upd)
            else res.status(200).send("Не удалось обновить таблицу")
        }
        else res.status(200).send(`Запись по ${req.params.article} не найдена`)
    }
    async whereArticle(req,res){
        const found = await Tovar.findAll({
            where:{
                article:req.params.article
            }
        })
        if(found){
            res.json(found)
        }
    }
    async getAll(req,res){
        const found = await Tovar.findAll({
        })
        res.json(found)
    }
    async destroyWhereArticle(req,res){
        const found = await Tovar.findAll({
            where:{
                article:req.params.article
            }
        })
        if(found){
            const destroyed = await Tovar.destroy({
                where:{
                    article:req.params.article
                }
            })
            if( destroyed[0]=='1'|| destroyed[0]>=1) return res.json("Запис(ь/и) успешно удалены")
            else res.status(200).send("Удаление не выполнено")
        }
        else res.send(`Запись с ${req.params.article} не найдена`)
    }
}
module.exports = new Good()