const Router = require("express")
const router = new Router()

const sklad = require("../queries/sklad.js")
router.post('/add',sklad.add)
router.patch('/by_shelf_row',sklad.update_by_shelf_row)
router.get('/shelf:shelf',sklad.whereShelf)
router.get('/row:row',sklad.whereRow)
router.get('/all',sklad.getAll)
router.delete('/shelf_row',sklad.destroyWhereShelfRow)
module.exports=router