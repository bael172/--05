const {Tovar,Sklad,Prodaji} = require("../db/modals")

class Good{
    async add(req,res){
        const {article,name,price} = req.body
        let keys=Object.keys(req.body)
        /*keys.forEach((item)=>{if(item!=article || item!=name || item!=price) {
            return res.send("Впишите article, name, price")
        }})*/
        const found = await Tovar.findAll({
            where:{
                article:article
            }
        })
        if(found.length==0){
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
        if(found.length>=1){
            const upd = await Tovar.update({
                article,name,price
            },{
                where:{
                    article:req.params.article
            }})
            console.log(upd[0])
            if(upd[0]=='1' || upd[0]>=1) return res.json("Таблица обновлена")
            else res.status(200).send("Не удалось обновить таблицу")
        }
        else res.status(800).send(`Запись по ${req.params.article} не найдена`)
    }
    async whereArticle(req,res){
        const found = await Tovar.findAll({
            where:{
                article:req.params.article
            }
        })
        if(found.length>=1){
            res.json(found)
        }
    }
    async getAll(req,res){
        const tovar = await Tovar.findAll({
        })
        console.log(tovar)
        res.send(`<body onload="action()">
        <table border="5px" cellspacing="0" cellpadding="10" id="table1">
        <tr>
            <th>Артикул</th>
            <th>Наименование</th>
            <th>Цена</th>
        </tr>
        <tr class="here">
            <td>${tovar[0].dataValues.article}</td>
            <td>${tovar[0].dataValues.name}</td>
            <td>${tovar[0].dataValues.price}</td>
        </tr>
            </table>
            <button class="act"> Нажми на меня </button>
            <script>
            document.onload=function action(){
                let button = document.createElement('button')
                button.textContent="SUKA"
                button.style.padding="20px"
                button.style.backgroundColor="blue"
                let table = document.getElementById(table1)
                table.insertAdjacentHTML('afterend',button)
                for(let k=0; k<tovar.length;k++){
                    let tableRow=document.createElement('tr')
                    let keys = Object.keys(tovar[k].dataValues)
                    let values = Object.values(tovar[k].dataValues
                    for(let i=0;i<keys.length-2;i++){
                        let cell=document.createElement('td')
                        cell.textContent=values[i]
                        tableRow.appendChild(cell)
                    }
                    table1.insertAdjacentHTML('beforeend',tableRow)
                }
            }
            </script>
            </body>`)
    }
    async destroyWhereArticle(req,res){
        const found = await Tovar.findAll({
            where:{
                article:req.params.article
            }
        })
        if(found.length>=1){
            const destroyed = await Tovar.destroy({
                where:{
                    article:req.params.article
                }
            })
            console.log(destroyed)
            if( destroyed=='1'|| destroyed>=1) return res.json("Запис(ь/и) успешно удалены")
            else res.status(200).send("Удаление не выполнено")
        }
        else res.send(`Запись с ${req.params.article} не найдена`)
    }
}
module.exports = new Good()