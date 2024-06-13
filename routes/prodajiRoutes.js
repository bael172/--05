const Router = require("express")
const router = new Router()

const prodaji=require("../queries/prodaji.js")
router.post('/add',prodaji.add)
router.patch('/update:data',prodaji.update)
router.get('/data:data',prodaji.whereData)
router.get('/article:article',prodaji.whereArticle)
router.get('/all',prodaji.getAll)
router.delete('/data:data',prodaji.destroyWhereData)
module.exports=router