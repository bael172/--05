const Router = require("express")
const router = new Router()

const tovar = require("../queries/tovar.js")
router.post('/add',tovar.add)
router.patch('/update',tovar.update)
router.get("/article:article",tovar.whereArticle)
router.get("/all",tovar.getAll)
router.delete('/article:article',tovar.destroyWhereArticle)
module.exports=router