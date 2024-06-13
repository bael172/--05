const  {Tovar,Sklad,Prodaji} = require("../db/modals")

class Warehouse{
    async add(req,res){
        const {shelf,row,article,quantity} = req.body
        const found = await Sklad.findAll({
            where:{
                tovar_article:article,
            }
        })
        if(found.length==0){
            const created = await Sklad.create({
                shelf,row,
                tovar_article:article,
                quantity
            })
            return res.json(created)
        }
        else res.status(200).send(`Запись c таким атрикулом уже существует`)
    }
    async update_by_shelf_row(req,res){
        const {article,quantity} = req.body
        const found = await Sklad.findAll({
            where:{
                [Op.and]:[
                    {shelf:req.query.shelf},
                    {row:req.query.row}
                ]
            }
        })
        if(found.length>=1){
            const upd = await Sklad.update({
                tovar_article:article,quantity
            },{
                where:{
                    [Op.and]:[
                        {shelf:req.query.shelf},
                        {row:req.query.row}
                    ]
            }})
            if(upd[0]=='1' || upd[0]>=1) return res.json(upd)
            else res.status(200).send("Не удалось обновить таблицу")
        }
        else res.status(200).send(`Запись по №_shelf=${req.query.shelf} и №_row=${req.query.row} не найдена`)
    }
    async whereShelf(req,res){
        const found = await Sklad.findAll({
            where:{
                shelf:req.params.shelf
            }
        })
        if(found.length>=1){
            res.json(found)
        }
    }
    async whereRow(req,res){
        const found = await Sklad.findAll({
            where:{
                row:req.params.row
            }
        })
        if(found.length>=1){
            res.json(found)
        }
    }
    async getAll(req,res){
        const found = await Sklad.findAll({
        })
        res.json(found)
    }
    async destroyWhereShelfRow(req,res){
        const found = await Sklad.findAll({
            where:{
                [Op.and]:[
                    {shelf:req.query.shelf},
                    {row:req.query.row}
                ]
            }
        })
        if(found){
            const destroyed = await Sklad.destroy({
                where:{
                    [Op.and]:[
                        {shelf:req.query.shelf},
                        {row:req.query.row}
                    ]
                }
            })
            if( destroyed=='1'|| destroyed>=1) return res.json("Запис(ь/и) успешно удалены")
            else res.status(200).send("Удаление не выполнено")
        }
        else res.status(200).send(`Запись по №_shelf=${req.query.shelf} и №_row=${req.query.row} не найдена`)
    }
}
module.exports = new Warehouse()